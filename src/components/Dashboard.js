import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//# MUI Card Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export default function Dashboard(props) {
  console.log(props);
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
    <main className='dashboard__main'>
      {projects.map((project) => {
        return (
          <Box sx={{ width: '300px' }}>
            <Card variant='outlined' sx={{ m: 1.5 }}>
              <React.Fragment>
                <CardContent>
                  <Typography
                    variant='h6'
                    component='div'
                    sx={{ mb: 0.5, color: '#2B2D42' }}
                  >
                    {project.project_name}
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{ mb: 0.5, color: '#da5552' }}
                  >
                    {`Revenue: ${USDollar.format(project.original_revenue)}`}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5 }}
                    color='text.secondary'
                  >
                    {`Labor Expense: ${USDollar.format(
                      project.budgeted_labor_expense
                    )}`}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5 }}
                    color='text.secondary'
                  >
                    {`Material Expense: ${USDollar.format(
                      project.budgeted_material_expense
                    )}`}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5 }}
                    color='text.secondary'
                  >
                    {`Subcontractor Expense: ${USDollar.format(
                      project.budgeted_subcontractor_expense
                    )}`}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ mb: 0.5 }}
                    color='text.secondary'
                  >
                    {`Miscellaneous Expense: ${USDollar.format(
                      project.budgeted_miscellaneous_expense
                    )}`}
                  </Typography>
                  <Typography variant='body1' sx={{ mb: 0.5 }} color='primary'>
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
                        new Date(project.estimated_complete_date).getMonth() + 1
                      }/${new Date(
                        project.estimated_complete_date
                      ).getDate()}/${new Date(
                        project.estimated_complete_date
                      ).getFullYear()}`}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/projects/${project.id}`}
                    onClick={handleClick(project, 'id')}
                  >
                    <Button size='small'>Project Details</Button>
                  </Link>
                </CardActions>
              </React.Fragment>
            </Card>
          </Box>
        );
      })}
    </main>
  );
}
