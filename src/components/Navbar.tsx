import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { ConnectWallet, darkTheme, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const address = useAddress();
  const [open, setOpen] = useState(false);
  const modalColor = darkTheme({
    colors: {
      modalBg: "#131418",
      dropdownBg: "#131418",
      borderColor: "#0fe9ef",
      success: "#0fe9ef",
      primaryButtonBg: "#0fe9ef",
      secondaryButtonBg: "#0fe9ef",
    },
  });
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <AppBar>
        <Toolbar>
          <Container maxWidth="xl">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Link href="/">
                <Image
                  src="/letsgoAsset.svg"
                  alt="logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
              <Box
                display={{ xs: "none", md: "flex" }}
                alignItems="center"
                justifyContent="space-between"
              >
                <Link href="/explore">
                  <Typography mr="100px" fontWeight={700}>
                    Explore
                  </Typography>
                </Link>
                <Link href="/create">
                  <Typography mr="100px" fontWeight={700}>
                    Create
                  </Typography>
                </Link>
                <Link href="/tickets">
                  <Typography fontWeight={700}>MyTickets</Typography>
                </Link>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {address && (
                    <Link href={`/profile/${address}`}>
                      <Avatar />
                    </Link>
                  )}
                  <ConnectWallet
                    style={{ background: "#0fe9ef", color: "#000" }}
                    btnTitle={"Login"}
                    theme={modalColor}
                    modalSize={"wide"}
                    switchToActiveChain={true}
                  />
                </Box>
                <IconButton
                  onClick={handleOpen}
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  <MenuIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={handleOpen}
        anchor="top"
        variant="temporary"
        sx={{
          ".MuiDrawer-paper": {
            background: "#0A0A11",
            borderBottom: "1px solid #0FE9EF",
            color: "#fff",
          },
          display: { md: "none" },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleOpen}>
            <CloseIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
        <List>
          <ListItem>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="explore" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="create" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="MyTickets" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
