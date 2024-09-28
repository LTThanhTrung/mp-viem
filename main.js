

const { createWalletClient, createPublicClient, http, } = require('viem')
const { ronin, saigon } = require('viem/chains')
const { privateKeyToAccount } = require('viem/accounts')

const {
    ChainId,
    paymentTokens,
    Token,
    checkIsErc721OrderValid
} = require('@sky-mavis/mavis-market-core')

const utils = require('./utils')
const config = require('./config')
const chainID = ChainId.mainnet

const chain = ronin

const wallet = createWalletClient({
    account:privateKeyToAccount(config.config.privateKey),
    transport: http("https://api.roninchain.com/rpc"),
});

const publicClient = createPublicClient({
    chain: chain,
    transport: http("https://api.roninchain.com/rpc")
})

const main = async () => {
    // buyNFT()

    sellNFT()
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

const sellNFT = async () => {
    const tokenAddress = config.config.erc721collectionAddress
    // utils.approveERC721Token(wallet, publicClient, tokenAddress)

    // TODO: FETCH NFT ID 
    const tokenId = "421422"
    const price = 10 * 10 ** 18 // 10 RON, 18 decimals
    const duration = 3 * 30 * 24 * 60 * 60  // 3 month

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

main()


