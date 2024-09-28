const { getContract, encodeAbiParameters, parseAbiParameters, encodeFunctionData, parseGwei } = require('viem')
const { getConfig, ChainId, Token, paymentTokens, getErc721Tokens, AuctionType, SortBy, getErc721OrderState, generateErc721Order, requestCreateOrder } = require('@sky-mavis/mavis-market-core')

const config = require('./config')

const chainID = ChainId.mainnet
const mpConfig = getConfig(chainID)
const _orderExchangeInterface = 'ORDER_EXCHANGE'

const approveERC20Token = async (walletClient, publicClient, contractAddress) => {
    const erc20Contract = getContract({
        address: contractAddress,
        abi: config.ERC20_ABI,
        client: {
            public: publicClient,
            wallet: walletClient
        }
    })

    const approveHash = await erc20Contract.write.approve([
        mpConfig.contractsAddress.marketGateway,
        config.config.erc20ApprovedValue
    ])

    console.log(approveHash)
}

const approveERC721Token = async (walletClient, publicClient, contractAddress) => {
    const erc721Contract = getContract({
        address: contractAddress,
        abi: config.ERC721_ABI,
        client: {
            public: publicClient,
            wallet: walletClient
        }
    })

    const approveHash = await erc721Contract.write.setApprovalForAll([
        mpConfig.contractsAddress.marketGateway,
        true
    ])

    console.log(approveHash)
}

const getOrders = async () => {
    const params = {
        chainId: chainID,
        tokenAddress: config.config.erc721collectionAddress,
        from: 0,
        size: 10,
        auctionType: AuctionType.Sale, // Optional
        // criteria: [{ name: 'attribute_1', values: ['value_1', 'value_2'] }], // Optional
        sort: SortBy.PriceAsc, // Optional
        // name: 'Cyberkongz', // Optional
        // priceRange: {
        //   from: '1000000000000000000',
        //   to: '1000000000000000000',
        // }, // Optional
        // rangeCriteria: [
        //   {
        //     name: 'attribute_1',
        //     range: {
        //       from: '1000000000000000000',
        //       to: '1000000000000000000',
        //     },
        //   },
        // ], // Optional
    };

    const { total, results } = await getErc721Tokens(params);
    return results
}

const buyErc721Token = async (wallet, publicClient, order, chainId, options) => {
    const [walletAddress] = await wallet.getAddresses()
    const { signature, expectedState, kind, maker, currentPrice } = order
    const recipient = kind === config.OrderKind[kind] ? maker : walletAddress

    const erc721Order = generateErc721Order(order)
    const encodedOrder = encodeOrder(erc721Order)
    const settlePrice = currentPrice // TODO: Dynamic Token

    const orderInfo = {
        orderData: encodedOrder,
        signature: signature,
        referralAddr: config.config.ZERO_ADDRESS,
        expectedState: expectedState,
        recipient,
        refunder: walletAddress,
    };

    const encodeParams = encodeParamsForSettleErc721Order(orderInfo, settlePrice);
    settleErc721Order(wallet, publicClient, encodeParams, settlePrice)
}

const settleErc721Order = async (walletClient, publicClient, encodeParams, settlePrice) => {
    const mavisExchangeContract = getContract({
        address: mpConfig.contractsAddress.marketGateway,
        abi: config.MARKET_GATEWAY_ABI,
        client: {
            public: publicClient,
            wallet: walletClient
        }
    })

    const settledHash = await mavisExchangeContract.write.interactWith([
        _orderExchangeInterface,
        encodeParams
    ],
        {
            value: BigInt(settlePrice),
            gas: 500000n, // TODO: ESTIMATE GAS
            gasPrice: parseGwei('20')
        }
    )

    console.log(settledHash)
}

const encodeParamsForSettleErc721Order = (orderInfo, settlePrice) => {
    return encodeFunctionData({
        abi: config.MAVIS_EXCHANGE_ABI,
        functionName: "settleOrder",
        args: [
            orderInfo,
            settlePrice
        ]
    })
}

const encodeParamsForCancelErc721Order = (orderInfo) => {
    return encodeFunctionData({
        abi: config.MAVIS_EXCHANGE_ABI,
        functionName: "cancelOrder",
        args: [
            orderInfo,
        ]
    })
}

const generateErc721Order$1 = (order) => {
    const { price, duration, orderType, assets, paymentToken, maker, expectedState } = order;
    const orderKind = orderType;
    const now = new Date().getTime();
    const startedAt = Math.ceil(now / 1000);
    const expiredAt = startedAt + duration;
    const result = {
        maker,
        kind: orderKind,
        assets,
        expiredAt,
        paymentToken,
        startedAt,
        basePrice: price.toString(),
        endedAt: 0,
        endedPrice: '0',
        expectedState,
        nonce: 0,
        marketFeePercentage: config.config.MARKET_FEE_PERCENTAGE,
    };
    return result;
};

const encodeOrder = (order) => {
    const orderTypes = [
        '(address maker, uint8 kind, (uint8 erc,address addr,uint256 id,uint256 quantity)[] assets, uint256 expiredAt, address paymentToken, uint256 startedAt, uint256 basePrice, uint256 endedAt, uint256 endedPrice, uint256 expectedState, uint256 nonce, uint256 marketFeePercentage)',
    ];

    return encodeAbiParameters(parseAbiParameters(orderTypes), [order])
}

