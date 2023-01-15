import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
// # MUI Table Imports......................................
import Typography from '@mui/material/Typography';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const totalExpense = (array) => {
    return array.reduce((acc, cur) => acc + cur, 0);
  };
  useEffect(() => {
    axios
      .get('https://pm-cinch-backend.vercel.app/projects')
      .then((response) => {
        console.log(response.data);
        setProjects(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                <TableCell>{project.project_name}</TableCell>
                <TableCell>{project.project_status}</TableCell>
                <TableCell>
                  {!project.original_revenue ? 'TBD' : project.original_revenue}
                </TableCell>
                <TableCell>
                  {!project.adjusted_revenue ? 'TBD' : project.adjusted_revenue}
                </TableCell>
                <TableCell>
                  {totalExpense([
                    project.budgeted_labor_expense,
                    project.budgeted_material_expense,
                    project.budgeted_miscellaneous_expense,
                    project.budgeted_subcontractor_expense,
                  ])}
                </TableCell>
                <TableCell>
                  {totalExpense([
                    project.actual_labor_expense,
                    project.actual_material_expense,
                    project.actual_miscellaneous_expense,
                    project.actual_subcontractor_expense,
                  ])}
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
                    : ((project.original_revenue -
                        totalExpense([
                          project.budgeted_labor_expense,
                          project.budgeted_material_expense,
                          project.budgeted_miscellaneous_expense,
                          project.budgeted_subcontractor_expense,
                        ])) /
                        project.original_revenue) *
                      100}
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
                <TableCell>{project.estimated_start_date}</TableCell>
                <TableCell>{project.estimated_complete_date}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Dashboard;
