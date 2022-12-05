import React from 'react';
import TestCoin from '../truffle_abis/TestCoin.json';
import RWDToken from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Web3 from 'web3';

export const loadWeb3 = async () => {
    if (window.ethereuem) {
        window.web3 = new Web3(window.ethereuem);
        await window.ethereuem.enable();
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert("Browser does not support WEB3.")
    }
}

export const loadBlockChainData = async () => {
    window.ethereum.request({ method: 'eth_requestAccounts' })
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    let accountData = { address: account[0] };
    const networkId = await web3.eth.net.getId();

    const testCoinData = TestCoin.networks[networkId];
    if (testCoinData) {
        const testCoin = new web3.eth.Contract(TestCoin.abi, testCoinData.address)
        accountData = { ...accountData, testCoin };
        let testCoinBalance = await testCoin.methods.balanceOf(accountData.address).call();
        accountData = { ...accountData, testCoinBalance: web3.utils.fromWei(testCoinBalance.toString(), 'ether') }
    } else {
        window.alert("ERROR!, Testcoin is not deployed");
    }

    const rwdData = RWDToken.networks[networkId];
    if (rwdData) {
        const rwdToken = new web3.eth.Contract(RWDToken.abi, rwdData.address)
        accountData = { ...accountData, rwdToken };
        let rwdTokenBalance = await rwdToken.methods.balanceOf(accountData.address).call();
        accountData = { ...accountData, rwdBalance: web3.utils.fromWei(rwdTokenBalance.toString(), 'ether') }
    } else {
        window.alert("ERROR!, RWDToken is not deployed");
    }

    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
        const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
        accountData = { ...accountData, decentralBank };
        let stakingBalance = await decentralBank.methods.stakingBalance(accountData.address).call();
        accountData = { ...accountData, stakingBalance: web3.utils.fromWei(stakingBalance.toString(), 'ether') }
    } else {
        window.alert("ERROR!, Decentral bank is not deployed");
    }
    accountData = { ...accountData, loading: false };
    return accountData;
}

export const getBalance = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const testCoinData = TestCoin.networks[networkId];
    if (testCoinData) {
        const testCoin = new web3.eth.Contract(TestCoin.abi, testCoinData.address)
        let testCoinBalance = await testCoin.methods.balanceOf(account[0]).call();
        return web3.utils.fromWei(testCoinBalance.toString(), 'ether');
    }
}

export const issueFreeToken = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    let accountData = { address: account[0] };
    const testCoinData = TestCoin.networks[networkId];
    if (testCoinData) {
        const testCoin = new web3.eth.Contract(TestCoin.abi, testCoinData.address)
        accountData = { ...accountData, testCoin };
        await testCoin.methods.issueFreeTokens(web3.utils.toWei('100', 'ether')).send({ from: accountData.address }).on('transactionHash', (hash) => {
            console.log("🚀 ~ file: web3.js ~ line 70 ~ awaittestCoin.methods.transfer ~ hash", hash);
        });

    } else {
        window.alert("ERROR!, Testcoin is not deployed");
    }
}

export const transferTokens = async (to, amount) => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const testCoinData = TestCoin.networks[networkId];
    if (testCoinData) {
        const testCoin = new web3.eth.Contract(TestCoin.abi, testCoinData.address)
        let testCoinBalance = await testCoin.methods.balanceOf(account[0]).call();
        console.log("🚀 ~ file: web3.js ~ line 96 ~ transferTokens ~ testCoinBalance", testCoinBalance);
        if (testCoinBalance >= amount) {
            await testCoin.methods.transfer(to, amount).send({ from: account[0] }).on('transactionHash', (hash) => {
            })

        } else {
            alert("ERROR!, Insufficent Tokens");
        }
    }
}

export const getAllEnvents = async () => {
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const testCoinData = TestCoin.networks[networkId];
    if(testCoinData) {
        const testCoin = new web3.eth.Contract(TestCoin.abi, testCoinData.address)
       const events = await testCoin.events.allEvents()
    //    const events = await testCoin.events.allEvents({fromBlock: creationBlock, toBlock: 'latest'})
        console.log("🚀 ~ file: web3.js ~ line 115 ~ getAllEnvents ~ events", events);
        return events;
        
    }
}