const createErc721Order = async (params, wallet, publicClient) => {
    const [walletAddress] = await wallet.getAddresses()
    const { chainId, tokenAddress, tokenId, paymentToken, price, duration } = params;
    const assets = [
        {
            id: tokenId,
            addr: tokenAddress,
            erc: config.ErcAssetItem['Erc721'],
            quantity: 0,
        },
    ];

    // const nonce = await getNonce(chainId, account);
    const nonce = 0
    const expectedState = await getErc721OrderState(chainId, assets);

    const auctionData = {
        price: BigInt(price),
        duration,
        paymentToken,
        orderType: config.OrderKind['Sell'],
        expectedState,
        nonce,
        maker: walletAddress,
        assets,
    };

    const inputOrder = await generateInputOrder(auctionData);
    const dataForSigning = await generateErc721Order$1(auctionData);

    const signature = await getErc721OrderSignature(wallet, dataForSigning);

    if (!signature) {
        throw new Error('Invalid signature');
    }

    let x = await requestCreateOrder({ order: inputOrder, signature, account: walletAddress, chainId: chainID })
    console.log(x)
    return requestCreateOrder({ order: inputOrder, signature, account: walletAddress, chainId });
};

const createErc721Offer = async (params, wallet, publicClient) => {
    const [walletAddress] = await wallet.getAddresses()
    const { tokenId, tokenAddress, price, duration, chainId } = params

    const assets = [
        {
            id: tokenId,
            addr: tokenAddress,
            erc: config.ErcAssetItem['Erc721'],
            quantity: 0,
        },
    ];

    //TODO: CHECK IF WRON IS APPROVED

    //TODO: CHECK IF BALANCE IS SUFFICIENT

    const expectedState = await getErc721OrderState(chainId, assets);
    const inputOrder = await getInputOrder(chainId, walletAddress, price, duration, expectedState, assets);
    const signature = await getOrderSignature(chainId, wallet, walletAddress, price, duration, expectedState, assets);
    if (!signature) {
        throw new Error('Invalid signature');
    }

    console.log(inputOrder)
    return requestCreateOrder({ order: inputOrder, account: walletAddress, signature, chainId });




}

const getInputOrder = async (chainId, walletAddress, price, duration, expectedState, assets) => {
    const wRonAddress = paymentTokens[chainId][Token.RON].address;
    // const nonce = await getNonce(chainId, account);
    const nonce = 0

    return generateInputOrder({
        price: BigInt(price),
        duration,
        paymentToken: wRonAddress,
        orderType: config.OrderKind['Offer'],
        expectedState,
        nonce,
        maker: walletAddress,
        assets,
    });
};

const generateInputOrder = (data) => {
    const { price, duration, orderType, expectedState, nonce, assets, paymentToken } = data;
    const now = new Date().getTime();
    const startedAt = Math.ceil(now / 1000);
    const expiredAt = startedAt + duration;
    const inputOrder = {
        nonce,
        assets: assets.map(asset => {
            const { addr, erc, quantity, id } = asset;
            return {
                erc: Object.keys(config.ErcAssetItem).find(key => config.ErcAssetItem[key] == erc),
                address: addr,
                id: id.toString(),
                quantity: quantity.toString(),
            };
        }),
        startedAt,
        expiredAt,
        expectedState,
        paymentToken,
        kind: Object.keys(config.OrderKind).find(key => config.OrderKind[key] == orderType),
        basePrice: price.toString(),
    };
    return inputOrder;
};

const getOrderSignature = (chainId, wallet, walletAddress, price, duration, expectedState, assets) => {
    const wRonAddress = paymentTokens[chainId][Token.RON].address;
    const now = new Date().getTime();
    const startedAt = Math.ceil(now / 1000);
    const expiredAt = startedAt + duration;
    const dataForSigning = {
        maker: walletAddress,
        kind: config.OrderKind['Offer'],
        assets,
        expiredAt,
        paymentToken: wRonAddress,
        startedAt,
        basePrice: price,
        endedAt: 0,
        endedPrice: '0',
        expectedState,
        nonce: 0,
        marketFeePercentage: config.config.MARKET_FEE_PERCENTAGE,
    };
    return getErc721OrderSignature(wallet, dataForSigning);
};

const getErc721OrderSignature = async (wallet, order) => {
    const { marketGatewayDomain } = mpConfig

    const signature = await wallet.signTypedData({
        domain: marketGatewayDomain,
        types: config.OrderAbiTypes,
        primaryType: "Order",
        message: order
    })

    return signature
};

const cancelErc721Order = async (wallet, publicClient, order) => {
    const erc721Order = generateErc721Order(order)
    const encodedOrder = encodeOrder(erc721Order)
    const encodeParams = encodeParamsForCancelErc721Order(encodedOrder);

    const mavisExchangeContract = getContract({
        address: mpConfig.contractsAddress.marketGateway,
        abi: config.MARKET_GATEWAY_ABI,
        client: {
            public: publicClient,
            wallet: wallet
        }
    })

    const cancelHash = await mavisExchangeContract.write.interactWith([
        _orderExchangeInterface,
        encodeParams
    ],
        {
            gas: 500000n, // TODO: ESTIMATE GAS
            gasPrice: parseGwei('20')
        }
    )
    console.log(cancelHash)
}

module.exports = {
    approveERC20Token,
    approveERC721Token,
    getOrders,
    buyErc721Token,
    generateErc721Order,
    createErc721Order,
    createErc721Offer,
    cancelErc721Order,
}