import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const NewOrganization = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const [org, setOrg] = useState({
    companyName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
  });

  const checkOpen = () => {
    // console.log('CheckOpen has been called.');
    // console.log(open);
    return open === true ? navigate('/') : null;
  };

  const handleClose = () => {
    setOpen(false);
    checkOpen();
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setOrg((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://pm-cinch-backend.vercel.app/organizations', {
      companyName: org.companyName,
      street1: org.street1,
      street2: org.street2,
      city: org.city,
      state: org.state,
      zip: org.zip,
    });
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Company</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new company, simply fill out the form below and click
            "Submit".
          </DialogContentText>
          <Box sx={{ width: '100%' }}>
            <TextField
              required
              value={org.companyName}
              name='companyName'
              label='Company Name:'
              margin='dense'
              id='companyName'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleTextChange}
            />
            <TextField
              required
              value={org.street1}
              name='street1'
              label='Street 1:'
              margin='dense'
              id='street1'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleTextChange}
            />
            <TextField
              value={org.street2}
              name='street2'
              label='Street 2:'
              margin='dense'
              id='street2'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleTextChange}
            />
            <TextField
              required
              value={org.city}
              name='city'
              label='City'
              margin='dense'
              id='city'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleTextChange}
            />
            <TextField
              required
              value={org.state}
              name='state'
              label='State:'
              margin='dense'
              id='state'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleTextChange}
            />
            <TextField
              required
              value={org.zip}
              name='zip'
              label='Zip Code:'
              margin='dense'
              id='zip'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleTextChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link to='/newUser'>
            <Button onClick={handleSubmit}>Submit</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewOrganization;
