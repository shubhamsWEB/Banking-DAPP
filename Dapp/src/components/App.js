import React, { useEffect } from 'react'
import Navbar from './Navbar';
import { loadWeb3, loadBlockChainData } from '../utils/web3';
import AccountSummery from './AccountSummery';
import Form from './Form';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { stakeTokens, unStakeTokens } from '../utils/web3';

const App = () => {
    const [userAccount, setUserAccount] = React.useState({ account: '0x0', testCoin: {}, rwd: {}, decentralBank: {}, testCoinBal: '0', rwdBal: '0', stakingBal: '0', loading: true });

    useEffect(() => {
        const loadWeb3ToWindow = async () => {
            await loadWeb3()
        }
        const loadBlockChainDataToWindow = async () => {
            const data = await loadBlockChainData();
            setUserAccount({ ...data });
        }
        loadWeb3ToWindow();
        loadBlockChainDataToWindow();
    }, []);
    const handleOnStaking = async(amount) => {
        setUserAccount({ ...userAccount, loading: true });
        let d = await stakeTokens(amount, userAccount.decentralBank, userAccount.address, userAccount.testCoin);
        setUserAccount({ ...userAccount, loading: false });
        console.log("🚀 ~ file: App.js ~ line 27 ~ handleOnStaking ~ d", d);

    }
    const handleOnUnStaking = async() => {
        await unStakeTokens(userAccount.decentralBank, userAccount.address)
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
            <Form data={userAccount} handleOnStaking={handleOnStaking} handleOnUnStaking={handleOnUnStaking} />
        </>
    )
}

export default App