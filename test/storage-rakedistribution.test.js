const GameManager = artifacts.require("GameManager");
const truffleAssert = require('truffle-assertions');

contract("GameManager", async (accounts) => {

    it("register a rake distribution", async function () {
        const gameManager = await GameManager.deployed();
        await gameManager.createRakeDistribution("default", {
            xmannaReward: 20,
            userReward: 20,
            gameDeveloperReward: 50,
            channelOperatorReward: 10,
            xmannaRewardAddress: accounts[0],
            userRewardAddress: accounts[1],
            gameDeveloperRewardAddress: accounts[2],
            channelOperatorRewardAddress: accounts[3],
        })
        const exists = await gameManager.rakeDistFlags("default")
        assert.equal(exists, true);
    });

    it("should reject register the invalid rake distribution with total 100 error", async function () {
        const gameManager = await GameManager.deployed();
        await truffleAssert.reverts(gameManager.createRakeDistribution("wrongRake", {
            xmannaReward: 50,
            userReward: 50,
            gameDeveloperReward: 50,
            channelOperatorReward: 0,
            xmannaRewardAddress: accounts[0],
            userRewardAddress: accounts[1],
            gameDeveloperRewardAddress: accounts[2],
            channelOperatorRewardAddress: accounts[3],
        }), "distributions did not add up to 100");
    });

    it("should update the rake distribution", async function () {
        const gameManager = await GameManager.deployed();
        await gameManager.updateRakeDistribution("default", {
            xmannaReward: 30,
            userReward: 30,
            gameDeveloperReward: 30,
            channelOperatorReward: 10,
            xmannaRewardAddress: accounts[0],
            userRewardAddress: accounts[1],
            gameDeveloperRewardAddress: accounts[2],
            channelOperatorRewardAddress: accounts[3],
        });
    });

    it("should fail to update the rake distribution with total 100 error", async function () {
        const gameManager = await GameManager.deployed();
        await truffleAssert.reverts(gameManager.updateRakeDistribution("default", {
            xmannaReward: 50,
            userReward: 50,
            gameDeveloperReward: 50,
            channelOperatorReward: 0,
            xmannaRewardAddress: accounts[0],
            userRewardAddress: accounts[1],
            gameDeveloperRewardAddress: accounts[2],
            channelOperatorRewardAddress: accounts[3],
        }), "distributions did not add up to 100");
    });

    it("should check rake exists", async function () {
        const gameManager = await GameManager.deployed();
        const exists = await gameManager.rakeDistFlags("default")
        assert.equal(exists, true);
    });
});