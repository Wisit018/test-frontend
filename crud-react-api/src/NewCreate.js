import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Switch, TextField, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import Alert from "@mui/material/Alert";

export default function NewCreate() {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "NewsId": 4,
      "NameNews": NameNews,
      "Detail": Detail,
      "Status": Status,
      "UpdatedDate": UpdatedDate,
      "ButtonView": 1,
      "ButtonEdit": 1,
      "ButtonDelete": 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-UpdateStatusNews", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result["successful"] === true) {
          setSuccess(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          console.error(result["errors"]);
        }
      })
      .catch((error) => console.error(error));
  };

  const [NameNews, setNameNews] = useState("");
  const [Detail, setDetail] = useState("");
  const [UpdatedDate, setUpdatedDate] = useState("");
  const [Status, setStatus] = useState("");

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            สร้างข่าวใหม่
          </Typography>
          <form onSubmit={handleSubmit}>
            {success && <Alert severity="success">สร้างข่าวสำเร็จ! กำลังกลับไปหน้าแรก...</Alert>}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="ชื่อเรื่อง"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setNameNews(e.target.value)}
                />
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="รายละเอียด"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setDetail(e.target.value)}
                />
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="วันที่สร้าง"
                  variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setUpdatedDate(e.target.value)}
                />
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Typography component="label" enddecorator={<Switch sx={{ ml: 1 }} />}>
                สถานะ
              </Typography>
              <Switch
                color="success"
                variant="solid"
                onChange={(e) => setStatus(e.target.value)}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <Button type="submit" variant="contained">
                สร้าง
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
