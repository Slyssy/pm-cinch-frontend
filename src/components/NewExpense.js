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

const NewExpense = (props) => {
  console.log(props);

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const [expense, setExpense] = useState({
    projectId: '',
    expenseDate: '',
    expenseType: '',
    vendorName: '',
    expenseAmount: 0,
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
    setExpense((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  return <div>NewExpense</div>;
};

export default NewExpense;
