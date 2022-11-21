/* eslint-disable no-undef */
const TestCoin = artifacts.require("TestCoin");
const DecentralBank = artifacts.require('DecentralBank');
const RWD = artifacts.require('RWD');

module.exports = async function(deployer,network,accounts) {
    await deployer.deploy(TestCoin);
    const testCoin = await TestCoin.deployed();
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();
    await deployer.deploy(DecentralBank,rwd.address, testCoin.address);
    const decentralBank = await DecentralBank.deployed();

    await rwd.transfer(decentralBank.address,'1000000000000000000000000')
    await testCoin.transfer(accounts[1], '100000000000000000000')
};

