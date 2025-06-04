import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Divider,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Jeux", path: "/jeux" },
    { text: "Ma Collection", path: "/ma-collection" },
    { text: "Wishlist", path: "/wishlist" },
    { text: "Connexion", path: "/connexion" },
  ];

  const drawer = (
    <Box sx={{ width: "100%", maxWidth: 300 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            component={Link}
            to={item.path}
            key={item.text}
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor:
                location.pathname === item.path
                  ? "action.selected"
                  : "transparent",
              "&:hover": {
                backgroundColor: "action.hover",
              },
              py: 2,
              cursor: "pointer",
            }}
          >
            <ListItemText
              primary={item.text}
              sx={{
                color:
                  location.pathname === item.path
                    ? "primary.main"
                    : "text.primary",
                "& .MuiTypography-root": {
                  fontWeight:
                    location.pathname === item.path ? "bold" : "normal",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <ThemeSwitch />
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.paper",
        boxShadow: 2,
        width: "100%",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "primary.main",
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
              "&:hover": {
                color: "primary.dark",
              },
              flexShrink: 0,
            }}
          >
            GameCollect
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <>
                <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                  {menuItems.map((item) => (
                    <Button
                      key={item.text}
                      color="primary"
                      component={Link}
                      to={item.path}
                      sx={{
                        position: "relative",
                        px: { xs: 1, sm: 2 },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "100%",
                          height: "2px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: "primary.main",
                          transform:
                            location.pathname === item.path
                              ? "scaleX(1)"
                              : "scaleX(0)",
                          transition: "transform 0.3s ease-in-out",
                        },
                        "&:hover::after": {
                          transform: "scaleX(1)",
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </Box>
                <ThemeSwitch />
              </>
            )}

            {isMobile && (
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>

          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            variant="temporary"
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                width: "100%",
                maxWidth: "300px",
                boxSizing: "border-box",
                backgroundColor: "background.paper",
              },
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
