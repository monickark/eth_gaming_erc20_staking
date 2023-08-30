const USDToken = artifacts.require("USDToken");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(USDToken, [], { deployer });
  console.log('Deployed', instance.address);
};