const config = {
    "privateKey": "YOUR_PRIVATE_KEY",
    "erc20ApprovedValue": "115792089237316195423570985008687907853269984665640564039457584007913129639935",
    "erc721collectionAddress": "0xd78efaec85c1a4f42e6edb7209067702a2be8c90",
    "ZERO_ADDRESS": "0x0000000000000000000000000000000000000000"
}

const ERC20_ABI = [
    {
        constant: true,
        inputs: [
        ],
        name: "name",
        outputs: [
            {
                name: "",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_spender",
                type: "address"
            },
            {
                name: "_value",
                type: "uint256"
            }
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
        ],
        name: "totalSupply",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_from",
                type: "address"
            },
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_value",
                type: "uint256"
            }
        ],
        name: "transferFrom",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
        ],
        name: "decimals",
        outputs: [
            {
                name: "",
                type: "uint8"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address"
            }
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "balance",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: true,
        inputs: [
        ],
        name: "symbol",
        outputs: [
            {
                name: "",
                type: "string"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        constant: false,
        inputs: [
            {
                name: "_to",
                type: "address"
            },
            {
                name: "_value",
                type: "uint256"
            }
        ],
        name: "transfer",
        outputs: [
            {
                name: "",
                type: "bool"
            }
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address"
            },
            {
                name: "_spender",
                type: "address"
            }
        ],
        name: "allowance",
        outputs: [
            {
                name: "",
                type: "uint256"
            }
        ],
        payable: false,
        stateMutability: "view",
        type: "function"
    },
    {
        payable: true,
        stateMutability: "payable",
        type: "fallback"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                name: "spender",
                type: "address"
            },
            {
                indexed: false,
                name: "value",
                type: "uint256"
            }
        ],
        name: "Approval",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: "from",
                type: "address"
            },
            {
                indexed: true,
                name: "to",
                type: "address"
            },
            {
                indexed: false,
                name: "value",
                type: "uint256"
            }
        ],
        name: "Transfer",
        type: "event"
    }
];

const MARKET_GATEWAY_ABI = [
    {
        inputs: [
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        name: "AllowedAllPaymentTokens",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8"
            }
        ],
        name: "Initialized",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string[]",
                name: "interfaces",
                type: "string[]"
            },
            {
                indexed: false,
                internalType: "address[]",
                name: "addresses",
                type: "address[]"
            }
        ],
        name: "InterfacesUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract IKatanaRouter",
                name: "KatanaRouterContract",
                type: "address"
            }
        ],
        name: "KatanaRouterUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "referralFeature",
                type: "bool"
            },
            {
                indexed: false,
                internalType: "contract IMarketCommission",
                name: "marketCommission",
                type: "address"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "autoTransferReferralReward",
                type: "bool"
            }
        ],
        name: "MarketCommissionConfigUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "minMarketFeePercentage",
                type: "uint256"
            }
        ],
        name: "MinMarketFeePercentageUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address[]",
                name: "tokens",
                type: "address[]"
            },
            {
                indexed: false,
                internalType: "bool",
                name: "allowed",
                type: "bool"
            }
        ],
        name: "PaymentTokensAllowed",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32"
            }
        ],
        name: "RoleAdminChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleGranted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleRevoked",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        name: "TreasuryUpdated",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "contract IWRON",
                name: "wronContract",
                type: "address"
            },
            {
                indexed: false,
                internalType: "contract IWRONHelper",
                name: "wronHelper",
                type: "address"
            }
        ],
        name: "WRONConfigUpdated",
        type: "event"
    },
    {
        stateMutability: "payable",
        type: "fallback"
    },
    {
        inputs: [
        ],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        ],
        name: "DOMAIN_SEPARATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        ],
        name: "WRON",
        outputs: [
            {
                internalType: "contract IWRON",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        ],
        name: "allowedAllPaymentTokens",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "token",
                type: "address"
            }
        ],
        name: "allowedPaymentToken",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "interfaceName",
                type: "string"
            }
        ],
        name: "getInterface",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        ],
        name: "getMarketCommissionConfig",
        outputs: [
            {
                internalType: "bool",
                name: "referralFeature",
                type: "bool"
            },
            {
                internalType: "contract IMarketCommission",
                name: "marketCommission",
                type: "address"
            },
            {
                internalType: "bool",
                name: "autoTransferReferralReward",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256"
            }
        ],
        name: "getRoleMember",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleMemberCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "grantRole",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IWRON",
                name: "wronContract",
                type: "address"
            },
            {
                internalType: "contract IWRONHelper",
                name: "wronHelper",
                type: "address"
            },
            {
                internalType: "bool",
                name: "allowedAllPaymentTokens",
                type: "bool"
            },
            {
                internalType: "bool",
                name: "referralFeature",
                type: "bool"
            },
            {
                internalType: "contract IMarketCommission",
                name: "marketCommission",
                type: "address"
            },
            {
                internalType: "bool",
                name: "autoTransferReferralReward",
                type: "bool"
            },
            {
                internalType: "address[]",
                name: "paymentTokens",
                type: "address[]"
            },
            {
                internalType: "string[]",
                name: "interfaces",
                type: "string[]"
            },
            {
                internalType: "address[][2]",
                name: "addresses",
                type: "address[][2]"
            }
        ],
        name: "initialize",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "interfaceName",
                type: "string"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            }
        ],
        name: "interactWith",
        outputs: [
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "renounceRole",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "revokeRole",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "flag",
                type: "bool"
            }
        ],
        name: "setAllowedAllPaymentTokens",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "string[]",
                name: "interfaces",
                type: "string[]"
            },
            {
                internalType: "address[]",
                name: "addresses",
                type: "address[]"
            }
        ],
        name: "setInterfaces",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IKatanaRouter",
                name: "routerContract",
                type: "address"
            }
        ],
        name: "setKatanaRouter",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "referralFeature",
                type: "bool"
            },
            {
                internalType: "contract IMarketCommission",
                name: "marketCommission",
                type: "address"
            },
            {
                internalType: "bool",
                name: "autoTransferReferralReward",
                type: "bool"
            }
        ],
        name: "setMarketCommissionConfig",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "tokens",
                type: "address[]"
            },
            {
                internalType: "bool",
                name: "allowed",
                type: "bool"
            }
        ],
        name: "setPaymentTokens",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "contract IWRON",
                name: "wronAddr",
                type: "address"
            },
            {
                internalType: "contract IWRONHelper",
                name: "wronHelperAddr",
                type: "address"
            }
        ],
        name: "setWRONConfig",
        outputs: [
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4"
            }
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
        ],
        name: "wronHelper",
        outputs: [
            {
                internalType: "contract IWRONHelper",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        stateMutability: "payable",
        type: "receive"
    }
];

