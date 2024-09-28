const { getContract, encodeAbiParameters, parseAbiParameters, encodeFunctionData, parseGwei } = require('viem')
const { getConfig, ChainId, getErc721Tokens, AuctionType, SortBy, } = require('@sky-mavis/mavis-market-core')

const config = require('./config')

const chainID = ChainId.mainnet
const mpConfig = getConfig(chainID)

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
    const _orderExchangeInterface = 'ORDER_EXCHANGE'

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

const generateErc721Order = (order) => {
    const { expiredAt, basePrice, kind, startedAt, assets, paymentToken, maker, expectedState, nonce, marketFeePercentage } = order;
    const result = {
        maker: maker,
        kind: config.OrderKind[kind],
        assets: assets.map(asset => {
            if (asset) {
                const { address, erc, quantity, id } = asset;
                return {
                    addr: address,
                    erc: config.ErcAssetItem[erc],
                    quantity: Number(quantity),
                    id: id,
                };
            }
        }),
        expiredAt: expiredAt,
        basePrice: basePrice,
        paymentToken: paymentToken,
        startedAt: startedAt,
        endedAt: 0,
        endedPrice: '0',
        expectedState: `${expectedState}`,
        nonce: nonce,
        marketFeePercentage: marketFeePercentage,
    };
    return result
};

const encodeOrder = (order) => {
    const orderTypes = [
        '(address maker, uint8 kind, (uint8 erc,address addr,uint256 id,uint256 quantity)[] assets, uint256 expiredAt, address paymentToken, uint256 startedAt, uint256 basePrice, uint256 endedAt, uint256 endedPrice, uint256 expectedState, uint256 nonce, uint256 marketFeePercentage)',
    ];

    return encodeAbiParameters(parseAbiParameters(orderTypes), [order])
}


module.exports = {
    approveERC20Token,
    getOrders,
    buyErc721Token,
    generateErc721Order
}