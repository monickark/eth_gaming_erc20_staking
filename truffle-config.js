const HDWalletProvider = require("@truffle/hdwallet-provider");
const { mnemonic, etherscanApiKey, infuraProjectId, polygonscanApiKey, maticVigilId } = require('./secrets.json')

module.exports = {
  compilers: {
    solc: {
      version: "0.8.9",
    },
  },
  networks: {
    local: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    mumbai: {
      networkCheckTimeout: 60000,
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://matic-mumbai.chainstacklabs.com"
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    rinkeby: {
      networkCheckTimeout: 60000,
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 4,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    goerli: {
      networkCheckTimeout: 1200000,
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://goerli.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 5,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    polyProd: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 137,
      gasPrice: 1000001235,
      gas: 3252755,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200
    },
    etherProd: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://mainnet.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 1,
      gasPrice: 1000001235,
      gas: 3252755,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: etherscanApiKey,
    polygonscan: polygonscanApiKey
  }
};
