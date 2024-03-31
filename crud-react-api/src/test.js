import * as React from "react";
import { useState,useEffect  } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// import axios from "axios";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function News() { 

    const [data, setData] = useState([]);

    useEffect(() => {
        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };
      
        fetch("https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3", requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setData(result);
          })
          .catch((error) => console.error(error));
      }, []);
   

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          {/* <h1>ข่าวประชาสัมพันธ์</h1> */}
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                รายการข่าวประชาสัมพันธ์
              </Typography>
            </Box>
            <Box>
              <Button variant="contained">เพิ่มข่าว</Button>
            </Box>
          </Box>
            {/* ตาราง */}
          <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>สถานะ</TableCell>
        <TableCell align="right">ลำดับ</TableCell>
        <TableCell align="right">ชื่อเรื่อง</TableCell>
        <TableCell align="right">วันที่สร้าง</TableCell>
        <TableCell align="right">จัดการ</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((row, index) => (
        <TableRow
          key={row.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.status}
          </TableCell>
          <TableCell align="right">{index + 1}</TableCell>
          <TableCell align="right">{row.title}</TableCell>
          <TableCell align="right">{row.created_at}</TableCell>
          <TableCell align="right">
            <Button variant="outlined" size="small">
              ดูรายละเอียด
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

          
        </Paper>
      </Container>
    </React.Fragment>
  );
}
