const GameManager = artifacts.require("GameManager");
const USDToken = artifacts.require("USDToken");
const BonusToken = artifacts.require("BonusToken");
const Lobby = artifacts.require("Lobby");
const Challenge = artifacts.require("Challenge");
const TokenReservoir = artifacts.require("TokenReservoir");
const ERC20Token = artifacts.require("ERC20Token");

const config = require('./challenge.config');
const { xmannaRewardWallet, userRewardWallet, gameDeveloperReward, channelOperatorReward } = require('./challenge.config');

const channelOpId = 'xda';
const challengeId = 'challenge#1';
const playOptionId = 'soli#1';
let token1 = null;
let token2 = null;


const balanceCheck = async function (accounts, token) {
    //token name
    const name = await token.name();
    const totalSupply = await token.totalSupply();
    console.log(`\n===${name}===`);
    console.log(`totalSupply - ${totalSupply.toString()}\n`);

    //account Balance
    for (const index of [0, 1, 2, 3, 4, 5]) {
        const balance = await token.balanceOf(accounts[index]);
        if (balance > 0) {
            console.log(`Account ${index} - ${balance.toString()}`);
        }
    }

    //reservoir balance
    const xMannaBalance = await token.balanceOf(accounts[6]);
    const userBalance = await token.balanceOf(accounts[7]);
    const gameDeveloperBalance = await token.balanceOf(accounts[8]);
    const channelOperatorBalance = await token.balanceOf(accounts[9]);
    console.log(`\nxManna Balance - ${xMannaBalance}`)
    console.log(`User Balance - ${userBalance}`)
    console.log(`Game developer Balance - ${gameDeveloperBalance}`)
    console.log(`Channel Operator Balance - ${channelOperatorBalance}`)

    //reservoir balance
    const reservoir = await TokenReservoir.deployed();
    const reservoirBalance = await token.balanceOf(reservoir.address);
    console.log(`\nReservoir Balance - ${reservoirBalance}`)

    //game manager balance
    const gameManager = await GameManager.deployed();
    const reserveWallet = await token.balanceOf(gameManager.address);
    console.log(`Game Manager Wallet Balance - ${reserveWallet}`)
}

const deploySampleToken = async function (accounts) {
    token1 = await ERC20Token.new(
        "xDemo",
        "xDemo"
    );
    token2 = await ERC20Token.new(
        "xSample",
        "xSample"
    );
    const symbol1 = await token1.symbol();
    assert.equal(symbol1, "xDemo", "Sample token deployement failed");
    const symbol2 = await token2.symbol();
    assert.equal(symbol2, "xSample", "Sample token deployement failed");
}

const registerRake = async function (accounts) {
    const gameManager = await GameManager.deployed();

    await gameManager.createRakeDistribution("solitare", {
        xmannaReward: 20,
        userReward: 20,
        gameDeveloperReward: 50,
        channelOperatorReward: 10,
        xmannaRewardAddress: accounts[xmannaRewardWallet],
        userRewardAddress: accounts[userRewardWallet],
        gameDeveloperRewardAddress: accounts[gameDeveloperReward],
        channelOperatorRewardAddress: accounts[channelOperatorReward],
    })
    const exists = await gameManager.rakeDistFlags("solitare")
    assert.equal(exists, true);
}

const gameManagerConfig = async function () {
    const gameManager = await GameManager.deployed();
    const challenge = await Challenge.deployed();
    const lobby = await Lobby.deployed();
    const reservoir = await TokenReservoir.deployed();

    await gameManager.setContractAddresses(reservoir.address,challenge.address,lobby.address);
    const reservoirAddress = await gameManager.reservoirContractAddress()
    assert.equal(reservoirAddress, reservoir.address);
    const challengerAddress = await gameManager.challengeContractAddress()
    assert.equal(challengerAddress, challenge.address);
    const deathmatchAddress = await gameManager.deathmatchContractAddress()
    assert.equal(deathmatchAddress, lobby.address);

}

const challengeConfig = async function () {
    const challenge = await Challenge.deployed();
    const gameManager = await GameManager.deployed();

    await challenge.setGameManager(gameManager.address);
    await challenge.setWinnerAndWinnings(1, [100]);
    await challenge.setWinnerAndWinnings(2, [50, 50]);
};

