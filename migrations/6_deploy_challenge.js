const Challenge = artifacts.require("Challenge");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(Challenge, [], { deployer });
  console.log('Deployed', instance.address);
};