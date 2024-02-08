import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";

export const NavBar: view = ({
  user = observe.user,
  updateIsLogoutPressed = update.isLogoutPressed,
}) => {
  const pages = ["Acasa", "General", "Orar", "Catalog", "Teme"];
  const guestPages = ["Sign Up", "Login"];
  const settings = ["Profile", "Account", "Logout"];
  const { userId } = user;
  console.log(">>>user in nav: ", user);
  // if (user.role === "director") pages.push("Cereri");
  pages.push("Cereri");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: any) => {
    console.log("page: ", page);
    switch (page) {
      case "Home":
        navigate("/");
        break;
      case "General":
        navigate("/general");
        break;
      case "Orar":
        navigate("/orar");
        break;
      case "Catalog":
        navigate("/catalog");
        break;
      case "Teme":
        navigate("/teme");
        break;
      case "Sign Up":
        navigate("/sign-up");
        break;
      case "Login":
        navigate("/login");
        break;
      case "Cereri":
        navigate("/requests");
        break;
      default:
        navigate("/");
        break;
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    switch (setting) {
      case "Profile":
        navigate("/profile");
        break;
      case "Account":
        navigate("/account");
        break;
      case "Logout":
        updateIsLogoutPressed.set(true);
        navigate("/");
        break;
      default:
        navigate("/");
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <div style={{ paddingBottom: "100px" }}>
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to bottom right, blue, #8AAAE5, blue)",
          width: "100%",
          position: "fixed",
          zIndex: 10,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                  style={{
                    paddingLeft: "2rem",
                    fontSize: "1rem",
                    fontFamily: "ibarra-regular",
                    fontWeight: "bold",
                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ mt: "45px" }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            {!userId ? (
              <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {guestPages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{ my: 2, color: "white", display: "block" }}
                    style={{
                      paddingLeft: "2rem",
                      fontSize: "1rem",
                      fontFamily: "ibarra-regular",
                      fontWeight: "bold",
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
            ) : (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    paddingRight: "1rem",
                  }}
                  style={{
                    paddingLeft: "2rem",
                    fontSize: "1rem",
                    fontFamily: "ibarra-regular",
                    fontWeight: "bold",
                    textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon fontSize="inherit" />
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    style={{ paddingLeft: "1rem" }}
                  >
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon fontSize="inherit" />
                    </Badge>
                  </IconButton>
                </Box>
                <Box sx={{ paddingLeft: "1rem" }} />
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Emy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
