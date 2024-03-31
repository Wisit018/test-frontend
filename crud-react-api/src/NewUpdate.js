import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Switch, TextField, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function NewUpdate() {

  const { newsId } = useParams();
  console.log(newsId);

  const [NameNews, setNameNews] = useState("");
  const [Detail, setDetail] = useState("");
  const [UpdatedDate, setUpdatedDate] = useState("");
  const [Status, setStatus] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("https://ba-sit.uapi.app/uapi/drt-ElectronicsDocument/ED-GetNews?EmployeeId=3", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        // ตรวจสอบว่ามีข้อมูล newsId ที่ตรงกับที่ระบุมาหรือไม่
        const matchedNews = result.data.find(news => news.NewsId.toString() === newsId);
        if (matchedNews) {
          setNameNews(matchedNews.NameNews);
          setDetail(matchedNews.Detail);
          setUpdatedDate(matchedNews.UpdatedDate);
          // สำหรับสถานะเนื่องจากเราไม่ได้รับข้อมูลสถานะมาจาก API
          // จึงให้ใส่ค่าเริ่มต้นให้เป็นสถานะเปิด (true) เช่นเดียวกับที่เป็นค่าเริ่มต้นของ Switch
          setStatus(true);
        }
      })
      .catch((error) => console.error(error));
  }, [newsId]); // เรียกใช้ useEffect ใหม่เมื่อ newsId เปลี่ยนแปลง

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
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          console.error(result["errors"]);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Typography sx={{ p: 2 }} variant="h6" gutterBottom component="div">
            แก้ไขข่าว
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                <TextField
                  id="outlined-basic"
                  label="ชื่อเรื่อง"
                  variant="outlined"
                  fullWidth
                  required
                  value={NameNews}
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
                  value={Detail}
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
                  value={UpdatedDate}
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
                checked={Status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            </Box>
            <Box  sx={{ flexGrow: 1, alignItems: "center", justifyContent: "center", display: "flex"}}>
              <Button  Link href="/" variant="contained">
                ปิด
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
