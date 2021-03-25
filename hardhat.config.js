// hardhat.config.js
const { alchemyApiKey, mnemonic, mnemonicMainnet } = require('./secrets.json');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-truffle5');
require('@nomiclabs/hardhat-solhint');
require('solidity-coverage');
require('hardhat-gas-reporter');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
      gasPrice: 150000000000,
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonicMainnet },
      gasPrice: 150000000000,
    },
  },
  solidity: '0.8.3',
};
