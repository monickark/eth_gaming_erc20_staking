const TokenReservoir = artifacts.require("TokenReservoir");
const GameManager = artifacts.require("GameManager");
const USDToken = artifacts.require("USDToken");

contract("TokenReservoir", async (accounts) => {
    
    it("register a token to reservoir", async function () {
        const gameManager = await GameManager.deployed();
        const reservoir = await TokenReservoir.deployed();

        await reservoir.addReservoirToken("ABC", '0xc15DeFd71F0c772cF5CE6284C823D61C074A6783', 106)
        const exists = await reservoir.isReservoirTokenAvailable("ABC")
        assert.equal(exists, true);
        const tokenData = await reservoir.reservoirTokenList("ABC")
        assert.equal(tokenData[1], 106);
        assert.equal(tokenData[0], '0xc15DeFd71F0c772cF5CE6284C823D61C074A6783');
    });

    it("update token value", async function () {
        const reservoir = await TokenReservoir.deployed();

        await reservoir.addReservoirToken("ABCD", '0xc15DeFd71F0c772cF5CE6284C823D61C074A6783', 106)
        const tokenData1 = await reservoir.reservoirTokenList("ABCD")
        assert.equal(tokenData1[1], 106);

        await reservoir.updateTokenValue("ABCD", 110)
        const tokenData2 = await reservoir.reservoirTokenList("ABCD")
        assert.equal(tokenData2[1], 110);
    });

    it("disable token", async function () {
        const reservoir = await TokenReservoir.deployed();

        await reservoir.addReservoirToken("ABCDE", '0xc15DeFd71F0c772cF5CE6284C823D61C074A6783', 106)
        const exists1 = await reservoir.isReservoirTokenAvailable("ABCDE")
        assert.equal(exists1, true);

        await reservoir.enableDisableReservoirToken("ABCDE", 0)
        const exists2 = await reservoir.isReservoirTokenAvailable("ABCDE")
        assert.equal(exists2, false);
    });

    it("approve reservoir contract to challenge contract", async function () {
        const reservoir = await TokenReservoir.deployed();
        const gameManager = await GameManager.deployed();
        const usd = await USDToken.deployed();

        await reservoir.setGameManager(gameManager.address);
        await usd.mint(reservoir.address, 1000000);

        const reservoirBalance = await usd.balanceOf(reservoir.address);
        assert.equal(reservoirBalance, 1000000);

        await reservoir.approveToken(usd.address);
        const allowanceAmount = await usd.allowance(reservoir.address, gameManager.address);
        assert.equal(allowanceAmount, 1000000);
    });
});
