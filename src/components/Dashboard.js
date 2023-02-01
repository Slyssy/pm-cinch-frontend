import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//# MUI Card Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { createStyles, makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

//# Button Styles...
const useStyles = makeStyles((theme) => {
  createStyles({
    buttonHover: {
      transition: 'all 250ms',
      '&:hover': {
        transition: 'scale(1.1)',
      },
    },
  });
});

const theme = createTheme();

export default function Dashboard(props) {
  console.log(props);
  const classes = useStyles();

  const [projects, setProjects] = useState([]);

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const totalExpense = (array) => {
    return array.reduce((acc, cur) => +acc + +cur, 0);
  };

  const bearToken = props.token[0];

  useEffect(() => {
    axios
      .get('https://pm-cinch-backend.vercel.app/projects', {
        headers: {
          Authorization: `Bearer ${bearToken}`,
        },
      })
      .then(
        (response) => {
          // console.log(response.data.rows);
          setProjects(response.data.rows);
        },
        [props.token]
      );
    props.getProjects(bearToken);
    // console.log(projects);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.token[0]]);

  const handleClick = (project, item) => {
    props.getExpenses(props.token[0], project[item]);
    props.getChangeOrders(props.token[0], project[item]);
  };

  return (
    <>
      <Box className='dashboard__title'>
        {`Welcome to ${props.user[0].user[0].first_name} ${props.user[0].user[0].last_name}'s `}
        <span className='text-emphasis'>Project Dashboard</span>
      </Box>
      <main className='dashboard__main'>
        {projects.map((project) => {
          return (
            <Box
              sx={{ width: '300px' }}
              key={`${project.id}-card`}
              className='card-holder'
            >
              <Card sx={{ m: 0 }}>
                <React.Fragment>
                  <CardContent>
                    <Typography
                      variant='h6'
                      component='div'
                      sx={{ mb: 0.5, color: '#2B2D42', fontWeight: '500' }}
                    >
                      {project.project_name}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ mb: 0.5, color: '#5d1451', fontWeight: '700' }}
                    >
                      {`Revenue: ${USDollar.format(project.original_revenue)}`}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ mb: 0.5, fontWeight: '700' }}
                      color='text.secondary'
                    >
                      {`Labor Expense: ${USDollar.format(
                        project.budgeted_labor_expense
                      )}`}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ mb: 0.5, fontWeight: '700' }}
                      color='text.secondary'
                    >
                      {`Material Expense: ${USDollar.format(
                        project.budgeted_material_expense
                      )}`}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ mb: 0.5, fontWeight: '700' }}
                      color='text.secondary'
                    >
                      {`Subcontractor Expense: ${USDollar.format(
                        project.budgeted_subcontractor_expense
                      )}`}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ mb: 0.5, fontWeight: '700' }}
                      color='text.secondary'
                    >
                      {`Miscellaneous Expense: ${USDollar.format(
                        project.budgeted_miscellaneous_expense
                      )}`}
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{ mb: 0.5, color: '#ffb703', fontWeight: '700' }}
                    >
                      {isNaN(
                        ((project.original_revenue -
                          totalExpense([
                            project.budgeted_labor_expense,
                            project.budgeted_material_expense,
                            project.budgeted_miscellaneous_expense,
                            project.budgeted_subcontractor_expense,
                          ])) /
                          project.original_revenue) *
                          100
                      )
                        ? `Gross Margin: TBD`
                        : `Gross Margin: ${parseFloat(
                            ((project.original_revenue -
                              totalExpense([
                                project.budgeted_labor_expense,
                                project.budgeted_material_expense,
                                project.budgeted_miscellaneous_expense,
                                project.budgeted_subcontractor_expense,
                              ])) /
                              project.original_revenue) *
                              100
                          ).toFixed(2)} %`}
                    </Typography>
                    <Stack
                      direction='row'
                      justifyContent='left'
                      alignItems='center'
                      spacing={3.5}
                      marginTop='1em'
                    >
                      <Typography
                        variant='body2'
                        sx={{ mb: 0.5 }}
                        color='text.primary'
                      >
                        {`ESD: ${
                          new Date(project.estimated_start_date).getMonth() + 1
                        }/${new Date(
                          project.estimated_start_date
                        ).getDate()}/${new Date(
                          project.estimated_start_date
                        ).getFullYear()}`}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ mb: 0.5 }}
                        color='text.primary'
                      >
                        {`ECD: ${
                          new Date(project.estimated_complete_date).getMonth() +
                          1
                        }/${new Date(
                          project.estimated_complete_date
                        ).getDate()}/${new Date(
                          project.estimated_complete_date
                        ).getFullYear()}`}
                      </Typography>
                    </Stack>
                    <Link
                      to={`/projects/${project.id}`}
                      onClick={handleClick(project, 'id')}
                    >
                      <ThemeProvider theme={theme}>
                        <Button
                          size='small'
                          className={classes.buttonHover}
                          sx={{ color: '#5d1451', fontWeight: '700' }}
                        >
                          Project Details
                        </Button>
                      </ThemeProvider>
                    </Link>
                  </CardContent>
                  {/* <CardActions></CardActions> */}
                </React.Fragment>
              </Card>
            </Box>
          );
        })}
      </main>
    </>
  );
}
