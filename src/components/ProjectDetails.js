import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import MyMap from '../containers/Map';
import DatePicker from 'react-datepicker';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';

const ProjectDetails = (props) => {
  console.log(props);

  const navigate = useNavigate();

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const { id } = useParams();
  // console.log(id);
  const project = props.projects.rows.find((project) => project.id === +id);
  console.log(project);

  const address = `${project.street_1}, ${project.city}, ${project.state} ${project.zip}`;

  const [asd, setAsd] = useState(null);
  const [acd, setAcd] = useState(null);

  const handleDelete = () => {
    axios
      .delete(`https://pm-cinch-backend.vercel.app/projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${props.token[0]}`,
        },
      })
      .then(() => {
        navigate('/');
      });
  };
  useEffect(() => {
    props.getCoordinates(address);
    // console.log(props.getCoordinates(listing.address));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          margin: '1em 1em',
        }}
      >
        <Box
          sx={{
            width: '50%',
            height: '30vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: 'h5.fontSize',
              textAlign: 'center',
              marginTop: '1em',
            }}
          >
            {project.project_name}
          </Box>
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: '16px',
              textAlign: 'center',
              marginTop: '.5em',
            }}
          >
            {project.street_1}
          </Box>
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {project.street_2}
          </Box>
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {`${project.city}, ${project.state} ${project.zip}`}
          </Box>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            marginTop='2em'
          >
            <Chip
              label={`ESD: ${
                new Date(project.estimated_start_date).getMonth() + 1
              }/${new Date(project.estimated_start_date).getDate()}/${new Date(
                project.estimated_start_date
              ).getFullYear()}`}
              color='success'
              variant='outlined'
            ></Chip>
            <Chip
              label={
                `ASD: ${
                  new Date(project.actual_start_date).getMonth() + 1
                }/${new Date(project.actual_start_date).getDate()}/${new Date(
                  project.actual_start_date
                ).getFullYear()}` === `ASD: 12/31/1969`
                  ? 'ASD: TBD'
                  : `ASD: ${
                      new Date(project.actual_start_date).getMonth() + 1
                    }/${new Date(
                      project.actual_start_date
                    ).getDate()}/${new Date(
                      project.actual_start_date
                    ).getFullYear()}`
              }
              color='success'
            ></Chip>
            <Chip
              label={`ECD: ${
                new Date(project.estimated_complete_date).getMonth() + 1
              }/${new Date(
                project.estimated_complete_date
              ).getDate()}/${new Date(
                project.estimated_complete_date
              ).getFullYear()}`}
              color='success'
              variant='outlined'
            ></Chip>
            <Chip
              label={
                `ACD: ${
                  new Date(project.actual_complete_date).getMonth() + 1
                }/${new Date(
                  project.actual_complete_date
                ).getDate()}/${new Date(
                  project.actual_complete_date
                ).getFullYear()}` === `ACD: 12/31/1969`
                  ? 'ASD: TBD'
                  : `ASD: ${
                      new Date(project.actual_complete_date).getMonth() + 1
                    }/${new Date(
                      project.actual_complete_date
                    ).getDate()}/${new Date(
                      project.actual_complete_date
                    ).getFullYear()}`
              }
              color='success'
            ></Chip>
          </Stack>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            marginTop='2em'
          >
            <Button variant='outlined'>+ New Expense</Button>
            <Button variant='outlined' disabled>
              + Time Entry
            </Button>
            <Button variant='outlined'>+ Change Order</Button>
          </Stack>
        </Box>
        <Box sx={{ width: '50%', height: '30vh' }}>
          <MyMap
            lat={props.coordinates.lat}
            lng={props.coordinates.lng}
          ></MyMap>
        </Box>
      </Box>
      <Divider variant='middle' />
      <Box
        sx={{
          typography: 'subtitle2',
          fontSize: 'h5.fontSize',
          textAlign: 'center',
          marginTop: '1em',
        }}
      >
        Financials
      </Box>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Expense</TableCell>
              <TableCell>Budgeted</TableCell>
              <TableCell>Adjusted</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Variance</TableCell>
            </TableRow>
          </TableHead>
          <TableRow>
            <TableCell>Labor Expense:</TableCell>
            <TableCell>{`${USDollar.format(
              project.budgeted_labor_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.adjusted_labor_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.actual_labor_expense
            )}`}</TableCell>
            <TableCell>
              {!project.adjusted_labor_expense
                ? `${USDollar.format(
                    project.budgeted_labor_expense -
                      project.actual_labor_expense
                  )}`
                : `${USDollar.format(
                    project.adjusted_labor_expense -
                      project.actual_labor_expense
                  )}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Material Expense:</TableCell>
            <TableCell>{`${USDollar.format(
              project.budgeted_material_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.adjusted_material_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.actual_material_expense
            )}`}</TableCell>
            <TableCell>
              {!project.adjusted_material_expense
                ? `${USDollar.format(
                    project.budgeted_material_expense -
                      project.actual_material_expense
                  )}`
                : `${USDollar.format(
                    project.adjusted_material_expense -
                      project.actual_material_expense
                  )}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Subcontractor Expense:</TableCell>
            <TableCell>{`${USDollar.format(
              project.budgeted_subcontractor_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.adjusted_subcontractor_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.actual_subcontractor_expense
            )}`}</TableCell>
            <TableCell>
              {!project.adjusted_subcontractor_expense
                ? `${USDollar.format(
                    project.budgeted_subcontractor_expense -
                      project.actual_subcontractor_expense
                  )}`
                : `${USDollar.format(
                    project.adjusted_subcontractor_expense -
                      project.actual_subcontractor_expense
                  )}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Miscellaneous Expense:</TableCell>
            <TableCell>{`${USDollar.format(
              project.budgeted_miscellaneous_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.adjusted_miscellaneous_expense
            )}`}</TableCell>
            <TableCell>{`${USDollar.format(
              project.actual_miscellaneous_expense
            )}`}</TableCell>
            <TableCell>
              {!project.adjusted_miscellaneous_expense
                ? `${USDollar.format(
                    project.budgeted_miscellaneous_expense -
                      project.actual_miscellaneous_expense
                  )}`
                : `${USDollar.format(
                    project.adjusted_miscellaneous_expense -
                      project.actual_miscellaneous_expense
                  )}`}
            </TableCell>
          </TableRow>
        </Table>
      </Container>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={8}
        marginTop='4em'
      >
        <Button variant='contained'>Update Project</Button>

        <Button variant='contained' color='error' onClick={handleDelete}>
          Delete Project
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectDetails;
