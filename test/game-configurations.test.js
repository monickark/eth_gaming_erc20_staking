const GameManager = artifacts.require("GameManager");
const TokenReservoir = artifacts.require("TokenReservoir");
const Lobby = artifacts.require("Lobby");
const Challenge = artifacts.require("Challenge");

contract("Game Configurations", async (accounts) => {

    it("Set contract address - Reservoir Contract", async function () {
        const reservoir = await TokenReservoir.deployed();
        const gameManager = await GameManager.deployed();
        await reservoir.setGameManager(gameManager.address)
        const gameManagerAddress = await reservoir.getGameManager()
        assert.equal(gameManagerAddress, gameManager.address);
    });

    it("Set contract address - Game Manager Contract", async function () {
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
    });

    it("Set contract address - Challenge Contract", async function () {
        const challenge = await Challenge.deployed();
        const gameManager = await GameManager.deployed();
        await challenge.setGameManager(gameManager.address)
        const gameManagerAddress = await challenge.getGameManager()
        assert.equal(gameManagerAddress, gameManager.address);
    });

    it("Set contract address - Deathmatch Contract", async function () {
        const lobby = await Lobby.deployed();
        const gameManager = await GameManager.deployed();
        await lobby.setGameManager(gameManager.address)
        const gameManagerAddress = await lobby.getGameManager()
        assert.equal(gameManagerAddress, gameManager.address);
    });
});