const MAVIS_EXCHANGE_ABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "maker",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
            },
        ],
        name: "MakerNonceUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "address",
                name: "requester",
                type: "address",
            },
        ],
        name: "OrderCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "maker",
                                type: "address",
                            },
                            {
                                internalType: "enum OrderKind",
                                name: "kind",
                                type: "uint8",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum TokenStandard",
                                        name: "erc",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "addr",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "id",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "quantity",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct Asset[]",
                                name: "assets",
                                type: "tuple[]",
                            },
                            {
                                internalType: "uint256",
                                name: "expiredAt",
                                type: "uint256",
                            },
                            {
                                internalType: "address",
                                name: "paymentToken",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "startedAt",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "baseUnitPrice",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endedAt",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endedUnitPrice",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "expectedState",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "nonce",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "hash",
                                type: "bytes32",
                            },
                            {
                                internalType: "bool",
                                name: "verified",
                                type: "bool",
                            },
                        ],
                        internalType: "struct GenericOrder",
                        name: "info",
                        type: "tuple",
                    },
                    {
                        internalType: "uint256",
                        name: "realPrice",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "extraData",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "refunder",
                        type: "address",
                    },
                ],
                indexed: false,
                internalType: "struct GenericOrderExtended",
                name: "order",
                type: "tuple",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "settlePrice",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "settleToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "matcher",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "acceptedSettlePrice",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "enum IMarketCommission.AllocType",
                        name: "allocType",
                        type: "uint8",
                    },
                    {
                        internalType: "address payable",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "owner",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "ratio",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "value",
                        type: "uint256",
                    },
                ],
                indexed: false,
                internalType: "struct IMarketCommission.Allocation[]",
                name: "receivedAllocs",
                type: "tuple[]",
            },
        ],
        name: "OrderMatched",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MARKET_OPERATOR",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes",
                name: "orderData",
                type: "bytes",
            },
        ],
        name: "cancelOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "getRoleMember",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleMemberCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "enum TokenStandard",
                        name: "erc",
                        type: "uint8",
                    },
                    {
                        internalType: "address",
                        name: "addr",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "quantity",
                        type: "uint256",
                    },
                ],
                internalType: "struct Asset[]",
                name: "assets",
                type: "tuple[]",
            },
        ],
        name: "getState",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "increaseNonceMaker",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "interfaceName",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "maker",
                type: "address",
            },
        ],
        name: "makerNonce",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
        ],
        name: "orderFinalized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "hash",
                type: "bytes32",
            },
            {
                internalType: "bytes",
                name: "orderData",
                type: "bytes",
            },
        ],
        name: "orderValid",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "orderData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "referralAddr",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "expectedState",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "refunder",
                        type: "address",
                    },
                ],
                internalType: "struct SettleParameter",
                name: "settleInfo",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "settlePrice",
                type: "uint256",
            },
        ],
        name: "settleOrder",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "orderData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "referralAddr",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "expectedState",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "refunder",
                        type: "address",
                    },
                ],
                internalType: "struct SettleParameter",
                name: "settleInfo",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
        ],
        name: "swapRONAndSettleOrder",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "bytes",
                        name: "orderData",
                        type: "bytes",
                    },
                    {
                        internalType: "bytes",
                        name: "signature",
                        type: "bytes",
                    },
                    {
                        internalType: "address",
                        name: "referralAddr",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "expectedState",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "recipient",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "refunder",
                        type: "address",
                    },
                ],
                internalType: "struct SettleParameter",
                name: "settleInfo",
                type: "tuple",
            },
            {
                internalType: "uint256",
                name: "settlePrice",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "address[]",
                name: "path",
                type: "address[]",
            },
        ],
        name: "swapTokensAndSettleOrder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32[]",
                name: "hashList",
                type: "bytes32[]",
            },
        ],
        name: "tryBulkCancelOrderByHash",
        outputs: [
            {
                internalType: "bool[]",
                name: "orderAlreadyFinalized",
                type: "bool[]",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];

//ENUM
const ErcAssetItem = Object.freeze({
    Erc20: 0,
    Erc721: 1,
    Erc1155: 2,
});

//ENUM
const OrderKind = Object.freeze({
    Offer: 0,
    Sell: 1,
});

module.exports = {
    config,
    ERC20_ABI,
    MARKET_GATEWAY_ABI,
    MAVIS_EXCHANGE_ABI,
    ErcAssetItem,
    OrderKind
}