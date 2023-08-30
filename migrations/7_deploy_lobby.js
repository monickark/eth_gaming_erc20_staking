const Lobby = artifacts.require("Lobby");
const { deployProxy } = require('@openzeppelin/truffle-upgrades');

module.exports = async function (deployer) {
  const instance = await deployProxy(Lobby, [], { deployer });
  console.log('Deployed', instance.address);
};