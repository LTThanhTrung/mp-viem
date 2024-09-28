

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

const account = privateKeyToAccount(config.config.privateKey)
const chain = ronin

const wallet = createWalletClient({
    account,
    chain: chain,
    transport: http("https://api.roninchain.com/rpc"),
});

const publicClient = createPublicClient({
    chain: chain,
    transport: http("https://api.roninchain.com/rpc")
})

const main = async () => {
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

main()
