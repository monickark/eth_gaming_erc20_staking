const TokenReservoir = artifacts.require("TokenReservoir");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(TokenReservoir, [], { deployer });
  console.log('Deployed', instance.address);
};
