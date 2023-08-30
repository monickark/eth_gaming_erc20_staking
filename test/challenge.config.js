module.exports = {
    xmannaRewardWallet: 6,
    userRewardWallet: 7,
    gameDeveloperReward: 8,
    channelOperatorReward: 9,
    tests: [
        {
            title: 'Challenge 0-100/0-100 Win',
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
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "8000",
                    bonus: "12000",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge 0-100/0-100 Draw',
            scenario: "draw",
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
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "0",
                    bonus: "10000",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "10000",
                }
            }
        },
        {
            title: 'Challenge 0-100/0-100 Exit',
            scenario: "exit",
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
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "0",
                    bonus: "12000",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "12000",
                }
            }
        },
        {
            title: 'Challenge 90-10/85-15 Win',
            scenario: "win",
            give: {
                0: {
                    token: "usd",
                    value: "10800",
                    bonus: "1200",
                },
                1: {
                    token: "usd",
                    value: "10200",
                    bonus: "1800",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "18800",
                    bonus: "1200",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge 10-90/100-0 Win',
            scenario: "win",
            give: {
                0: {
                    token: "usd",
                    value: "1200",
                    bonus: "10800",
                },
                1: {
                    token: "usd",
                    value: "12000",
                    bonus: "",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "9200",
                    bonus: "10800",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge 50-50/95-5 P2 Win',
            scenario: "winp2",
            give: {
                0: {
                    token: "usd",
                    value: "6000",
                    bonus: "6000",
                },
                1: {
                    token: "usd",
                    value: "11400",
                    bonus: "600",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                },
                1: {
                    token: "usd",
                    value: "19400",
                    bonus: "600",
                }
            }
        },
        {
            title: 'Challenge 50-50/50-50 Win',
            scenario: "win",
            give: {
                0: {
                    token: "usd",
                    value: "6000",
                    bonus: "6000",
                },
                1: {
                    token: "usd",
                    value: "6000",
                    bonus: "6000",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "14000",
                    bonus: "6000",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge 100-0/100-0 Win',
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
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "20000",
                    bonus: "0",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge OT / OT P1 Win',
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
                }
            },
            expect: {
                0: {
                    token: "xDemo",
                    value: "40000",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge OT / OT P2 Win',
            scenario: "winp2",
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
                }
            },
            expect: {
                0: {
                    token: "xDemo",
                    value: "0",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "60000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge OT / OT Exit',
            scenario: "exit",
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
                }
            },
            expect: {
                0: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge OT / OT Draw',
            scenario: "draw",
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
                }
            },
            expect: {
                0: {
                    token: "xDemo",
                    value: "20000",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "30000",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge OT / 85-15 P1 Win',
            scenario: "win",
            give: {
                0: {
                    token: "xDemo",
                    value: "24000",
                    bonus: "0",
                },
                1: {
                    token: "usd",
                    value: "10200",
                    bonus: "1800",
                }
            },
            expect: {
                0: {
                    token: "xDemo",
                    value: "40000",
                    bonus: "0",
                },
                1: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                }
            }
        },
        {
            title: 'Challenge 10-90/ OT P2 Win',
            scenario: "winp2",
            give: {
                0: {
                    token: "usd",
                    value: "1200",
                    bonus: "10800",
                },
                1: {
                    token: "xSample",
                    value: "36000",
                    bonus: "0",
                }
            },
            expect: {
                0: {
                    token: "usd",
                    value: "0",
                    bonus: "0",
                },
                1: {
                    token: "xSample",
                    value: "60000",
                    bonus: "0",
                }
            }
        }
    ]
}