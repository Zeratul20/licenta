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
import { alpha, styled } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import TodayIcon from "@mui/icons-material/Today";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import SchoolIcon from "@mui/icons-material/School";
import ForumIcon from "@mui/icons-material/Forum";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SchoolLogo from "../../assets/img/school-logo.png";

const getRoleName = (role: string) => {
  switch (role) {
    case "teacher":
      return "Profesor";
    case "director":
      return "Director";
    case "student":
      return "Elev";
    case "parent":
      return "Părinte";
    default:
      return "Vizitator";
  }
};

const renderNavPage = (page: string) => {
  const buttonColor = "#484848";
  const iconColor = "#3A015C";
  if (page === "Acasa") {
    return (
      <div style={{ display: "flex" }}>
        <HomeIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "General") {
    return (
      <div style={{ display: "flex" }}>
        <MessageIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Orar") {
    return (
      <div style={{ display: "flex" }}>
        <TodayIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Catalog") {
    return (
      <div style={{ display: "flex" }}>
        <SortByAlphaIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Clase") {
    return (
      <div style={{ display: "flex" }}>
        <SchoolIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Rapoarte") {
    return (
      <div style={{ display: "flex" }}>
        <AssessmentIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Cereri") {
    return (
      <div style={{ display: "flex" }}>
        <ForumIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Înregistrare") {
    return (
      <div style={{ display: "flex" }}>
        <LockOpenIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Autentificare") {
    return (
      <div style={{ display: "flex" }}>
        <LoginIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  if (page === "Deconectare") {
    return (
      <div style={{ display: "flex" }}>
        <LogoutIcon style={{ color: iconColor }} fontSize="medium" />
        <span style={{ paddingLeft: "5px", color: buttonColor }}>{page}</span>
      </div>
    );
  }
  return null;
};

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

export const NavBar: view = ({
  user = observe.user,
  updateUser = update.user,
  teachers = observe.teachers,
  parents = observe.parents,
  updateIsLogoutPressed = update.isLogoutPressed,
  updateCatalogueClass = update.catalogue.class,
}) => {
  const pages = ["Acasa"];
  const guestPages = ["Sign Up", "Login"];
  const settings = ["Account", "Logout"];
  const { userId } = user;

  console.log(">>>user in nav: ", user);
  if (user?.userId && user?.role !== "user")
    pages.push(...["General", "Orar", "Catalog"]);
  if (user.role === "director") pages.push("Clase");
  if (user.role === "student" || user.role === "parent") pages.push("Rapoarte");
  if (user?.userId) pages.push("Cereri");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const checkIsTeacherParent = () => {
    if (
      !user ||
      !user.role ||
      (user.role !== "teacher" && user.role !== "parent")
    )
      return false;
    if (user.role === "teacher") {
      const parentFound = parents.find(
        (parent: any) => parent.userId === user.userId
      );
      if (!parentFound) return false;
    } else if (user.role === "parent") {
      console.log(">>>HEREEEEEEEE");
      const teacherFound = teachers.find(
        (teacher: any) => teacher.userId === user.userId
      );
      if (!teacherFound) return false;
    }
    console.log(">>>HEREEEEEEEE2222");
    return true;
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.checked: ", event.target.checked);
    const currentPath = window.location.pathname;
    if(currentPath === "/catalog")
      updateCatalogueClass.set(null);
    if (event.target.checked) {
      updateUser.set({ ...user, role: "teacher" });
    } else {
      updateUser.set({ ...user, role: "parent" });
    }
  };

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
      case "Clase":
        navigate("/classes");
        break;
      case "Rapoarte":
        navigate("/reports");
        break;
      case "Logout":
        // navigate("/");
        updateIsLogoutPressed.set(true);
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
        // navigate("/");
        updateIsLogoutPressed.set(true);
        break;
    }
    setAnchorElUser(null);
  };

  return (
    <div style={{ paddingBottom: "100px", flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "#addefe",
          width: "100%",
          position: "fixed",
          flexGrow: 1,
          textAlign: "center",
          zIndex: 1000,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <img
              src={SchoolLogo}
              alt="school-logo"
              style={{ width: "50px", height: "50px" }}
            />
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
                    <Typography textAlign="center">
                      {renderNavPage(page)}
                    </Typography>
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
                    paddingLeft: "3rem",
                    fontSize: "1rem",
                    fontFamily: "ibarra-regular",
                    fontWeight: "bold",
                    textShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {renderNavPage(page)}
                </Button>
              ))}
            </Box>
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
                    {page === "Login"
                      ? renderNavPage("Autentificare")
                      : renderNavPage("Înregistrare")}
                  </Button>
                ))}
              </Box>
            ) : (
              <>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ paddingLeft: "1rem" }} />
                {checkIsTeacherParent() && (
                  <Box sx={{ flexGrow: 1, display: "flex" }}>
                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          fontSize: "20px",
                          paddingTop: "2px",
                          fontFamily: "inherit",
                          textShadow: "inherit",
                          color: "#02182B",
                        }}
                      >
                        <i>
                          <b>Părinte</b>
                        </i>
                      </span>
                      <PinkSwitch
                        defaultChecked
                        onChange={handleSwitchChange}
                      />
                      <span
                        style={{
                          fontSize: "20px",
                          paddingTop: "2px",
                          fontFamily: "inherit",
                          textShadow: "inherit",
                          color: "#02182B",
                        }}
                      >
                        <i>
                          <b>Profesor</b>
                        </i>
                      </span>
                    </div>
                  </Box>
                )}
                <Box sx={{ flexGrow: 0, display: "flex" }}>
                  {!checkIsTeacherParent() && (
                    <Badge
                      sx={{
                        paddingRight: "20px",
                        fontSize: "20px",
                        paddingTop: "20px",
                        fontFamily: "inherit",
                        textShadow: "inherit",
                        color: "#02182B",
                      }}
                    >
                      <i>
                        <b>{getRoleName(user.role)}</b>
                      </i>
                    </Badge>
                  )}
                  <Button
                    key={"Logout"}
                    onClick={() => handleCloseNavMenu("Logout")}
                    sx={{ my: 2, color: "white", display: "block" }}
                    style={{
                      paddingLeft: "2rem",
                      fontSize: "1rem",
                      fontFamily: "ibarra-regular",
                      fontWeight: "bold",
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {/* <div style={{ display: "flex" }}>
                      <LockOpenIcon fontSize="medium" />
                      <span style={{ paddingLeft: "5px" }}>{"Deconectare"}</span>
                    </div> */}
                    {renderNavPage("Deconectare")}
                  </Button>
                  {/* <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user.firstName}
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
                  </Menu> */}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
