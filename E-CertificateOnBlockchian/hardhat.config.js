require("@nomiclabs/hardhat-waffle");

const DETERMINISTIC_MNEMONIC =
  "test test test test test test test test test test test junk";

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {
      chainId: 1337, // Fixed chain ID for persistence
      accounts: {
        mnemonic: DETERMINISTIC_MNEMONIC,
      },
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337, // Fixed chain ID for localhost as well
      accounts: {
        mnemonic: DETERMINISTIC_MNEMONIC,
      },
    },
  },
};
