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
import { useGetEventQuery } from "@/state/services";
import Skeleton from "@mui/material/Skeleton";
import Loader from "../components/Loader";

export default function Home() {
  const { data, isLoading, isError } = useGetEventQuery({});

  console.log("Data is", data);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0A0A11", color: "#fff" }}>
      <Toolbar />
      <Container maxWidth="xl" sx={{ pb: "7%" }}>
        <Grid container spacing={3} sx={{ minHeight: "50vh" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ mt: "10%" }}>
              <Typography
                sx={{
                  fontSize: { md: "60px", xs: "30px", sm: "50px" },
                  fontWeight: 700,
                  letterSpacing: "4px",
                }}
              >
                Create an Event or{" "}
                <span style={{ color: "#0fe9ef" }}>Buy Tickets </span>to Your
                Favourite Event
              </Typography>
              <Typography sx={{ letterSpacing: "5px" }}>
                Get into the new world of NFTs where your NFT is your ticket to
                your favorite events.
              </Typography>
              <Box
                sx={{
                  display: "flex",

                  mt: "7%",
                }}
              >
                <Link href="/explore">
                  <Button
                    sx={{
                      mr: { xs: "20px", sm: "40px" },
                      background: "#0fe9ef",
                      "&:hover": { background: "#0fe9ef" },
                      textTransform: "capitalize",
                      width: { sm: "200px", xs: "150px" },
                      whiteSpace: "nowrap",
                    }}
                  >
                    Explore Events
                  </Button>
                </Link>
                <Link href="/create">
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#0fe9ef",
                      textTransform: "capitalize",
                      width: { sm: "200px", xs: "150px" },
                      color: "#fff",
                      "&:hover": { borderColor: "#0fe9ef" },
                    }}
                  >
                    Create Event
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image
                alt=""
                src="/banner.jpg"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container justifyContent="center">
          <Box alignItems="center">
            <Typography
              mt="7%"
              textAlign="center"
              fontSize={{ md: "60px", xs: "30px", sm: "50px" }}
            >
              Trending Events
            </Typography>
            <Typography textAlign="center" letterSpacing="5px">
              Check out our weekly updated trending events
            </Typography>
          </Box>
        </Grid>
        {isLoading && <Loader />}
        <Grid container spacing={2} mt="3%">
          {!isLoading &&
            data?.events?.slice(-4).map((event: any) => (
              <Grid item xs={12} sm={4} md={3} key={event._id}>
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
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
