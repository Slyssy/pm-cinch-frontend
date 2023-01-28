import axios from 'axios';
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import Dropdown from '../containers/Dropdown';

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

const NewExpense = (props) => {
  console.log(props);

  const { id } = useParams();

  const currentProject = props.projects.rows.find(
    (project) => project.id === +id
  );
  // console.log(currentProject);

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const [expense, setExpense] = useState({
    projectID: '',
    expenseDate: '',
    expenseType: '',
    vendorName: '',
    expenseAmount: 0,
  });

  const checkOpen = () => {
    // console.log('CheckOpen has been called.');
    // console.log(open);
    return open === true ? navigate(`/projects/${currentProject.id}`) : null;
  };

  const handleClose = () => {
    setOpen(false);
    checkOpen();
  };

  const handleTextChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    // console.log(name, value);
    setExpense((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('projectId: ', currentProject.id);
    console.log('expenseDate: ', expense.expenseDate);
    console.log('expenseType: ', expense.expenseType);
    console.log('vendorName: ', expense.vendorName);
    console.log('expenseAmount: ', expense.expenseAmount);
    console.log(props.token[0]);
    axios.post(
      'https://pm-cinch-backend.vercel.app/expense',
      {
        projectID: currentProject.id,
        expenseDate: expense.expenseDate,
        expenseType: expense.expenseType,
        vendorName: expense.vendorName,
        expenseAmount: expense.expenseAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token[0]}`,
        },
      }
    );
    handleClose();
  };

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} sx={{ padding: '1em' }}>
        <DialogTitle>Enter an Expense</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ margin: '1em' }}>
            Enter a new expense by filling in all of the fields below and click
            submit.
          </DialogContentText>
          <Box
            sx={{
              display: 'flex',
              marginTop: '1em',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '80%' }}>
              <TextField
                value={expense.expenseDate}
                name='expenseDate'
                label='Expense Date'
                margin='dense'
                id='expense-date'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={expense.expenseType}
                name='expenseType'
                label='Expense Type'
                margin='dense'
                id='expense-type'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={expense.vendorName}
                name='vendorName'
                label='Vendor Name'
                margin='dense'
                id='vendor-name'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={expense.expenseAmount}
                name='expenseAmount'
                label='Expense Amount:'
                margin='dense'
                id='expense-amount'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link to='/newUser'>
            <Button onClick={handleSubmit}>Submit</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewExpense;
