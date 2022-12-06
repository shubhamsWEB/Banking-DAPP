import React from 'react'
import Paper from '@mui/material/Paper';
import { Typography, Grid, Tooltip } from '@mui/material';

const Main = ({ data }) => {
    if (data.loading) {

    }
    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, padding: 3, textAlign: 'center' }}>
                <Typography variant='h4' sx={{fontFamily: 'monospace',fontWeight:'bolder'}}>Account Summery</Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='subtitle1'>Available Token</Typography>
                        <Typography variant='h5' sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                        }}>{data.testCoinBalance} TSTC</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='subtitle1'>Staking Tokens</Typography>
                        <Typography variant='h5' sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                        }}>{data.stakingBalance} TSTC</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant='subtitle1'>Reward Tokens</Typography>
                        <Tooltip title={`${data.rwdBalance} RWD`}>
                            <Typography variant='h5' sx={{
                                fontFamily: 'monospace',
                                fontWeight: 700,
                            }}>{parseFloat(data.rwdBalance).toFixed(2)} RWD</Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Main