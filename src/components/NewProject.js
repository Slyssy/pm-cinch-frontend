import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyMap from '../containers/Map';
import mapIcon from '../images/mapIcon.jpg';
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

const NewProject = (props) => {
  console.log('newProject props', props);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const [esd, setEsd] = useState(new Date());
  const [ecd, setEcd] = useState(new Date());

  const [project, setProject] = useState({
    projectName: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    projectStatus: '',
    projectMargin: '',
    originalRevenue: '',
    adjustedRevenue: null,
    budgetedMaterialExpense: '',
    budgetedLaborExpense: '',
    budgetedSubcontractorExpense: '',
    budgetedMiscellaneousExpense: '',
    adjustedMaterialExpense: null,
    adjustedLaborExpense: null,
    adjustedSubcontractorExpense: null,
    adjustedMiscellaneousExpense: null,
    actualMaterialExpense: null,
    actualLaborExpense: null,
    actualSubcontractorExpense: null,
    actualMiscellaneousExpense: null,
    ESD: '',
    ECD: '',
    ASD: null,
    ACD: null,
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
    setProject((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formatDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    console.log(formattedDate);
    return formattedDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const payload = { ...project };
    // props.addProject(payload);
    axios.post(
      'https://pm-cinch-backend.vercel.app/projects',
      {
        projectName: project.projectName,
        street1: project.street1,
        street2: project.street2,
        city: project.city,
        state: project.state,
        zip: project.zip,
        projectStatus: project.projectStatus,
        projectMargin: project.projectMargin,
        originalRevenue: project.originalRevenue,
        adjustedRevenue: project.adjustedRevenue,
        budgetedMaterialExpense: project.budgetedMaterialExpense,
        budgetedLaborExpense: project.budgetedLaborExpense,
        budgetedSubcontractorExpense: project.budgetedSubcontractorExpense,
        budgetedMiscellaneousExpense: project.budgetedMiscellaneousExpense,
        adjustedMaterialExpense: project.adjustedMaterialExpense,
        adjustedLaborExpense: project.adjustedLaborExpense,
        adjustedSubcontractorExpense: project.adjustedSubcontractorExpense,
        adjustedMiscellaneousExpense: project.adjustedMiscellaneousExpense,
        actualMaterialExpense: project.actualMaterialExpense,
        actualLaborExpense: project.actualLaborExpense,
        actualSubcontractorExpense: project.actualSubcontractorExpense,
        actualMiscellaneousExpense: project.actualMiscellaneousExpense,
        ESD: formatDate(esd),
        ECD: formatDate(ecd),
        ASD: project.ASD,
        ACD: project.ACD,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token[0]}`,
        },
      }
    );
    console.log('esd: ', esd, 'ecd: ', ecd);
    handleClose();
  };

  const handleCoordinates = () => {
    const address = `${project.street_1}, ${project.city}, ${project.state} ${project.zip}`;
    props.getCoordinates(address);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new project, simply fill out the form below and click
            "Submit".
          </DialogContentText>
          <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
            <Box sx={{ width: '50%' }}>
              <TextField
                required
                value={project.projectName}
                name='projectName'
                label='Project Name:'
                margin='dense'
                id='projectName'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.street1}
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
                value={project.street2}
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
                value={project.city}
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
                value={project.state}
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
                value={project.zip}
                name='zip'
                label='Zip Code:'
                margin='dense'
                id='zip'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
                onBlur={handleCoordinates}
              />
              <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
                <label>ESD:</label>
                <DatePicker selected={esd} onSelect={(date) => setEsd(date)} />
              </Box>
            </Box>
            <Box sx={{ width: '50%' }}>
              <TextField
                required
                value={project.projectStatus}
                name='projectStatus'
                label='Project Status:'
                margin='dense'
                id='projectStatus'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.originalRevenue}
                name='originalRevenue'
                label='Budgeted Revenue:'
                margin='dense'
                id='originalRevenue'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.budgetedMaterialExpense}
                name='budgetedMaterialExpense'
                label='Budgeted Material Expense:'
                margin='dense'
                id='budgetedMaterialExpense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.budgetedLaborExpense}
                name='budgetedLaborExpense'
                label='Budgeted Labor Expense:'
                margin='dense'
                id='budgetedLaborExpense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.budgetedSubcontractorExpense}
                name='budgetedSubcontractorExpense'
                label='Budgeted Subcontractor Expense:'
                margin='dense'
                id='budgetedSubcontractorExpense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.budgetedMiscellaneousExpense}
                name='budgetedMiscellaneousExpense'
                label='Budgeted Miscellaneous Expense:'
                margin='dense'
                id='budgetedMiscellaneousExpense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
                <label>ECD:</label>
                <DatePicker selected={ecd} onSelect={(date) => setEcd(date)} />
              </Box>
            </Box>
          </Box>
          {!project.zip ? (
            <div className='image-container'>
              <img className='map-icon' src={mapIcon} alt='Map Icon' />
            </div>
          ) : (
            <div className='map-container'>
              <MyMap lat={props.coordinates.lat} lng={props.coordinates.lng} />
            </div>
          )}
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

export default NewProject;
