import {
  Avatar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import { useGetEventQuery } from "@/state/services";
import Link from "next/link";
import Loader from "@/components/Loader";

const Explore = () => {
  const { data, isLoading, isError } = useGetEventQuery({});
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0A0A11" }}>
      <Toolbar />
      <Container maxWidth="xl">
        {isLoading && <Loader />}
        <Grid container spacing={2} mt="3%">
          {!isLoading &&
            data?.events?.map((event: any) => (
              <Grid item xs={12} sm={4} md={3} key={event._id}>
                <Link href={`/event/${event._id}`}>
                  <Card sx={{ backgroundColor: "#232628" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      title={<Typography color="#fff">{event.name}</Typography>}
                      subheader={
                        <Typography color="#fff">{event.date}</Typography>
                      }
                    />
                    <CardMedia
                      component="img"
                      height={200}
                      image={event.bannerImageUri}
                    />
                    <CardContent>
                      <Typography variant="body2" color="#fff">
                        {event.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Explore;
