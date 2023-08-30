const GameManager = artifacts.require("GameManager");
const truffleAssert = require('truffle-assertions');

contract("GameManager", async (accounts) => {

    it("register a rake distribution", async function () {
        const gameManager = await GameManager.deployed();
        await gameManager.createRakeDistribution("solitare", {
            xmannaReward: 20,
            userReward: 20,
            gameDeveloperReward: 50,
            channelOperatorReward: 10,
            xmannaRewardAddress: accounts[0],
            userRewardAddress: accounts[1],
            gameDeveloperRewardAddress: accounts[2],
            channelOperatorRewardAddress: accounts[3],
        })
        const exists = await gameManager.rakeDistFlags("solitare")
        assert.equal(exists, true);
    });


    it("register a play option", async function () {
        const gameManager = await GameManager.deployed();
        await gameManager.createPlayOption("solitare#123", {
            rakePercentage: 20,
            gameCharges: 50,
            noOfPlayers: 2,
            gameId: 'solitare',
            playOptionType: 'challenge'
        })
        const exists = await gameManager.isPlayOptAvailable("solitare#123")
        assert.equal(exists, true);
    });

    it("should reject register the invalid play option with 0 value", async function () {
        const gameManager = await GameManager.deployed();
        await truffleAssert.reverts(gameManager.createPlayOption("solitare#124", {
            rakePercentage: 20,
            gameCharges: 0,
            noOfPlayers: 2,
            gameId: 'solitare',
            playOptionType: 'challenge'
        }), "charges should be gt 0");
        await truffleAssert.reverts(gameManager.createPlayOption("solitare#124", {
            rakePercentage: 20,
            gameCharges: 20,
            noOfPlayers: 0,
            gameId: 'solitare',
            playOptionType: 'challenge'
        }), "no of players should be gt 0");
    });

    it("should update the play option", async function () {
        const gameManager = await GameManager.deployed();
        await gameManager.updatePlayOption("solitare#123", {
            rakePercentage: 20,
            gameCharges: 100,
            noOfPlayers: 2,
            gameId: 'solitare',
            playOptionType: 'challenge'
        });
    });

    it("should fail to update the challenge charge 0", async function () {
        const gameManager = await GameManager.deployed();
        await truffleAssert.reverts(gameManager.updatePlayOption("solitare#123", {
            rakePercentage: 20,
            gameCharges: 0,
            noOfPlayers: 2,
            gameId: 'solitare',
            playOptionType: 'challenge'
        }), "charges should be gt 0");
    });

    it("should check play option exists", async function () {
        const gameManager = await GameManager.deployed();
        const exists = await gameManager.isPlayOptAvailable("solitare#123")
        assert.equal(exists, true);
    });

    it("disable play option", async function () {
        const gameManager = await GameManager.deployed();
        await gameManager.enableDisablePlayOpton("solitare#123", 0)
        const exists = await gameManager.isPlayOptAvailable("solitare#123")
        assert.equal(exists, false);
    });

});