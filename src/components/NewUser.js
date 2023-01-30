import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from '../containers/Dropdown';

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

const NewUser = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  // const [isVisible, setIsVisible] = useState(false)

  const [user, setUser] = useState({
    organizationId: '',
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    payRate: '',
    password: '',
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
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    // console.log(props.selection.pop());
    // console.log(props.organizations[0]);
    const orgID = props.organizations[0].find(
      (org) => org.company_name === props.selection[0]
    ).id;
    console.log(orgID);
    e.preventDefault();

    axios.post('https://pm-cinch-backend.vercel.app/signup', {
      organizationId: orgID,
      firstName: user.first_name,
      lastName: user.last_name,
      position: user.position,
      email: user.position,
      payRate: +user.pay_rate,
      password: user.password,
    });
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user first, select a company. If you do not see your
            company, click "ADD COMPANY".
          </DialogContentText>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Dropdown />
            <Link to='/newOrganization'>
              <Button id='add-company-button'>Add Company</Button>
            </Link>
          </Box>
          {props.selection.length === 1 ? (
            <Box sx={{ width: '100%' }}>
              <DialogContentText>
                Now fill out the fields below and click "SUBMIT".
              </DialogContentText>
              <TextField
                required
                value={user.first_name}
                name='first_name'
                label='First Name:'
                margin='dense'
                id='first_name'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={user.last_name}
                name='last_name'
                label='Last Name:'
                margin='dense'
                id='last_name'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={user.position}
                name='position'
                label='Job Position'
                margin='dense'
                id='position'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={user.email}
                name='email'
                label='Email Address'
                margin='dense'
                id='email'
                type='email'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={user.pay_rate}
                name='pay_rate'
                label='Pay Rate / Hr'
                margin='dense'
                id='pay_rate'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={user.password_hash}
                name='password'
                label='Password:'
                margin='dense'
                id='password'
                type='password'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link to='/listings'>
            <Button onClick={handleSubmit}>Submit</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewUser;
