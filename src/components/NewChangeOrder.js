import axios from 'axios';
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

const NewChangeOrder = (props) => {
  console.log(props);

  const { id } = useParams();

  const currentProject = props.projects.rows.find(
    (project) => project.id === +id
  );

  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const [dateSubmitted, setDateSubmitted] = useState(null);

  const [dateApproved, setDateApproved] = useState(null);

  const [co, setCO] = useState({
    projectID: null,
    coName: '',
    coDescription: '',
    coStatus: '',
    dateSubmitted: null,
    dateApproved: null,
    coRevenue: null,
    coLaborExpense: null,
    coMaterialExpense: null,
    coSubcontractorExpense: null,
    coMiscellaneousExpense: null,
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
    setCO((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = `${new Date(dateSubmitted).getFullYear()}-${
      new Date(dateSubmitted).getMonth() + 1
    }-${new Date(dateSubmitted).getDate()}`;
    axios.post(
      'https://pm-cinch-backend.vercel.app/changeOrder',
      {
        projectID: currentProject.id,
        coName: co.coName,
        coDescription: co.coDescription,
        coStatus: co.coStatus,
        dateSubmitted: dateSubmitted,
        dateApproved: dateApproved,
        coRevenue: co.coRevenue,
        coLaborExpense: co.coLaborExpense,
        coMaterialExpense: co.coMaterialExpense,
        coSubcontractorExpense: co.coSubcontractorExpense,
        coMiscellaneousExpense: co.coMiscellaneousExpense,
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
        <DialogTitle>Enter an Change Order</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ margin: '1em' }}>
            Add change order values to your project by filling in all of the
            fields below and click submit.
          </DialogContentText>
          <Box
            sx={{
              display: 'flex',
              marginTop: '1em',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                marginTop: '1em',
                gap: '1em',
                width: '80%',
              }}
            >
              <label className='expense-date-label'>Date Submitted:</label>
              <DatePicker
                selected={dateSubmitted}
                onSelect={(date) => setDateSubmitted(date)}
              />
            </Box>

            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coName}
                name='coName'
                label='Change Order Name: '
                margin='dense'
                id='co-type'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coStatus}
                name='coStatus'
                label='Status: '
                margin='dense'
                id='co-status'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coRevenue}
                name='coRevenue'
                label='Revenue $: '
                margin='dense'
                id='co-revenue'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            {/* <FormControl sx={{ width: '80%', m: 1 }} variant='standard'>
              <InputLabel htmlFor='standard-adornment-amount'>
                Revenue
              </InputLabel>
              <Input
                value={co.coRevenue}
                name='coRevenue'
                label='Revenue $: '
                margin='dense'
                id='co-revenue'
                type='float'
                variant='standard'
                onChange={handleTextChange}
                startAdornment={
                  <InputAdornment position='start'>$</InputAdornment>
                }
              />
            </FormControl> */}
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coLaborExpense}
                name='coLaborExpense'
                label='Labor Expense $: '
                margin='dense'
                id='co-labor-expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coMaterialExpense}
                name='coMaterialExpense'
                label='Material Expense $: '
                margin='dense'
                id='co-material-expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coSubcontractorExpense}
                name='coSubcontractorExpense'
                label='Subcontractor Expense $: '
                margin='dense'
                id='co-subcontractor-expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coMiscellaneousExpense}
                name='coMiscellaneousExpense'
                label='Miscellaneous Expense $: '
                margin='dense'
                id='co-miscellaneous-expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box sx={{ width: '80%' }}>
              <TextField
                value={co.coDescription}
                name='coDescription'
                id='co-description'
                label='Change Order Details:'
                multiline
                rows={4}
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                marginTop: '1em',
                gap: '1em',
                width: '80%',
              }}
            >
              <label className='expense-date-label'>Date Approved:</label>
              <DatePicker
                selected={dateApproved}
                onSelect={(date) => setDateApproved(date)}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link to={`/projects/${currentProject.id}`}>
            <Button onClick={handleSubmit}>Submit</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewChangeOrder;
