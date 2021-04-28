
import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-etherscan"
import { task } from "hardhat/config"
import { promises as fs } from 'fs'
import { ethers } from 'ethers'
import { generate, generateReal } from './src/generate'
import { rawData } from './src/rawData'

require('dotenv').config()

task("test:prepare_data", "Generate data that required by test", async (taskArguments, hre) => {
  /* As hardhat allows to access its runtime environment variables, 
    we don't need to declare the self-generated accounts as a global variable */
  const accounts = await hre.ethers.getSigners()
  const template = generate(accounts.map(x => x.address.toLowerCase()))
  await fs.writeFile('./test/generated.js', template)
  console.log('✨ test/generated.js generated')

  if (process.env.REAL === 'true') {
    const templateReal = generateReal(rawData)
    await fs.writeFile('./test/generatedReal.js', templateReal)
    console.log('✨ test/generatedReal.js generated')
  }
})

/* subtasks help us get rid of another script and
  package json script like `hardhat prepare_data && hardhat test` */
task("test:finally", "Test after data prepared")
  /* pass param from cli: `hardhat test:finally --real true` */
  .addOptionalParam("real", "whether using real data", "false")
  .setAction(async (taskArguments, hre) => {
    await hre.run("test:prepare_data")
    /* but pass param to a built-in task is not convenient, recommend using node's process.env */
    await hre.run("test")
  })

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      /* if using ganache + truffle, to handle self-generated accounts,
      you have to write more code to launch server with ganache-core api */
      accounts: [...new Array(300)].map(() => {
        const { privateKey } = ethers.Wallet.createRandom()
        return {
          balance: '0x' + (10 ** 20).toString(16),
          privateKey
        }
      })
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/" + process.env.INFURA_ID,
      chainId: 3,
      gasPrice: 20000000000,
      // accounts: {mnemonic: mnemonic}
      accounts: [process.env.PRIVATE_KEY],
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/" + process.env.INFURA_ID,
      chainId: 4,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/" + process.env.INFURA_ID,
      chainId: 5,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    kovan: {
      url: "https://kovan.infura.io/v3/" + process.env.INFURA_ID,
      chainId: 42,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-2-s3.binance.org:8545/",
      chainId: 97,
      accounts: [process.env.PRIVATE_KEY],
    },
    poa: {
      url: "https://core.poanetwork.dev",
      chainId: 99,
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    poasokol: {
      url: "https://sokol.poa.network",
      chainId: 77,
      gasPrice: 20000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
    xdai: {
      url: "https://dai.poa.network/",
      chainId: 100,
      gasPrice: 1000000000,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: "0.7.0",
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHER_SCAN
  },
};

