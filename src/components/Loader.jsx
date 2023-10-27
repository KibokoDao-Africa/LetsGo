import React from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";

const Loader = () => {
  return (
    <Box>
      <Grid container spacing={2} mt="3%">
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              sx={{ background: "gray" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem", width: "95%", background: "gray" }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ background: "gray" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", background: "gray" }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              sx={{ background: "gray" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem", width: "95%", background: "gray" }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ background: "gray" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", background: "gray" }}
          />
        </Grid>{" "}
        <Grid item xs={12} sm={4} md={3}>
          <Box sx={{ display: "flex", width: "100%" }}>
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              sx={{ background: "gray" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem", width: "95%", background: "gray" }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ background: "gray" }}
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", background: "gray" }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Loader;
