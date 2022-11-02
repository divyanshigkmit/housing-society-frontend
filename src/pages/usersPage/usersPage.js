import React, { useState, useEffect } from "react"
import "./usersPageStyles.css"
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

export default function UsersPage() {

    const [usersTable, setData] = useState([]);

    useEffect(() => {
        loadUserTable();
    }, [])
    const loadUserTable = async() => {
        await fetch('http://localhost:3000/api/users')
        .then(res => res.json())
        .then(recievdData => setData(recievdData.response))
        .catch(err => {
            alert('Error Occured');
        }) 
    }
    return (
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>UserId</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Contact Number</StyledTableCell>
            <StyledTableCell align="right">Email Id</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersTable.map((user) => (
            
            <StyledTableRow key={user.id}>
              {/* <StyledTableCell component="th" scope="row">
                {user.id}
              </StyledTableCell> */}
              <StyledTableCell align="right">{user.id}</StyledTableCell>
              <StyledTableCell align="right">{user.first_name}</StyledTableCell>
              <StyledTableCell align="right">{user.last_name}</StyledTableCell>
              <StyledTableCell align="right">{user.contact_number}</StyledTableCell>
              <StyledTableCell align="right">{user.email_id}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}