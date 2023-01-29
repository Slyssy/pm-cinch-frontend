import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MyMap from '../containers/Map';

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

  props.getCurrentProject(project);

  // const [asd, setAsd] = useState(null);
  // const [acd, setAcd] = useState(null);
  // const [expenses, setExpenses] = useState([]);

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
    const address = `${props.currentProject.street_1}, ${props.currentProject.city}, ${props.currentProject.state} ${props.currentProject.zip}`;

    props.getChangeOrders(token, project.id);
    props.getProjects(token);
    props.getCurrentProject(project);
    props.getCoordinates(address);
    props.getExpenses(token, project.id);
    // eslint-disable-next-line
  }, []);

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
  console.log(laborExpenses);
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
            {props.currentProject.project_name}
          </Box>
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: '16px',
              textAlign: 'center',
              marginTop: '.5em',
            }}
          >
            {props.currentProject.street_1}
          </Box>
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {props.currentProject.street_2}
          </Box>
          <Box
            sx={{
              typography: 'subtitle2',
              fontSize: '16px',
              textAlign: 'center',
            }}
          >
            {`${props.currentProject.city}, ${props.currentProject.state} ${props.currentProject.zip}`}
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
                new Date(props.currentProject.estimated_start_date).getMonth() +
                1
              }/${new Date(
                props.currentProject.estimated_start_date
              ).getDate()}/${new Date(
                props.currentProject.estimated_start_date
              ).getFullYear()}`}
              color='success'
              variant='outlined'
            ></Chip>
            <Chip
              label={
                `ASD: ${
                  new Date(props.currentProject.actual_start_date).getMonth() +
                  1
                }/${new Date(
                  props.currentProject.actual_start_date
                ).getDate()}/${new Date(
                  props.currentProject.actual_start_date
                ).getFullYear()}` === `ASD: 12/31/1969`
                  ? 'ASD: TBD'
                  : `ASD: ${
                      new Date(
                        props.currentProject.actual_start_date
                      ).getMonth() + 1
                    }/${new Date(
                      props.currentProject.actual_start_date
                    ).getDate()}/${new Date(
                      props.currentProject.actual_start_date
                    ).getFullYear()}`
              }
              color='success'
            ></Chip>
            <Chip
              label={`ECD: ${
                new Date(
                  props.currentProject.estimated_complete_date
                ).getMonth() + 1
              }/${new Date(
                props.currentProject.estimated_complete_date
              ).getDate()}/${new Date(
                props.currentProject.estimated_complete_date
              ).getFullYear()}`}
              color='success'
              variant='outlined'
            ></Chip>
            <Chip
              label={
                `ACD: ${
                  new Date(
                    props.currentProject.actual_complete_date
                  ).getMonth() + 1
                }/${new Date(
                  props.currentProject.actual_complete_date
                ).getDate()}/${new Date(
                  props.currentProject.actual_complete_date
                ).getFullYear()}` === `ACD: 12/31/1969`
                  ? 'ASD: TBD'
                  : `ASD: ${
                      new Date(
                        props.currentProject.actual_complete_date
                      ).getMonth() + 1
                    }/${new Date(
                      props.currentProject.actual_complete_date
                    ).getDate()}/${new Date(
                      props.currentProject.actual_complete_date
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
            <Link to={`/projects/expense/${project.id}`}>
              <Button variant='outlined'>+ New Expense</Button>
            </Link>
            <Button variant='outlined' disabled>
              + Time Entry
            </Button>
            <Link to={`/projects/co/${project.id}`}>
              <Button variant='outlined'>+ Change Order</Button>
            </Link>
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
              <TableCell></TableCell>
              <TableCell>Budgeted</TableCell>
              <TableCell>Adjusted</TableCell>
              <TableCell>Actual</TableCell>
              <TableCell>Variance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Revenue</TableCell>
              <TableCell>
                {`${USDollar.format(props.currentProject.original_revenue)}`}
              </TableCell>
              <TableCell>
                {`${USDollar.format(
                  +props.currentProject.original_revenue +
                    sumArrayOfObjects(props.changeOrders, 'co_revenue')
                )}`}
              </TableCell>
              <TableCell>
                {sumArrayOfObjects(props.changeOrders, 'co_revenue') !== 0
                  ? `${USDollar.format(
                      +props.currentProject.original_revenue +
                        sumArrayOfObjects(props.changeOrders, 'co_revenue')
                    )}`
                  : `${USDollar.format(props.currentProject.original_revenue)}`}
              </TableCell>
              <TableCell>
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
              <TableCell>{`${USDollar.format(
                props.currentProject.budgeted_labor_expense
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                +props.currentProject.budgeted_labor_expense +
                  sumArrayOfObjects(props.changeOrders, 'co_labor_expense')
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                expenseTotal(laborExpenses)
              )}`}</TableCell>
              <TableCell>
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
              <TableCell>{`${USDollar.format(
                props.currentProject.budgeted_material_expense
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                +props.currentProject.budgeted_material_expense +
                  sumArrayOfObjects(props.changeOrders, 'co_material_expense')
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
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
              <TableCell>{`${USDollar.format(
                props.currentProject.budgeted_subcontractor_expense
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                +props.currentProject.budgeted_subcontractor_expense +
                  sumArrayOfObjects(
                    props.changeOrders,
                    'co_subcontractor_expense'
                  )
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                expenseTotal(subcontractorExpenses)
              )}`}</TableCell>
              <TableCell>
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
              <TableCell>{`${USDollar.format(
                props.currentProject.budgeted_miscellaneous_expense
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                +props.currentProject.budgeted_miscellaneous_expense +
                  sumArrayOfObjects(
                    props.changeOrders,
                    'co_miscellaneous_expense'
                  )
              )}`}</TableCell>
              <TableCell>{`${USDollar.format(
                expenseTotal(miscellaneousExpenses)
              )}`}</TableCell>
              <TableCell>
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
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={8}
        marginTop='4em'
      >
        <Link to={`/projects/update/${project.id}`}>
          <Button variant='contained'>Update Project</Button>
        </Link>
        <Link to={`/projects/expenseLog/${project.id}`}>
          <Button variant='contained'>View Expenses</Button>
        </Link>
      </Stack>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={8}
        marginTop='4em'
      >
        <Button variant='contained' color='error' onClick={handleDelete}>
          Delete Project
        </Button>
      </Stack>
    </Box>
  );
};

export default ProjectDetails;
