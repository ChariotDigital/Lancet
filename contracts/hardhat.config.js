/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require(`dotenv`).config;
require("hardhat-gas-reporter");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

const config = {
  networks: {
    ropsten: { url: `https://eth-ropsten.alchemyapi.io/v2/melgMrWS-WIy_vuCd3lVQo5Dr0V0fJSw`, accounts: [`950f91426103553e652a909d6885c1fc80d55c84478fcbfcc193e020e1d6c2aa`] },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  gasReporter: {
    enabled: true,
    coinmarketcap: "2bd639b0-ef37-4768-8aa5-b1f6dd6ed437",
    currency: "USD",
  },
  etherscan: {
    apiKey: `9T7GWQQNUCHPS44CYNNUWCXJSTCJXIWQVC`,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          // optimizer: {
          //   enabled: true,
          //   runs: 200,
          // },
        },
      },
    ],
  },
  mocha: {
    timeout: 120000,
  },
};

module.exports = config;
