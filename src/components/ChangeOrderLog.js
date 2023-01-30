import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import {
  Box,
  Container,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@mui/material';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const ChangeOrderLog = (props) => {
  console.log(props);

  const navigate = useNavigate();

  const { id } = useParams();

  const currentProject = props.projects.rows.find(
    (project) => project.id === +id
  );
  console.log(currentProject);

  const token = props.token[0];

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
    <Box>
      <Box
        sx={{
          display: 'flex',
          margin: '1em 1em',
          flexDirection: 'column',
        }}
      >
        {`${currentProject.project_name} Change Orders`}
      </Box>
      <Container>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>CO #</StyledTableCell>
              <StyledTableCell>CO Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Revenue</StyledTableCell>
              <StyledTableCell>Lab. Exp.</StyledTableCell>
              <StyledTableCell>Mat. Exp.</StyledTableCell>
              <StyledTableCell>Sub. Exp.</StyledTableCell>
              <StyledTableCell>Misc. Exp.</StyledTableCell>
              <StyledTableCell>Submitted</StyledTableCell>
              <StyledTableCell>Approved</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.changeOrders.map((co, index) => {
              return (
                <TableRow key={`${index}__labor-row`}>
                  <TableCell>{co.id}</TableCell>
                  <TableCell>{co.co_name}</TableCell>
                  <TableCell>{co.co_status}</TableCell>
                  <TableCell>{USDollar.format(co.co_revenue)}</TableCell>
                  <TableCell>{USDollar.format(co.co_labor_expense)}</TableCell>
                  <TableCell>
                    {USDollar.format(co.co_material_expense)}
                  </TableCell>
                  <TableCell>
                    {USDollar.format(co.co_subcontractor_expense)}
                  </TableCell>
                  <TableCell>
                    {USDollar.format(co.co_miscellaneous_expense)}
                  </TableCell>
                  <TableCell>{`${
                    new Date(co.date_submitted).getMonth() + 1
                  }/${new Date(co.date_submitted).getDate()}/${new Date(
                    co.date_submitted
                  ).getFullYear()}`}</TableCell>
                  <TableCell>{`${
                    new Date(co.date_approved).getMonth() + 1
                  }/${new Date(co.date_approved).getDate()}/${new Date(
                    co.date_approved
                  ).getFullYear()}`}</TableCell>
                  <TableCell>{co.co_description}</TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={() => {
                        axios
                          .delete(
                            `https://pm-cinch-backend.vercel.app/changeOrder/${co.id}`,
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
              <StyledTableCell>Change Order Totals</StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>
                {USDollar.format(
                  props.changeOrders
                    .map((co) => +co.co_revenue)
                    .reduce((acc, cur) => acc + cur, 0)
                )}
              </StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
      </Container>
    </Box>
  );
};

export default ChangeOrderLog;