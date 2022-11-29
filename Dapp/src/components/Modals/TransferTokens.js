import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {Typography,TextField }from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius:'5px',
};

export default function TransferTokenModal({open, setOpen,handelOnTransferToken}) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addressRef = React.useRef(null);
  const amountRef = React.useRef(null);

const handelonTransfer = () => {
    handelOnTransferToken(addressRef.current.value,amountRef.current.value);
    console.log("🚀 ~ file: TransferTokens.js ~ line 29 ~ handelonTransfer ~ amountRef.current.value", amountRef.current.value);
    console.log("🚀 ~ file: TransferTokens.js ~ line 29 ~ handelonTransfer ~ addressRef.current.value", addressRef.current.value);
}
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" size='large'>Transfer Tokens</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" align='center' sx={{fontFamily:'monospace',fontWeight:'bold'}}>
              Transfer TSTC Token
            </Typography>
            <Box>
            <TextField id="outlined-basic" label="Recipient's Address" variant="outlined" fullWidth sx={{my:2}} InputLabelProps={{style:{fontFamily:'monospace'}}} inputProps={{style:{fontFamily:'monospace'}}} inputRef={addressRef}/>
            <TextField id="outlined-basic" label="Tokens to Transfer" variant="outlined" fullWidth InputLabelProps={{style:{fontFamily:'monospace'}}} inputProps={{style:{fontFamily:'monospace'}}} inputRef={amountRef}/>
            <Button variant='contained' color='primary' fullWidth sx={{my:2}} onClick={handelonTransfer} disabled={addressRef?.current?.value ==='' && amountRef?.current?.value ===''}>Transfer</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}