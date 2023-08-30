const GameManager = artifacts.require("GameManager");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(GameManager, [], { deployer });
  console.log('Deployed', instance.address);
};