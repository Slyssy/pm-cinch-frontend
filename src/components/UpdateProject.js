import axios from 'axios';
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

const UpdateProject = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);

  const currentProject = props.projects.rows.find(
    (project) => project.id === +id
  );
  console.log(currentProject);

  const [open, setOpen] = useState(true);
  const [esd, setEsd] = useState(new Date(currentProject.estimated_start_date));
  const [ecd, setEcd] = useState(
    new Date(currentProject.estimated_complete_date)
  );
  const [acd, setAcd] = useState(null);
  const [asd, setAsd] = useState(null);

  const [project, setProject] = useState({
    actual_complete_date: currentProject.actual_complete_date,
    actual_labor_expense: currentProject.actual_labor_expense,
    actual_material_expense: currentProject.actual_material_expense,
    actual_miscellaneous_expense: currentProject.actual_miscellaneous_expense,
    actual_start_date: currentProject.actual_start_date,
    actual_subcontractor_expense: currentProject.actual_subcontractor_expense,
    adjusted_labor_expense: currentProject.adjusted_labor_expense,
    adjusted_material_expense: currentProject.adjusted_material_expense,
    adjusted_miscellaneous_expense:
      currentProject.adjusted_miscellaneous_expense,
    adjusted_revenue: currentProject.adjusted_revenue,
    adjusted_subcontractor_expense:
      currentProject.adjusted_subcontractor_expense,
    budgeted_labor_expense: currentProject.budgeted_labor_expense,
    budgeted_material_expense: currentProject.budgeted_material_expense,
    budgeted_miscellaneous_expense:
      currentProject.budgeted_miscellaneous_expense,
    budgeted_subcontractor_expense:
      currentProject.budgeted_subcontractor_expense,
    city: currentProject.city,
    estimated_complete_date: currentProject.estimated_complete_date,
    estimated_start_date: currentProject.estimated_start_date,
    original_revenue: currentProject.original_revenue,
    project_margin: currentProject.project_margin,
    project_name: currentProject.project_name,
    project_status: currentProject.project_status,
    state: currentProject.state,
    street_1: currentProject.street_1,
    street_2: currentProject.street_2,
    zip: currentProject.zip,
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
    const { name, value } = e.target;
    console.log(name, value);
    setProject((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    console.log(project);
    const formattedASD = `${new Date(asd).getFullYear()}-${
      new Date(asd).getMonth() + 1
    }-${new Date(asd).getDate()}`;
    const formattedACD = `${new Date(acd).getFullYear()}-${
      new Date(acd).getMonth() + 1
    }-${new Date(acd).getDate()}`;
    const formattedESD = `${new Date(
      project.estimated_start_date
    ).getFullYear()}-${
      new Date(project.estimated_start_date).getMonth() + 1
    }-${new Date(project.estimated_start_date).getDate()}`;
    const formattedECD = `${new Date(
      project.estimated_complete_date
    ).getFullYear()}-${
      new Date(project.estimated_complete_date).getMonth() + 1
    }-${new Date(project.estimated_complete_date).getDate()}`;

    console.log(formattedESD, formattedECD);
    e.preventDefault();
    // const payload = { ...project };
    // props.addProject(payload);
    axios.put(
      `https://pm-cinch-backend.vercel.app/projects/${currentProject.id}`,
      {
        actual_complete_date: formattedACD,
        // actual_labor_expense: project.actual_labor_expense,
        // actual_material_expense: project.actual_material_expense,
        // actual_miscellaneous_expense: project.actual_miscellaneous_expense,
        actual_start_date: formattedASD,
        // actual_subcontractor_expense: project.actual_subcontractor_expense,
        // adjusted_labor_expense: project.adjusted_labor_expense,
        // adjusted_material_expense: project.adjusted_material_expense,
        // adjusted_miscellaneous_expense: project.adjusted_miscellaneous_expense,
        // adjusted_revenue: project.adjusted_revenue,
        // adjusted_subcontractor_expense: project.adjusted_subcontractor_expense,
        budgeted_labor_expense: parseFloat(project.budgeted_labor_expense),
        budgeted_material_expense: parseFloat(
          project.budgeted_material_expense
        ),
        budgeted_miscellaneous_expense: parseFloat(
          project.budgeted_miscellaneous_expense
        ),
        budgeted_subcontractor_expense: parseFloat(
          project.budgeted_subcontractor_expense
        ),
        city: project.city,
        estimated_complete_date: formattedECD,
        estimated_start_date: formattedESD,
        original_revenue: parseFloat(project.original_revenue),
        // project_margin: parseFloat(project.project_margin),
        project_name: project.project_name,
        project_status: project.project_status,
        state: project.state,
        street_1: project.street_1,
        street_2: project.street_2,
        zip: project.zip,
      },
      {
        headers: {
          Authorization: `Bearer ${props.token[0]}`,
        },
      }
    );
    handleClose();
  };

  const handleCoordinates = () => {
    const address = `${project.street_1}, ${project.city}, ${project.state} ${project.zip}`;
    props.getCoordinates(address);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the project, update as few as one field or as many as all
            fields and click submit.
          </DialogContentText>
          <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
            <Box sx={{ width: '50%' }}>
              <TextField
                value={project.project_name}
                name='project_name'
                label={project.project_name}
                margin='dense'
                id='project-name'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.street_1}
                name='street_1'
                label={project.street_1}
                margin='dense'
                id='street_1'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.street2}
                name='street_2'
                label='Street 2:'
                margin='dense'
                id='street_2'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                required
                value={project.city}
                name='city'
                label={project.city}
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
                label={project.state}
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
                label={project.zip}
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
              <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
                <label>ASD:</label>
                <DatePicker selected={asd} onSelect={(date) => setAsd(date)} />
              </Box>
            </Box>
            <Box sx={{ width: '50%' }}>
              <TextField
                value={project.project_status}
                name='project_status'
                label={project.project_status}
                margin='dense'
                id='project_status'
                type='text'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.original_revenue}
                name='original_revenue'
                label={project.original_revenue}
                margin='dense'
                id='original_revenue'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.budgeted_material_expense}
                name='budgeted_material_expense'
                label={project.budgeted_material_expense}
                margin='dense'
                id='budgeted_material_expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.budgeted_labor_expense}
                name='budgeted_labor_expense'
                label={project.budgeted_labor_expense}
                margin='dense'
                id='budgeted_labor_expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.budgeted_subcontractor_expense}
                name='budgeted_subcontractor_expense'
                label={project.budgeted_subcontractor_expense}
                margin='dense'
                id='budgeted_subcontractor_expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <TextField
                value={project.budgeted_miscellaneous_expense}
                name='budgeted_miscellaneous_expense'
                label={project.budgeted_miscellaneous_expense}
                margin='dense'
                id='budgeted_miscellaneous_expense'
                type='float'
                fullWidth
                variant='standard'
                onChange={handleTextChange}
              />
              <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
                <label>ECD:</label>
                <DatePicker selected={ecd} onSelect={(date) => setEcd(date)} />
              </Box>
              <Box sx={{ display: 'flex', marginTop: '1em', gap: '1em' }}>
                <label>ACD:</label>
                <DatePicker selected={acd} onSelect={(date) => setAcd(date)} />
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

export default UpdateProject;