const reservoirConfig = async function () {
    const reservoir = await TokenReservoir.deployed();
    const gameManager = await GameManager.deployed();
    const usd = await USDToken.deployed();
    const bonus = await BonusToken.deployed();
    await reservoir.setGameManager(gameManager.address);

    await reservoir.addReservoirToken(await usd.name(), usd.address, 1);
    await reservoir.addReservoirToken(await bonus.name(), bonus.address, 1);
    await reservoir.addReservoirToken(await token1.name(), token1.address, 2);
    await reservoir.addReservoirToken(await token2.name(), token2.address, 3);

    const gamemanagerAddress = await reservoir.getGameManager();
    assert.equal(gamemanagerAddress, gameManager.address);
    const usdToken = await reservoir.reservoirTokenList(await usd.name())
    assert.equal(usdToken.tokenValue, 1);
    const bonusToken = await reservoir.reservoirTokenList(await bonus.name())
    assert.equal(bonusToken.tokenValue, 1);
    const ercToken1 = await reservoir.reservoirTokenList(await token1.name())
    assert.equal(ercToken1.tokenValue, 2);
    const ercToken2 = await reservoir.reservoirTokenList(await token2.name())
    assert.equal(ercToken2.tokenValue, 3);
}

const playOption = async function () {
    const gameManager = await GameManager.deployed();

    await gameManager.createPlayOption(playOptionId, {
        rakePercentage: 20,
        gameCharges: "12000",
        noOfPlayers: 2,
        gameId: 'solitare',
        playOptionType: 'challenge'
    })
    const exists = await gameManager.isPlayOptAvailable(playOptionId)
    assert.equal(exists, true);
    const playOption = await gameManager.playOptValues(playOptionId)
    assert.equal(playOption.noOfPlayers, 2);
    assert.equal(playOption.gameCharges, "12000");
};

const takeFundsPermission = async function (accounts) {
    const usd = await USDToken.deployed();
    const bonus = await BonusToken.deployed();
    const gameManager = await GameManager.deployed();
    const challenge = await Challenge.deployed();

    const gameContractRoleUsd = await usd.GAME_CONTRACT_ROLE();
    const minterRole = await usd.MINTER_ROLE();

    await usd.grantRole(gameContractRoleUsd, challenge.address);
    await usd.grantRole(minterRole, challenge.address);

    await usd.grantRole(gameContractRoleUsd, gameManager.address);
    await usd.grantRole(minterRole, gameManager.address);

    const gameContractRoleBonus = await bonus.GAME_CONTRACT_ROLE();
    await bonus.grantRole(gameContractRoleBonus, gameManager.address);
};

const printBalance = async function (accounts) {
    const challenge = await Challenge.deployed();
    const mintedUsd = await challenge.mintedUsd();

    console.log("\n\nBALANCE CHECK")
    console.log(`\nMinted usd - ${mintedUsd.toString()}`)

    await balanceCheck(accounts, await USDToken.deployed());
    await balanceCheck(accounts, await BonusToken.deployed());
    await balanceCheck(accounts, await token1);
    await balanceCheck(accounts, await token2);
};

const createChallenge = async function (player, tokenId) {
    const challenge = await Challenge.deployed();

    await challenge.addNewChallenge({
        player: player,
        channelOpId,
        challengeId,
        playOptionId,
        tokenId
    })
}

const joinChallenge = async function (player, tokenId) {
    const challenge = await Challenge.deployed();

    await challenge.joinExistingChallenge({
        player: player,
        channelOpId,
        challengeId,
        tokenId
    })
};

const endChallenge = async function (player) {
    const challenge = await Challenge.deployed();
    await challenge.endChallenge([player], challengeId)
};

const drawChallenge = async function (player) {
    const challenge = await Challenge.deployed();
    await challenge.drawChallenge(challengeId)
};

const exitChallenge = async function (player) {
    const challenge = await Challenge.deployed();
    await challenge.exitChallenge(challengeId)
};


const giveBalance = async function (to, token, amount, bonusAmount) {
    const gameManager = await GameManager.deployed();

    if (amount) {
        if (token == "usd") {
            const usd = await USDToken.deployed();
            await usd.mint(to, amount);
        } else if (token == "xDemo") {
            await token1.mint(to, amount);
            token1.approve(gameManager.address, amount, { from: to })
        } else if (token == "xSample") {
            await token2.mint(to, amount);
            token2.approve(gameManager.address, amount, { from: to })
        }
    }
    if (bonusAmount) {
        const bonus = await BonusToken.deployed();
        await bonus.mint(to, bonusAmount);
    }
};


