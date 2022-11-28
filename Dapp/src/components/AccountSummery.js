import React from 'react'
import Paper from '@mui/material/Paper';
import { Typography, Grid, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
const Main = ({ data }) => {
    if (data.loading) {

    }
    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, padding: 3, textAlign: 'center' }}>
                <Typography variant='h5'>Account Summery</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>Available Token</Typography>
                        <Typography variant='h5' sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                        }}>{data.testCoinBalance}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='subtitle1'>Staking Tokens</Typography>
                        <Typography variant='h5' sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                        }}>{data.stakingBalance}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='subtitle1'>Reward Tokens</Typography>
                        <Typography variant='h5' sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                        }}>{data.rwdBalance}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Main