import {
  Box,
  Button,
  CardActionArea,
  Container,
  Grid,
  Toolbar,
} from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Create = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0A0A11" }}>
      <Toolbar />
      <Container maxWidth="xl">
        <Card sx={{ backgroundColor: "#232628" }}>
          <CardMedia
            component="img"
            height="400"
            image="/banner.png"
            style={{ objectFit: "cover", width: "100%" }}
          />
          <CardContent sx={{}}>
            <Typography gutterBottom variant="h5" component="div" color="#fff">
              Event Name
            </Typography>
            <Typography color="#fff">Date and time</Typography>
            <Typography variant="body2" color="#fff">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </Card>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} mt="7%">
            <Card sx={{ background: "#232628" }}>
              <CardMedia
                component="img"
                height="200"
                image="/banner.png"
                style={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent sx={{}}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="#fff"
                >
                  Ticket
                </Typography>
                <Typography color="#fff">Price</Typography>
              </CardContent>
              <CardActionArea>
                <Button
                  sx={{
                    background: "#0fe9ef",
                    "&:hover": { background: "#0fe9ef" },
                    textTransform: "capitalize",
                  }}
                >
                  Buy
                </Button>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Create;