const giveReservoirBalance = async function () {
    const reservoir = await TokenReservoir.deployed();
    const usd = await USDToken.deployed();
    const bonus = await BonusToken.deployed();

    await usd.mint(reservoir.address, 30000);
    await bonus.mint(reservoir.address, 30000);
    await token1.mint(reservoir.address, 60000);
    await token2.mint(reservoir.address, 90000);

    await reservoir.approveToken(token1.address);
    await reservoir.approveToken(token2.address);
}

const checkBalance = async function (from, tokenId, tokenAmount, bonusAmount) {
    if (tokenAmount) {
        if (tokenId == "usd") {
            const usd = await USDToken.deployed();
            assert.equal(await usd.balanceOf(from).valueOf(), tokenAmount);
        } else if (tokenId == "xDemo") {
            assert.equal(await token1.balanceOf(from).valueOf(), tokenAmount);
        } else if (tokenId == "xSample") {
            assert.equal(await token2.balanceOf(from).valueOf(), tokenAmount);
        }
    }
    if (bonusAmount) {
        const bonus = await BonusToken.deployed();
        assert.equal(await bonus.balanceOf(from).valueOf(), bonusAmount);
    }
};

const setup = async function (accounts) {
    //deploy sample tokens
    await deploySampleToken(accounts);
    // set register rake distribution
    await registerRake(accounts);
    // set game manager configurations
    await gameManagerConfig();
    // set reservoir configuration
    await reservoirConfig();
    // set challenge configurations
    await challengeConfig();
    // register a play option
    await playOption();
    // give challenge contract the permission to use takeFunds method
    await takeFundsPermission(accounts);
};

const playChallengePlayer1Win = async function (accounts, token) {
    // create challenge with player 1
    await createChallenge(accounts[0], token[0].token);
    // join challenge with player 2
    await joinChallenge(accounts[1], token[1].token);
    // end challenge with player 1 as winner
    await endChallenge(accounts[0]);
}

const playChallengePlayer2Win = async function (accounts, token) {
    // create challenge with player 1
    await createChallenge(accounts[0], token[0].token);
    // join challenge with player 2
    await joinChallenge(accounts[1], token[1].token);
    // end challenge with player 2 as winner
    await endChallenge(accounts[1]);
}

const drawChallengePlayerRefundWithRake = async function (accounts, token) {
    // create challenge with player 1
    await createChallenge(accounts[0], token[0].token);
    // join challenge with player 2
    await joinChallenge(accounts[1], token[1].token);
    // end challenge with player 1 as winner
    await drawChallenge();
}

const exitChallengePlayerRefund = async function (accounts, token) {
    // create challenge with player 1
    await createChallenge(accounts[0], token[0].token);
    // join challenge with player 2
    await joinChallenge(accounts[1], token[1].token);
    // end challenge with player 1 as winner
    await exitChallenge();
}

config.tests.forEach(({
    give, expect, title, scenario
}) => {
    contract(title, async (accounts) => {
        it("should setup", async function () {
            await setup(accounts);
        });

        it("give tokens to players and reservoir", async function () {
            // give bonus cash to players
            for (const index of Object.keys(give)) {
                // TODO give balance of weth and bonus usd to players
                await giveBalance(accounts[index], give[index].token, give[index].value, give[index].bonus)
            }
            await giveReservoirBalance();

            await printBalance(accounts);
        });

        it("should check scenario", async function () {
            switch (scenario) {
                case "win":
                    await playChallengePlayer1Win(accounts, give);
                    break;
                case "winp1":
                    await playChallengePlayer1Win(accounts, give);
                    break;
                case "winp2":
                    await playChallengePlayer2Win(accounts, give);
                    break;
                case "draw":
                    await drawChallengePlayerRefundWithRake(accounts, give);
                    break;
                default:
                    await exitChallengePlayerRefund(accounts, give);
                    break;
            }
            await printBalance(accounts);
        });


        it("check holders, contract and players wallet balance", async function () {
            for (const index of Object.keys(expect)) {
                await checkBalance(accounts[index], expect[index].token, expect[index].value, expect[index].bonus)
            }
        });
    });
})