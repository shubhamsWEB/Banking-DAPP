import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { loadWeb3, loadBlockChainData,getBalance,transferTokens,getAllEnvents } from '../utils/web3';
import AccountSummery from './AccountSummery';
import Form from './Form';
import Backdrop from '@mui/material/Backdrop';
import {CircularProgress,Button,Box} from '@mui/material';
import TransferModal from './Modals/TransferTokens';

const App = () => {
    const [userAccount, setUserAccount] = React.useState({ account: '0x0', testCoin: {}, rwd: {}, decentralBank: {}, testCoinBal: '0', rwdBal: '0', stakingBal: '0', loading: true });
const [transferModal,setTransferModal] = React.useState(false);
const [tokenToStake,setTokenToStake] = React.useState(0);

    useEffect(() => {
        const loadWeb3ToWindow = async () => {
            await loadWeb3()
        }
        const loadBlockChainDataToWindow = async () => {
            const data = await loadBlockChainData();
            setUserAccount({ ...data });
        }
        const events = async () => {
            const data = await getAllEnvents();
            console.log("🚀 ~ file: App.js ~ line 25 ~ events ~ data", data);
            // setUserAccount({ ...data });
        }
        loadWeb3ToWindow();
        loadBlockChainDataToWindow();
        events();
    }, []);

    const handleOnStaking = async (amount) => {
        setUserAccount({ ...userAccount, loading: true });
        const convertedAmount = window.web3.utils.toWei(amount.toString(), 'Ether');
        userAccount.testCoin.methods.approve(userAccount.decentralBank._address, convertedAmount).send({ from: userAccount.address }).on('transactionHash', (hash) => {
            userAccount.decentralBank.methods.depositTokens(convertedAmount).send({ from: userAccount.address }).on('transactionHash', (hash) => {
                loadBlockChainData().then((res) => {
                    setUserAccount({ ...res, loading: false });
                    setTokenToStake(0);
                });
            })
        })
        setUserAccount({ loading: false });
    }

    const handleOnUnStaking = async () => {
        setUserAccount({ ...userAccount, loading: true });

        userAccount.decentralBank.methods.unstakeTokens().send({ from: userAccount.address }).on('transactionHash', (hash) => {
            loadBlockChainData().then((res) => {
                setUserAccount({ ...res, loading: false });
            });
        })
        setUserAccount({ loading: false });

    }

    const issueFreeToken = async () => {
        setUserAccount({ ...userAccount, loading: true });
            userAccount.testCoin.methods.issueFreeTokens().send({ from: userAccount.address }).on('transactionHash', (hash) => {
                getBalance().then((res) => {
                    console.log("🚀 ~ file: App.js ~ line 56 ~ getBalance ~ res", res);
                    setUserAccount((prevState) => ({...prevState, testCoinBalance:res, loading: false }));
                });
            })
            setUserAccount({ loading: false });
    }

    const transferToken = async (to,amount) => {
        const web3 = window.web3;
        setUserAccount((prevState => ({ ...prevState, loading: true })));
        await transferTokens(to,web3.utils.toWei(amount,'ether'));
        setUserAccount((prevState => ({ ...prevState, loading: false })));
        setTransferModal(false);
    }


    if (userAccount.loading) {
        return <>
            <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color='inherit' />
            </Backdrop>
        </>
    }
    return (
        <>
            <Navbar data={userAccount} />
            <AccountSummery data={userAccount} />
            <Form data={userAccount} handleOnStaking={handleOnStaking} handleOnUnStaking={handleOnUnStaking} values={tokenToStake} setValues={setTokenToStake}/>
            <Box display='flex' justifyContent='center' gap={10} my={5}>
            <Button onClick={issueFreeToken} variant="contained" color='secondary' size='large'>Get Free tokens</Button>
            <TransferModal open={transferModal} setOpen={setTransferModal} handelOnTransferToken={transferToken}/>
            </Box>
        </>
    )
}

export default App