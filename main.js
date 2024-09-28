

const { createWalletClient, createPublicClient, http } = require('viem')
const { ronin, saigon } = require('viem/chains')
const { privateKeyToAccount } = require('viem/accounts')

const {
    ChainId,
    paymentTokens,
    Token,
    checkIsErc721OrderValid,
    getErc721Token
} = require('@sky-mavis/mavis-market-core')

const utils = require('./utils')
const config = require('./config')
const chainID = ChainId.mainnet

const chain = ronin

const wallet = createWalletClient({
    account: privateKeyToAccount(config.config.privateKey),
    transport: http("https://api.roninchain.com/rpc"),
});

const publicClient = createPublicClient({
    chain: chain,
    transport: http("https://api.roninchain.com/rpc")
})

const main = async () => {
    // buyNFT()


    /* SELL NFT */
    // const tokenId = "421422"
    // const price = 10 * 10 ** 18 // 10 RON, 18 decimals
    // const duration = 3 * 30 * 24 * 60 * 60  // 3 month
    // sellNFT(tokenId, price, duration)


    /* CANCEL SELL NFT */
    // const tokenId = "421422"
    // cancelSell(tokenId)



    /* CREATE OFFER */
    // const tokenId = "346729"
    // const price = 0.1 * 10 ** 18 // Min offer = 0.1 RON
    // const duration = 24 * 60 * 60 // seconds
    // createOffer(tokenId, price, duration)



    /* ACCEPT OFFER */
    const tokenId = "368408"
    acceptOffer(tokenId)
}

const buyNFT = async () => {
    const paymentToken = paymentTokens[chainID][Token.RON].address
    //utils.approveERC20Token(wallet, publicClient, paymentToken) // Approve Buying Token to marketplace gateway

    const orders = await utils.getOrders()
    let order = orders[0].order
    const valid = await checkIsErc721OrderValid(chainID, order)
    if (valid) {

        ////////////////////////////////
        // TODO: CHECK IF TOKEN IS APPROVED
        ////////////////////////////////

        ////////////////////////////////
        // TODO: CHECK IF ENOUGH BALANCE
        ////////////////////////////////

        await utils.buyErc721Token(wallet, publicClient, order, chainID)
    }
}

const sellNFT = async (tokenId, price, duration) => {
    const tokenAddress = config.config.erc721collectionAddress
    // utils.approveERC721Token(wallet, publicClient, tokenAddress)

    const params = {
        chainId: chainID,
        tokenAddress: tokenAddress,
        tokenId: tokenId,
        paymentToken: paymentTokens[chainID].RON.address,
        price: price,
        duration: duration
    };

    utils.createErc721Order(params, wallet, publicClient)
}

const cancelSell = async (tokenId) => {
    const params = {
        chainId: chainID,
        tokenAddress: config.config.erc721collectionAddress,
        tokenId: tokenId,
    };

    const detail = await getErc721Token(params)
    const order = detail.order
    if (order) {
        // TODO: CHECK IF NO VALID ORDER
        utils.cancelErc721Order(wallet, publicClient, order)
    }
}

const createOffer = (tokenId, price, duration) => {
    const params = {
        chainId: chainID,
        tokenAddress: config.config.erc721collectionAddress,
        tokenId: tokenId,
        price: price,
        duration: duration
    };

    utils.createErc721Offer(params, wallet, publicClient)
}

const acceptOffer = async (tokenId) => {
    const offers = await utils.getMarketplaceOffers(tokenId)
    const offer = offers[0]

    //TO DO: SORT HIGHEST OFFER BY PRICE
    await utils.acceptOffer(offer, wallet, publicClient)
}

main()


