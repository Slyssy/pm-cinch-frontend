import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MyMap from '../containers/Map';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import axios from 'axios';

const theme = createTheme();

const ProjectDetails = (props) => {
  // console.log(props);

  const navigate = useNavigate();

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const { id } = useParams();
  // console.log(id);

  const project = props.projects.rows.find((project) => project.id === +id);

  props.getCurrentProject(project);
  const address = `${props.currentProject.street_1}, ${props.currentProject.city}, ${props.currentProject.state} ${props.currentProject.zip}`;
  // console.log(address);
  const token = props.token[0];

  const handleDelete = () => {
    axios
      .delete(`https://pm-cinch-backend.vercel.app/projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate('/');
      });
  };
  useEffect(() => {
    // console.log(address);
    props.getChangeOrders(token, project.id);
    props.getProjects(token);
    props.getCurrentProject(project);
    props.getCoordinates(address);
    props.getExpenses(token, project.id);
    // eslint-disable-next-line
  }, [address]);

  //% Getting Expense Values .........................................
  const expenseTotal = (expenses) => {
    const totalExpense = expenses
      .map((project) => +project.expense_amount)
      .reduce((acc, cur) => acc + cur, 0);
    // console.log(totalExpense);
    return totalExpense;
  };

  //? Getting all expenses where expense type is Labor
  const laborExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type === 'Labor'
  );
  // console.log(laborExpenses);
  //? Getting all expenses where expense type is Material
  const materialExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type === 'Material'
  );
  // console.log(materialExpenses);
  //? Getting all expenses where expense type is Subcontractor
  const subcontractorExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type === 'Subcontractor'
  );
  // console.log(subcontractorExpenses);
  //? Getting all expenses where expense type is Miscellaneous
  const miscellaneousExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type === 'Miscellaneous'
  );
  // console.log(miscellaneousExpenses);
  //% Getting Change Order Values..........................................
  const sumArrayOfObjects = (array, item) => {
    const totalValue = array
      .map((object) => +object[item])
      .reduce((acc, cur) => acc + cur, 0);
    // console.log(totalExpense);
    return totalValue;
  };

  // console.log(
  //   +props.currentProject.original_revenue +
  //     sumArrayOfObjects(props.changeOrders, 'co_revenue')
  // );

  const actStartDate = `${
    new Date(project.actual_start_date).getMonth() + 1
  }/${new Date(project.actual_start_date).getDate()}/${new Date(
    project.actual_start_date
  ).getFullYear()}`;

  const actCompDate = `${
    new Date(project.actual_complete_date).getMonth() + 1
  }/${new Date(project.actual_complete_date).getDate()}/${new Date(
    project.actual_complete_date
  ).getFullYear()}`;

  return (
    <Box className='project-details__main'>
      <Box className='project-details__address-map-dates-links'>
        <Box className='project-details__address-box'>
          <Box className='project-details__title'>
            {props.currentProject.project_name}
          </Box>
          <Box className='project-details__text'>
            {props.currentProject.street_1}
          </Box>
          <Box className='project-details__text'>
            {props.currentProject.street_2}
          </Box>
          <Box className='project-details__text'>
            {`${props.currentProject.city}, ${props.currentProject.state} ${props.currentProject.zip}`}
          </Box>
        </Box>
        <Box className='project-details__date-chips'>
          <Chip
            label={`ESD: ${
              new Date(project.estimated_start_date).getMonth() + 1
            }/${new Date(project.estimated_start_date).getDate()}/${new Date(
              project.estimated_start_date
            ).getFullYear()}`}
            style={{ color: '#32323d', border: '1px solid #32323d' }}
            variant='outlined'
          ></Chip>
          <Chip
            className='project-details_chip'
            label={
              new Date(actStartDate) < new Date()
                ? 'ASD:  Date Not Entered'
                : `ASD: ${
                    new Date(project.actual_start_date).getMonth() + 1
                  }/${new Date(project.actual_start_date).getDate()}/${new Date(
                    project.actual_start_date
                  ).getFullYear()}`
            }
            style={{ background: '#32323d', color: 'white' }}
          ></Chip>
          <Chip
            label={`ECD: ${
              new Date(project.estimated_complete_date).getMonth() + 1
            }/${new Date(project.estimated_complete_date).getDate()}/${new Date(
              project.estimated_complete_date
            ).getFullYear()}`}
            style={{ color: '#32323d', border: '1px solid #32323d' }}
            variant='outlined'
          ></Chip>
          <Chip
            label={
              new Date(actCompDate) < new Date()
                ? 'ACD:  Date Not Entered'
                : `ACD: ${
                    new Date(project.actual_complete_date).getMonth() + 1
                  }/${new Date(
                    project.actual_complete_date
                  ).getDate()}/${new Date(
                    project.actual_complete_date
                  ).getFullYear()}`
            }
            style={{ background: '#32323d', color: 'white' }}
          ></Chip>
        </Box>
        <Box className='project-details__add-buttons'>
          <Link to={`/projects/expense/${project.id}`}>
            <Button
              variant='outlined'
              className='add__button'
              style={{ color: '#5d1451', border: '1px solid #5d1451' }}
            >
              + New Expense
            </Button>
          </Link>
          <Button variant='outlined' disabled>
            + Time Entry
          </Button>
          <Link to={`/projects/co/${project.id}`}>
            <Button
              variant='outlined'
              style={{ color: '#5d1451', border: '1px solid #5d1451' }}
            >
              + Change Order
            </Button>
          </Link>
        </Box>
        <Box
          // sx={{ width: '50%', height: '30vh' }}
          className='project-details__map'
        >
          <MyMap
            lat={props.coordinates.lat}
            lng={props.coordinates.lng}
          ></MyMap>
        </Box>
      </Box>
      <Divider variant='middle' />
      <Box className='project-details__title'>Financials</Box>
      <Container className='table__container'>
        <Table className='project-details__table'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell numeric>Budgeted</TableCell>
              <TableCell numeric>Adjusted</TableCell>
              <TableCell numeric>Actual</TableCell>
              <TableCell numeric>Variance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell numeric>
                {`${USDollar.format(props.currentProject.original_revenue)}`}
              </TableCell>
              <TableCell numeric>
                {`${USDollar.format(
                  +props.currentProject.original_revenue +
                    sumArrayOfObjects(props.changeOrders, 'co_revenue')
                )}`}
              </TableCell>
              <TableCell numeric>
                {sumArrayOfObjects(props.changeOrders, 'co_revenue') !== 0
                  ? `${USDollar.format(
                      +props.currentProject.original_revenue +
                        sumArrayOfObjects(props.changeOrders, 'co_revenue')
                    )}`
                  : `${USDollar.format(props.currentProject.original_revenue)}`}
              </TableCell>
              <TableCell numeric>
                {sumArrayOfObjects(props.changeOrders, 'co_revenue') === 0
                  ? `${USDollar.format(
                      props.currentProject.original_revenue -
                        props.currentProject.original_revenue
                    )}`
                  : `${USDollar.format(
                      +props.currentProject.original_revenue +
                        sumArrayOfObjects(props.changeOrders, 'co_revenue') -
                        props.currentProject.original_revenue
                    )}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Labor Expense:</TableCell>
              <TableCell numeric>{`${USDollar.format(
                props.currentProject.budgeted_labor_expense
              )}`}</TableCell>
              <TableCell numeric>{`${USDollar.format(
                +props.currentProject.budgeted_labor_expense +
                  sumArrayOfObjects(props.changeOrders, 'co_labor_expense')
              )}`}</TableCell>
              <TableCell numeric>{`${USDollar.format(
                expenseTotal(laborExpenses)
              )}`}</TableCell>
              <TableCell numeric>
                {sumArrayOfObjects(props.changeOrders, 'co_labor_expense') === 0
                  ? `${USDollar.format(
                      props.currentProject.budgeted_labor_expense -
                        expenseTotal(laborExpenses)
                    )}`
                  : `${USDollar.format(
                      +props.currentProject.budgeted_labor_expense +
                        sumArrayOfObjects(
                          props.changeOrders,
                          'co_labor_expense'
                        ) -
                        expenseTotal(laborExpenses)
                    )}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Material Expense:</TableCell>
              <TableCell numeric>{`${USDollar.format(
                props.currentProject.budgeted_material_expense
              )}`}</TableCell>
              <TableCell numeric>{`${USDollar.format(
                +props.currentProject.budgeted_material_expense +
                  sumArrayOfObjects(props.changeOrders, 'co_material_expense')
              )}`}</TableCell>
              <TableCell numeric>{`${USDollar.format(
                expenseTotal(materialExpenses)
              )}`}</TableCell>
              <TableCell>
                {sumArrayOfObjects(
                  props.changeOrders,
                  'co_material_expense'
                ) === 0
                  ? `${USDollar.format(
                      props.currentProject.budgeted_material_expense -
                        expenseTotal(materialExpenses)
                    )}`
                  : `${USDollar.format(
                      +props.currentProject.budgeted_material_expense +
                        sumArrayOfObjects(
                          props.changeOrders,
                          'co_material_expense'
                        ) -
                        expenseTotal(materialExpenses)
                    )}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subcontractor Expense:</TableCell>
              <TableCell numeric>{`${USDollar.format(
                props.currentProject.budgeted_subcontractor_expense
              )}`}</TableCell>
              <TableCell numeric>{`${USDollar.format(
                +props.currentProject.budgeted_subcontractor_expense +
                  sumArrayOfObjects(
                    props.changeOrders,
                    'co_subcontractor_expense'
                  )
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                expenseTotal(subcontractorExpenses)
              )}`}</TableCell>
              <TableCell numeric>
                {sumArrayOfObjects(
                  props.changeOrders,
                  'co_subcontractor_expense'
                ) === 0
                  ? `${USDollar.format(
                      props.currentProject.budgeted_subcontractor_expense -
                        expenseTotal(subcontractorExpenses)
                    )}`
                  : `${USDollar.format(
                      +props.currentProject.budgeted_subcontractor_expense +
                        sumArrayOfObjects(
                          props.changeOrders,
                          'co_subcontractor_expense'
                        ) -
                        expenseTotal(subcontractorExpenses)
                    )}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Miscellaneous Expense:</TableCell>
              <TableCell numeric>{`${USDollar.format(
                props.currentProject.budgeted_miscellaneous_expense
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                +props.currentProject.budgeted_miscellaneous_expense +
                  sumArrayOfObjects(
                    props.changeOrders,
                    'co_miscellaneous_expense'
                  )
              )}`}</TableCell>
              <TableCell numeric>{`${USDollar.format(
                expenseTotal(miscellaneousExpenses)
              )}`}</TableCell>
              <TableCell numeric>
                {sumArrayOfObjects(
                  props.changeOrders,
                  'co_miscellaneous_expense'
                ) === 0
                  ? `${USDollar.format(
                      props.currentProject.budgeted_miscellaneous_expense -
                        expenseTotal(miscellaneousExpenses)
                    )}`
                  : `${USDollar.format(
                      +props.currentProject.budgeted_miscellaneous_expense +
                        sumArrayOfObjects(
                          props.changeOrders,
                          'co_miscellaneous_expense'
                        ) -
                        expenseTotal(miscellaneousExpenses)
                    )}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Container>
      <Box className='project-details__bottom-buttons'>
        <Link to={`/projects/expenseLog/${project.id}`}>
          <ThemeProvider theme={theme}>
            <Button variant='contained' style={{ background: '#5d1451' }}>
              Expense Log
            </Button>
          </ThemeProvider>
        </Link>
        <Link to={`/projects/changeOrderLog/${project.id}`}>
          <ThemeProvider theme={theme}>
            <Button variant='contained' style={{ background: '#5d1451' }}>
              Change Order Log
            </Button>
          </ThemeProvider>
        </Link>
      </Box>
      <Box className='project-details__update-button'>
        <Link to={`/projects/update/${project.id}`}>
          <ThemeProvider theme={theme}>
            <Button variant='contained' style={{ background: '#5d1451' }}>
              Update Project
            </Button>
          </ThemeProvider>
        </Link>
      </Box>
      <Box className='project-details__delete-button'>
        <Link to={`/`}>
          <ThemeProvider theme={theme}>
            <Button
              variant='contained'
              style={{ background: '#32323d' }}
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </ThemeProvider>
        </Link>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
