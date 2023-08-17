require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
      }
    }
  },
  networks: {
    localhost: {
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      url: "http://localhost:8545",
    },
    localhost_2: {
      accounts: ["0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"],
      url: "http://localhost:8545",
    },
    localhostSapo: {
      accounts: ["0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897"],
      url: "http://localhost:8545",
    },
  }

};
