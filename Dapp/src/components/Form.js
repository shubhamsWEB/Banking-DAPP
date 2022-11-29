import React from 'react'
import { Paper, Grid, Button, InputAdornment, FilledInput, InputLabel, FormControl, TextField } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
const Form = ({ data,handleOnStaking,handleOnUnStaking,values, setValues }) => {
    // const [values, setValues] = React.useState(0);
    const handleChange = (event) => {
        setValues(event.target.value.replace(/^0+/, ''));
    };

    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, padding: 3, textAlign: 'center' }}>
                <Grid container justifyContent='center'>
                    <Grid item sx={{width: {sm:'100%',md:'50%'}}}>
                        <FormControl fullWidth sx={{ m: 1,fontFamily: 'monospace' }} variant="filled">
                            <TextField
                                id="outlined-number"
                                label="Staking Tokens"
                                type="number"
                                onChange={handleChange}
                                value={values}
                                placeholder="Enter tokens to Deposit"
                                inputProps={{style:{fontFamily: 'monospace',fontWeight:700}}}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button variant="contained" endIcon={<SavingsIcon />} onClick={async() => await handleOnStaking(values)} disabled={values<=0} color="success">
                            Deposit Tokens
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button variant="contained" endIcon={<SavingsIcon />} color='error' disabled={data.stakingBalance === '0'} onClick={async() => await handleOnUnStaking()}>
                            Unstake Tokens
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Form