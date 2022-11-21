const { assert } = require('chai');

/* eslint-disable no-undef */
const TestCoin = artifacts.require("TestCoin");
const DecentralBank = artifacts.require('DecentralBank');
const RWD = artifacts.require('RWD');

require('chai').use(require('chai-as-promised')).should()

contract('DecentralBank', ([owner,customer]) => {
 let testCoin, rwd,decentralBank

 function tokens(number) {
     return web3.utils.toWei(number,'ether');
 }

 before(async () => {
     testCoin = await TestCoin.new();
     rwd = await RWD.new();
     decentralBank = await DecentralBank.new(rwd.address,testCoin.address);

     await rwd.transfer(decentralBank.address,tokens('1000000'))

     await testCoin.transfer(customer,tokens('100'),{from:owner})
 })

    describe('Test coin deployment', async () => {
        it('matches name successfully', async () => {
            const name = await testCoin.name()
            assert.equal(name,'Test Coin')
        })
    })

    describe('Reward token deployment', async () => {
        it('matches name successfully', async () => {
            const name = await rwd.name()
            assert.equal(name,'Reward Token')
        })
    })

    describe('Decentral Bank deployment', async () => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name,'Decentral Bank')
        })
        it('contract has tokens',async () => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance,tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        it('rawards tokens for staking', async () => {
            let result
            result = await testCoin.balanceOf(customer);
            assert.equal(result.toString(),tokens('100'),'customer mock wallet balance before staking')

            await testCoin.approve(decentralBank.address,tokens('100'),{from:customer})
            await decentralBank.depositTokens(tokens('100'),{from:customer})

            result = await testCoin.balanceOf(customer);
            assert.equal(result.toString(),tokens('0'),'customer mock wallet balance after staking')

            result = await testCoin.balanceOf(decentralBank.address);
            assert.equal(result.toString(),tokens('100'),'bank mock wallet balance after staking')

            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(),'true',"Customer is staking!")

            await decentralBank.issueTokens({from:owner})
            await decentralBank.issueTokens({from:customer}).should.be.rejected;

            await decentralBank.unstakeTokens({from:customer})

            result = await testCoin.balanceOf(customer);
            assert.equal(result.toString(),tokens('100'),'Customer mock walllet balance after unstaking');

            result = await testCoin.balanceOf(decentralBank.address);
            assert.equal(result.toString(),tokens('0'),'Bank wallet balance after unstaking')

            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(),'false','customer is no longer staking');
           
            })
    })
})