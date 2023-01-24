import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Spinner from './Spinner';
// # MUI Table Imports......................................
// import Typography from '@mui/material/Typography';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const Dashboard = (props) => {
  console.log(props);
  const [projects, setProjects] = useState([]);

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const totalExpense = (array) => {
    return array.reduce((acc, cur) => +acc + +cur, 0);
  };

  useEffect(() => {
    const bearToken = props.token[0];
    axios
      .get('https://pm-cinch-backend.vercel.app/projects', {
        headers: {
          Authorization: `Bearer ${bearToken}`,
        },
      })
      .then(
        (response) => {
          console.log(response.data.rows);
          setProjects(response.data.rows);
        },
        [props.token]
      );
    props.getProjects(bearToken);
    // console.log(projects);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.token[0]]);
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Revenue</TableCell>
            <TableCell>Adj Rev</TableCell>
            <TableCell>Est Exp</TableCell>
            <TableCell>Act Exp</TableCell>
            <TableCell>Est Margin</TableCell>
            <TableCell>Act Margin</TableCell>
            <TableCell>ESD</TableCell>
            <TableCell>ECD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => {
            return (
              <TableRow key={`${project.id}__row`}>
                <Link to={`/projects/${project.id}`}>
                  <TableCell>{project.project_name}</TableCell>
                </Link>
                <TableCell>{project.project_status}</TableCell>
                <TableCell>
                  {!project.original_revenue
                    ? 'TBD'
                    : `${USDollar.format(project.original_revenue)}`}
                </TableCell>
                <TableCell>
                  {!project.adjusted_revenue
                    ? 'TBD'
                    : `${USDollar.format(project.adjusted_revenue)}`}
                </TableCell>
                <TableCell>
                  {`${USDollar.format(
                    totalExpense([
                      project.budgeted_labor_expense,
                      project.budgeted_material_expense,
                      project.budgeted_miscellaneous_expense,
                      project.budgeted_subcontractor_expense,
                    ])
                  )}`}
                </TableCell>
                <TableCell>
                  {`${USDollar.format(
                    totalExpense([
                      project.actual_labor_expense,
                      project.actual_material_expense,
                      project.actual_miscellaneous_expense,
                      project.actual_subcontractor_expense,
                    ])
                  )}`}
                </TableCell>
                <TableCell>
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
                    ? 'TBD'
                    : `${parseFloat(
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
                </TableCell>
                <TableCell>
                  {isNaN(
                    ((project.adjusted_revenue -
                      totalExpense([
                        project.actual_labor_expense,
                        project.actual_material_expense,
                        project.actual_miscellaneous_expense,
                        project.actual_subcontractor_expense,
                      ])) /
                      project.original_revenue) *
                      100
                  )
                    ? 'TBD'
                    : ((project.adjusted_revenue -
                        totalExpense([
                          project.actual_labor_expense,
                          project.actual_material_expense,
                          project.actual_miscellaneous_expense,
                          project.actual_subcontractor_expense,
                        ])) /
                        project.original_revenue) *
                      100}
                </TableCell>
                <TableCell>
                  {`${new Date(project.estimated_start_date).getMonth() + 1}
                  /${new Date(
                    project.estimated_start_date
                  ).getDate()}/${new Date(
                    project.estimated_start_date
                  ).getFullYear()}`}
                </TableCell>
                <TableCell>{`${
                  new Date(project.estimated_complete_date).getMonth() + 1
                }
                  /${new Date(
                    project.estimated_complete_date
                  ).getDate()}/${new Date(
                  project.estimated_complete_date
                ).getFullYear()}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Dashboard;
