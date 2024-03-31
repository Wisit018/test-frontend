import * as React from "react";
import { useState, useEffect } from "react";
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
import { Link, ButtonGroup, Switch } from "@mui/material";

import { FaRegEdit, FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function News() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3"
        );
        const result = await response.json();
        setData(result.data); // Assuming data is in result.data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1); // Remove item at index
    setData(newData);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6">รายการข่าวประชาสัมพันธ์</Typography>
            <Link href="create">
              <Button variant="contained" color="primary">เพิ่มข่าว</Button>
            </Link>
          </Box>
          <TableContainer component={Paper} sx={{ backgroundColor: "#fff" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">ลำดับ</TableCell>
                  <TableCell align="left">ชื่อเรื่อง</TableCell>
                  <TableCell align="left">วันที่สร้าง</TableCell>
                  <TableCell align="center">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={item.NewsId}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Switch
                        color="success"
                        variant="solid"
                        checked={item.Status === 1}
                        onChange={(e) => {
                          const newData = [...data];
                          newData[index].Status = e.target.checked ? 1 : 0;
                          setData(newData);
                        }}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item.NewsId}
                    </TableCell>
                    <TableCell align="left">{item.NameNews}</TableCell>
                    <TableCell align="left">{item.UpdatedDate}</TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="contained"
                        aria-label="plain button group"
                        size="large"
                      >
                        {item.ButtonView === 1 && (
                          <Button
                            onClick={() =>
                              (window.location.href = `/view/${item.NewsId}`)
                            }
                          >
                            <FaEye />
                          </Button>
                        )}
                        {item.ButtonEdit === 1 && (
                          <Button
                            onClick={() =>
                              (window.location.href = `/update/${item.NewsId}`)
                            }
                          >
                            <FaRegEdit />
                          </Button>
                        )}
                        {item.ButtonDelete === 1 && (
                          <Button
                            onClick={() => handleDelete(index)}
                          >
                            <MdDeleteForever />
                          </Button>
                        )}
                      </ButtonGroup>
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
