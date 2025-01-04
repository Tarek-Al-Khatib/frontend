import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "../../css/colors.css";
import Avatar from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const open = Boolean(anchorEl);
  const openNotifications = Boolean(anchorElNotifications);

  const handleProfileClick = () => {
    navigate("/myprofile");
  };

  const handleLogoutClick = () => {
    navigate("/signin");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  const typeConfig = {
    INFO: { icon: <InfoIcon color="info" />, color: "blue" },
    REMINDER: { icon: <EventNoteIcon color="primary" />, color: "green" },
    ALERT: { icon: <WarningIcon color="error" />, color: "red" },
  };

  const mockNotifications = [
    {
      title: "New Message",
      message: "You have a new message from John.",
      timestamp: "2025-01-01 10:00 AM",
    },
    {
      title: "Update Available",
      message: "Version 2.0 of the app is now available. Click to update!",
      timestamp: "2025-01-01 9:30 AM",
    },
    {
      title: "Payment Successful",
      message: "Your payment of $49.99 has been processed successfully.",
      timestamp: "2025-01-01 8:45 AM",
    },
    {
      title: "System Alert",
      message: "Your account password will expire in 3 days. Update now.",
      timestamp: "2025-01-01 7:15 AM",
    },
    {
      title: "Friend Request",
      message: "Alice has sent you a friend request.",
      timestamp: "2025-01-01 6:50 AM",
    },
  ];
  return (
    <div className="font-sans bg-white">
      <header className="flex items-center justify-between px-6 py-2 text-white border-b border-b-blue-600">
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </div>
        <nav className="flex items-center gap-24 text-xl font-thin">
          <button className="text-navy" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button className="text-navy" onClick={() => navigate("/learning")}>
            My Learning
          </button>
          <button className="text-navy" onClick={() => navigate("/community")}>
            Communities
          </button>
          <button className="text-navy" onClick={() => navigate("/interview")}>
            My Interviews
          </button>
        </nav>
        <div className="flex items-center gap-8">
          <button onClick={(e) => setAnchorElNotifications(e.currentTarget)}>
            <FaBell className="text-navy" size={20} />
          </button>
          <Popover
            id="notification-popover"
            open={openNotifications}
            anchorEl={anchorElNotifications}
            onClose={() => setAnchorElNotifications(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ width: 300, maxHeight: 400, overflowY: "auto" }}>
              <List>
                {mockNotifications.length > 0 ? (
                  mockNotifications.map((notification, index) => {
                    const { type, title, message } = notification;
                    const config = typeConfig[type] || {};
                    return (
                      <ListItem
                        key={index}
                        sx={{
                          alignItems: "flex-start",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        {config.icon}
                        <ListItemText
                          primary={title}
                          secondary={message}
                          sx={{
                            "& .MuiTypography-body1": { fontWeight: 600 },
                          }}
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <Typography sx={{ textAlign: "center", p: 2 }}>
                    No notifications
                  </Typography>
                )}
              </List>
            </Box>
          </Popover>
          <button
            className="rounded-full bg-navy w-11 h-11"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          ></button>
          <Menu
            id="account-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                handleProfileClick();
                setAnchorEl(null);
              }}
              sx={{
                color: "navy",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "start",
              }}
            >
              <Avatar />
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogoutClick();
                setAnchorEl(null);
              }}
              sx={{
                color: "navy",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "space-between",
                textAlign: "start",
              }}
            >
              <LogoutIcon />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
