import axios from 'axios';
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';
import Button from '@mui/material/Button';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
// import { makeStyles } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#46434d',
      main: '#32323d',
      dark: '#25252d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8d275b',
      main: '#591451',
      dark: '#450b4c',
      contrastText: '#fff',
    },
  },
});

const ExpenseLog = (props) => {
  // console.log(props);

  const navigate = useNavigate();

  const { id } = useParams();
  // console.log(id);

  const currentProject = props.projects.rows.find(
    (project) => project.id === +id
  );
  // console.log(currentProject);

  // const [open, setOpen] = useState(true);

  // const checkOpen = () => {
  //   // console.log('CheckOpen has been called.');
  //   // console.log(open);
  //   return open === true ? navigate(`/projects/${currentProject.id}`) : null;
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   checkOpen();
  // };

  const token = props.token[0];

  //% Organizing Data for tables below.
  const laborExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type.toLowerCase() === 'labor'
  );
  // console.log(laborExpenses);
  const materialExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type.toLowerCase() === 'material'
  );
  const subcontractorExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type.toLowerCase() === 'subcontractor'
  );
  const miscellaneousExpenses = props.expenses[0].filter(
    (expense) => expense.expense_type.toLowerCase() === 'miscellaneous'
  );

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box className='page-container'>
          <Box className='log-page__title'>
            {`${currentProject.project_name}`}{' '}
            <span className='text-emphasis'>Expenses</span>
          </Box>
          <Box className='log-page__subtitle'>Labor Expenses</Box>
          <Container className='table__container'>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Date</StyledTableCell>
                  <StyledTableCell>Expense Type</StyledTableCell>
                  <StyledTableCell>Vendor/Payee</StyledTableCell>
                  <StyledTableCell>Expense Amount</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {laborExpenses.map((expense, index) => {
                  return (
                    <TableRow key={`${index}__labor-row`}>
                      <TableCell>
                        {`${
                          new Date(expense.expense_date).getMonth() + 1
                        }/${new Date(
                          expense.expense_date
                        ).getDate()}/${new Date(
                          expense.expense_date
                        ).getFullYear()}`}
                      </TableCell>
                      <TableCell>{expense.expense_type}</TableCell>
                      <TableCell>{expense.vendor_name}</TableCell>
                      <TableCell>
                        {USDollar.format(expense.expense_amount)}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          className='icon text-red'
                          color='warning'
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                            },
                          }}
                          onClick={() => {
                            axios
                              .delete(
                                `https://pm-cinch-backend.vercel.app/expense/${expense.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then(() => {
                                navigate(`/projects/${currentProject.id}`);
                              });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Total</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    {USDollar.format(
                      laborExpenses
                        .map((expense) => +expense.expense_amount)
                        .reduce((acc, cur) => acc + cur, 0)
                    )}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Container>
          <Box className='log-page__subtitle'>Material Expenses</Box>
          <Container className='table__container'>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Date</StyledTableCell>
                  <StyledTableCell>Expense Type</StyledTableCell>
                  <StyledTableCell>Vendor/Payee</StyledTableCell>
                  <StyledTableCell>Expense Amount</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materialExpenses.map((expense, index) => {
                  return (
                    <TableRow key={`${index}__material-row`}>
                      <TableCell>
                        {`${
                          new Date(expense.expense_date).getMonth() + 1
                        }/${new Date(
                          expense.expense_date
                        ).getDate()}/${new Date(
                          expense.expense_date
                        ).getFullYear()}`}
                      </TableCell>
                      <TableCell>{expense.expense_type}</TableCell>
                      <TableCell>{expense.vendor_name}</TableCell>
                      <TableCell>
                        {USDollar.format(expense.expense_amount)}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          className='icon text-red'
                          color='warning'
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                            },
                          }}
                          onClick={() => {
                            console.log('Delete Me.');
                            axios
                              .delete(
                                `https://pm-cinch-backend.vercel.app/expense/${expense.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then(() => {
                                navigate(`/projects/${currentProject.id}`);
                              });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Total</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    {USDollar.format(
                      materialExpenses
                        .map((expense) => +expense.expense_amount)
                        .reduce((acc, cur) => acc + cur, 0)
                    )}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Container>
          <Box className='log-page__subtitle'>Subcontractor Expenses</Box>
          <Container className='table__container'>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Date</StyledTableCell>
                  <StyledTableCell>Expense Type</StyledTableCell>
                  <StyledTableCell>Vendor/Payee</StyledTableCell>
                  <StyledTableCell>Expense Amount</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subcontractorExpenses.map((expense, index) => {
                  return (
                    <TableRow key={`${index}__subcontractor-row`}>
                      <TableCell>
                        {`${
                          new Date(expense.expense_date).getMonth() + 1
                        }/${new Date(
                          expense.expense_date
                        ).getDate()}/${new Date(
                          expense.expense_date
                        ).getFullYear()}`}
                      </TableCell>
                      <TableCell>{expense.expense_type}</TableCell>
                      <TableCell>{expense.vendor_name}</TableCell>
                      <TableCell>
                        {USDollar.format(expense.expense_amount)}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          className='icon text-red'
                          color='warning'
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                            },
                          }}
                          onClick={() => {
                            axios
                              .delete(
                                `https://pm-cinch-backend.vercel.app/expense/${expense.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then(() => {
                                navigate(`/projects/${currentProject.id}`);
                              });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Total</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    {USDollar.format(
                      subcontractorExpenses
                        .map((expense) => +expense.expense_amount)
                        .reduce((acc, cur) => acc + cur, 0)
                    )}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Container>
          <Box className='log-page__subtitle'>Miscellaneous Expenses</Box>
          <Container className='table__container'>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Date</StyledTableCell>
                  <StyledTableCell>Expense Type</StyledTableCell>
                  <StyledTableCell>Vendor/Payee</StyledTableCell>
                  <StyledTableCell>Expense Amount</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {miscellaneousExpenses.map((expense, index) => {
                  return (
                    <TableRow key={`${index}__miscellaneous-row`}>
                      <TableCell>
                        {`${
                          new Date(expense.expense_date).getMonth() + 1
                        }/${new Date(
                          expense.expense_date
                        ).getDate()}/${new Date(
                          expense.expense_date
                        ).getFullYear()}`}
                      </TableCell>
                      <TableCell>{expense.expense_type}</TableCell>
                      <TableCell>{expense.vendor_name}</TableCell>
                      <TableCell>
                        {USDollar.format(expense.expense_amount)}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          className='icon text-red'
                          color='warning'
                          sx={{
                            '&:hover': {
                              backgroundColor: 'transparent',
                              cursor: 'pointer',
                            },
                          }}
                          onClick={() => {
                            axios
                              .delete(
                                `https://pm-cinch-backend.vercel.app/expense/${expense.id}`,
                                {
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              )
                              .then(() => {
                                navigate(`/projects/${currentProject.id}`);
                              });
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Expense Total</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    {USDollar.format(
                      miscellaneousExpenses
                        .map((expense) => +expense.expense_amount)
                        .reduce((acc, cur) => acc + cur, 0)
                    )}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
            </Table>
          </Container>
          <Box>
            <Link to={`/projects/${currentProject.id}`}>
              <Button
                variant='contained'
                sx={{ borderRadius: '5px 10px 5px 30px/30px 35px 10px 15px' }}
                style={{ background: '#5d1451' }}
              >
                Back to Project Details
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ExpenseLog;
