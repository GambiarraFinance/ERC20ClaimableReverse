const hre = require("hardhat");
const now = Math.floor(new Date().getTime() / 1000);
const BigNumber = require('bignumber.js')

const ethers = hre.ethers;
const generatedReal = require('../test/generatedReal')

const START_TIME = now;
const END_TIME = now + 86400 * 365;

const YOUR_TOKEN_AIRDROP = '';
// change for your merkleRoot
// get merkleRoot on ./generatedReal
const merkleRoot = generatedReal.merkleRoot;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deployAirdrop(creator,tokenAddress,merkleRoot,start_time, end_time) {
    const GambAirdrop = await ethers.getContractFactory('Airdrop', creator);

    const airdrop = await GambAirdrop.deploy(
        tokenAddress,
        merkleRoot,
        start_time,
        end_time
    );

    return airdrop;
}

// WARNING: only testnet 
async function deployAirdropTest(creator,merkleRoot,start_time, end_time) {
    const GambAirdrop = await ethers.getContractFactory('Airdrop', creator);
    const TestTokenA = await ethers.getContractFactory('TestTokenA')

    const amount_aidrop = 200000000000000000000000;
    const amount = new BigNumber(amount_aidrop).toFixed();
    const testToken = await TestTokenA.deploy(amount);
    const airdrop = await GambAirdrop.deploy(
        testToken.address,
        merkleRoot,
        start_time,
        end_time
    );

    await testToken.transfer(airdrop.address, amount);
    return airdrop;
}


async function main() {
    const [deployer] = await ethers.getSigners();
    
    // // WARNING: only testnet 
    // const airdrop = await deployAirdropTest(deployer, merkleRoot, START_TIME, END_TIME);
    
    const airdrop = await deployAirdrop(deployer,YOUR_TOKEN_AIRDROP, merkleRoot, START_TIME, END_TIME);

    console.table({
        start: START_TIME,
        end_time: END_TIME,
        merkleRoot: merkleRoot,
        Airdrop:airdrop.address,
    });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
