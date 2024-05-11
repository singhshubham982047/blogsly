import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

import { LineChart, DoughnutChart } from "../Components/Chart";

const DashBoard = () => {
  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      margin={"1rem 0"}>
      <Widget title={"Users"} value={32} icon={<PersonIcon />} />
      <Widget title={"Blogs"} value={5} icon={<GroupIcon />} />
      {/* <Widget title={"Messages"} value={468} icon={<MessageIcon />} /> */}
    </Stack>
  );

  return (
    <AdminLayout>
      <Container className="">
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={"2rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{ xs: "center", lg: "stretch" }}
          marginTop={"2rem"}>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem 1rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "30rem",
            }}>
            <Typography margin={"1rem 0"} variant="h5">
              Last 7 days blogs
            </Typography>
            <LineChart value={[1, 23, 45, 5, 76, 55, 68]} />
          </Paper>
          {/* <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "25rem",
            }}>
            <DoughnutChart
              value={[24, 45]}
              labels={["Single Chat", "Group Chat"]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}>
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper> */}
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "1.5rem",
      margin: "1.5rem 0",
      borderRadius: "1rem",
      width: "10rem",
    }}>
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0,0,0,0.9)`,
          width: "4rem",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        {value}
      </Typography>
      <Stack direction="row" spacing={2} alignItems={"center"}>
        {icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default DashBoard;
