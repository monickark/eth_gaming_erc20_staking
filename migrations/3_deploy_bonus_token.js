const BonusToken = artifacts.require("BonusToken");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(BonusToken, [], { deployer });
  console.log('Deployed', instance.address);
};