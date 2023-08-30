module.exports = {
    xmannaRewardWallet: 4,
    userRewardWallet: 5,
    gameDeveloperReward: 6,
    channelOperatorReward: 7,
    tests: [
        {
            title: 'DeathMatch 0-100/0-100/0-100 Win',
            scenario: "win",
            give: {
                0: {
                    token: "usd",
                    value: "",
                    bonus: "12000",
                },
                1: {
                    token: "usd",
                    value: "",
                    bonus: "12000",
                },
                2: {
                    token: "usd",
                    value: "",
                    bonus: "12000",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "9000",
                    bonus: "12000",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "9000",
                }
            }
        },
        {
            title: 'DeathMatch 100-0/100-0/100-0 Win',
            scenario: "win",
            give: {
                0: {
                    token: "usd",
                    value: "12000",
                    bonus: "0",
                },
                1: {
                    token: "usd",
                    value: "12000",
                    bonus: "0",
                },
                2: {
                    token: "usd",
                    value: "12000",
                    bonus: "0",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "21000",
                    bonus: "0",
                },
                1: {
                    token: "usd",
                    value: "9000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'DeathMatch OT/OT/100-0 Win',
            scenario: "win",
            give: {
                0: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                },
                2: {
                    token: "usd",
                    value: "12000",
                    bonus: "0",
                }
            },
            expect: {
                0: {
                    token: "xDemo",
                    value: "42000",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "27000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'DeathMatch OT/OT/0-100 Win',
            scenario: "win",
            give: {
                0: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                },
                1: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                2: {
                    token: "usd",
                    value: "0",
                    bonus: "12000",
                }
            },
            expect: {
                0: {
                    token: "xSample",
                    value: "63000",
                    bonus: "0",
                },
                1: {
                    token: "xDemo",
                    value: "18000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'DeathMatch 0-100/OT/OT Exit Loby',
            scenario: "exitlobby",
            give: {
                0: {
                    token: "usd",
                    value: "",
                    bonus: "12000",
                },
                1: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                2: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "",
                    bonus: "12000",
                },
                1: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                2: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'DeathMatch 100-0/OT/OT Exit Room',
            scenario: "exitroom",
            give: {
                0: {
                    token: "usd",
                    value: "12000",
                    bonus: "0",
                },
                1: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                2: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "12000",
                    bonus: "0",
                },
                1: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                2: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                }
            }
        }
    ]
}