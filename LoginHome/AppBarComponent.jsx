import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import logo from "../assets/images/NU-logo.png";
import "./Home.css";
import { googleLogout } from "@react-oauth/google";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

function AppBarComponent() {
  const pages = ["Home"];
  const settings = ["My Profile", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user_token"]);
  const navigate = useNavigate();

  var userDetail = jwtDecode(cookies.user_token);

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        if (page === 'Home') {
            navigate('/nud-hub/loginhome');
        }
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === 'Logout') {
            setOpenDialog(true);
        }
        if (setting === 'My Profile') {
            navigate('/nud-hub/profile');
        }
    };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    googleLogout();
    removeCookie("user_token");
    setOpenDialog(false);
    navigate("/");
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

  return (
    <>
      <AppBar
        position="static"
        className="appbar"
        sx={{ boxShadow: "0", backgroundColor: "#35408E" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/nud-hub/loginhome">
              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: "40px", height: "40px", marginTop: "-3px" }}
                />
              </Box>
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/nud-hub/loginhome"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "ClanOT-Black",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              NUD HUB
            </Typography>

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
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                    <Typography
                      sx={{ textAlign: "center", fontFamily: "ClanOT-Bold" }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "ClanOT-Black",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              NUD HUB
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCloseNavMenu(page)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontFamily: "ClanOT-Bold",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: "ClanOT-Bold",
                      color: "white",
                      fontSize: "15px",
                      marginRight: "10px",
                    }}
                  >
                    {userDetail.fname + " " + userDetail.lname}
                  </Typography>
                  <Avatar alt="John Doe" src={userDetail.profile_picture} />
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
                onClose={() => handleCloseUserMenu(null)}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontFamily: "ClanOT-Bold",
                        fontSize: "13px",
                        color: "#35408E",
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontFamily: "ClanOT-Black" }}
        >
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontFamily: "ClanOT-Bold" }}
          >
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="primary"
            sx={{ fontFamily: "ClanOT-Bold" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="primary"
            autoFocus
            sx={{ fontFamily: "ClanOT-Bold" }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppBarComponent;
