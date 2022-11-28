import React from 'react'
import { Paper, Grid, Button, InputAdornment, FilledInput, InputLabel, FormControl, TextField } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
const Form = ({ data,handleOnStaking,handleOnUnStaking }) => {
    const [values, setValues] = React.useState(0);
    const handleChange = (event) => {
        setValues(event.target.value);
    };

    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, padding: 3, textAlign: 'center' }}>
                <Grid container justifyContent='center'>
                    <Grid item>
                        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                            <TextField
                                id="outlined-number"
                                label="Staking Tokens"
                                type="number"
                                onChange={handleChange}
                                value={values}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button variant="contained" endIcon={<SavingsIcon />} onClick={async() => await handleOnStaking(values)} disabled={values<=0}>
                            Deposit Tokens
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <Button variant="contained" endIcon={<SavingsIcon />} color='secondary' disabled={data.stakingBalance === '0'} onClick={async() => await handleOnUnStaking()}>
                            Unstake Tokens
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default Form