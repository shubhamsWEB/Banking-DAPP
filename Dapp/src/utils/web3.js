import React from 'react';
import TestCoin from '../truffle_abis/TestCoin.json';
import RWDToken from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Web3 from 'web3';

export const loadWeb3 = async () => {
    if(window.ethereuem) {
        window.web3 = new Web3(window.ethereuem);
        await window.ethereuem.enable();
    } else if(window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
    } else {
        window.alert("Browser does not support WEB3.")
    }
}

export const loadBlockChainData = async () => {
    window.ethereum.request({method:'eth_requestAccounts'})
    const web3 = window.web3;
    const account = await web3.eth.getAccounts();
    let accountData = {...accountData,address:account[0]};
    const networkId = await web3.eth.net.getId();

    const testCoinData = TestCoin.networks[networkId];
    if(testCoinData) {
        const testCoin = new web3.eth.Contract(TestCoin.abi,testCoinData.address)
        accountData = {...accountData,testCoin};
        let testCoinBalance = await testCoin.methods.balanceOf(accountData.address).call();
        accountData = {...accountData,testCoinBalance:web3.utils.fromWei(testCoinBalance.toString(),'ether')}
    } else {
        window.alert("ERROR!, Testcoin is not deployed");
    }

    const rwdData = RWDToken.networks[networkId];
    if(rwdData) {
        const rwdToken = new web3.eth.Contract(RWDToken.abi,rwdData.address)
        accountData = {...accountData,rwdToken};
        let rwdTokenBalance = await rwdToken.methods.balanceOf(accountData.address).call();
        accountData = {...accountData,rwdBalance:web3.utils.fromWei(rwdTokenBalance.toString(),'ether')}
    } else {
        window.alert("ERROR!, RWDToken is not deployed");
    }

    const decentralBankData = DecentralBank.networks[networkId];
    if(decentralBankData) {
        const decentralBank = new web3.eth.Contract(DecentralBank.abi,decentralBankData.address)
        accountData = {...accountData,decentralBank};
        let stakingBalance = await decentralBank.methods.stakingBalance(accountData.address).call();
        accountData = {...accountData,stakingBalance:web3.utils.fromWei(stakingBalance.toString(),'ether')}
    } else {
        window.alert("ERROR!, Decentral bank is not deployed");
    }
    accountData = {...accountData,loading:false};
    return accountData;
}

export const stakeTokens = async(amount,decentralBank,from,testCoin) => {
    let updatedData;
    const convertedAmount = window.web3.utils.toWei(amount.toString(),'Ether');
    testCoin.methods.approve(decentralBank._address,convertedAmount).send({from:from}).on('transactionHash',(hash) => {
        decentralBank.methods.depositTokens(convertedAmount).send({from:from}).on('transactionHash',(hash) => {
            loadBlockChainData().then((res) => {
                console.log("🚀 ~ file: web3.js ~ line 66 ~ loadBlockChainData ~ res", res);
                updatedData =  res
            });
        })
    })
return updatedData;
}

export const unStakeTokens = async(decentralBank,from) => {
    let updatedData;
        decentralBank.methods.unstakeTokens().send({from:from}).on('transactionHash',(hash) => {
            loadBlockChainData().then((res) => {
                console.log("🚀 ~ file: web3.js ~ line 66 ~ loadBlockChainData ~ res", res);
                updatedData =  res
            });
        })
        return updatedData;
}
