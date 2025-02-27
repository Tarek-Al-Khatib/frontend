import React, { useContext, useEffect, useState } from "react";
import { BiSolidBell } from "react-icons/bi";
import { BiSolidBellRing } from "react-icons/bi";
import Logo from "../../assets/logo.png";
import "../../css/colors.css";
import Avatar from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLocation, useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import NotificationSound from "../../assets/sounds/notification.mp3";
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
import { useSocket } from "../../utils/useSocket";
import { generalContext } from "../../contexts/GeneralContext/GeneralContext";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import { Slant as Hamburger } from "hamburger-react";

const Navbar = () => {
  const socket = useSocket();
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const { notifications, setNotifications, markAsReadNotifications } =
    useContext(generalContext);
  const open = Boolean(anchorEl);
  const openNotifications = Boolean(anchorElNotifications);

  useEffect(() => {
    if (socket) {
      socket.on("receiveNotification", (notification) => {
        setNotifications((prev) => [notification, ...prev]);

        const audio = new Audio(NotificationSound);
        audio.play().catch((error) => {
          console.error("Error playing notification sound:", error);
        });
      });

      return () => {
        socket.off("receiveNotification");
      };
    }
  }, [socket]);

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

  return (
    <div className="font-sans bg-white">
      <button
        className="fixed z-50 p-3 text-whiterounded-full top-2 right-4 sm:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Hamburger
          color="#4a80f1"
          toggled={isSidebarOpen}
          toggle={setIsSidebarOpen}
        />
      </button>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-40 h-full max-sm:flex sm:hidden bg-white transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 w-77`}
      >
        <header className="flex flex-col items-center justify-center gap-24 px-6 py-2 text-white border-b border-b-blue-600">
          <div className="flex items-center space-x-2 max-sm:hidden">
            <img src={Logo} alt="Logo" className="w-16 h-16" />
          </div>
          <div className="flex items-center gap-8">
            <button onClick={(e) => setAnchorElNotifications(e.currentTarget)}>
              {notifications.filter((n) => !n.is_read).length > 0 ? (
                <BiSolidBellRing className="text-navy" size={25} />
              ) : (
                <BiSolidBell className="text-navy" size={25} />
              )}
            </button>
            <Popover
              id="notification-popover"
              open={openNotifications}
              anchorEl={anchorElNotifications}
              onClose={() => {
                setAnchorElNotifications(null);
                markAsReadNotifications();
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                borderRadius: 24,
                "& .MuiPaper-root": {
                  borderRadius: 5,
                },
              }}
            >
              <Box
                sx={{
                  width: 300,
                  maxHeight: 400,
                  overflowY: "auto",
                }}
              >
                <List>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => {
                      const { type, title, message } = notification;
                      const config = typeConfig[type] || {};
                      return (
                        <ListItem
                          key={index}
                          sx={{
                            alignItems: "flex-start",
                            display: "flex",
                            gap: 1,
                            borderBottom: 1,
                            borderColor: "#ddd",
                            backgroundColor: notification.is_read
                              ? ""
                              : "#b0e9ff",
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
              className="w-11 h-11"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              {user && (
                <img
                  src={user.profile_pic}
                  alt={`${user.profile_pic} profile pic`}
                  className="object-cover w-full h-full rounded-full"
                />
              )}
            </button>
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
          <nav className="flex flex-col items-center gap-24 text-xl font-thin">
            <button
              className={`text-navy  ${
                selectedPage === "/dashboard" ? "font-bold" : ""
              }`}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </button>
            <button
              className={`text-navy  ${
                selectedPage === "/learning" ? "font-bold" : ""
              }`}
              onClick={() => {
                navigate("/learning");
              }}
            >
              My Learning
            </button>
            <button
              className={`text-navy  ${
                selectedPage === "/community" ? "font-bold" : ""
              }`}
              onClick={() => {
                navigate("/community");
              }}
            >
              Communities
            </button>
            <button
              className={`text-navy  ${
                selectedPage === "/interview" ? "font-bold" : ""
              }`}
              onClick={() => {
                navigate("/interview");
              }}
            >
              My Interviews
            </button>
          </nav>
        </header>
      </div>
      <header className="flex items-center justify-between px-6 py-2 text-white border-b max-sm:hidden border-b-blue-600">
        <div className="flex items-center space-x-2 max-sm:hidden">
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </div>
        <nav className="flex items-center gap-24 text-xl font-thin max-lg:gap-10 max-lg:text-base">
          <button
            className={`text-navy  ${
              selectedPage === "/dashboard" ? "font-bold" : ""
            }`}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>
          <button
            className={`text-navy  ${
              selectedPage === "/learning" ? "font-bold" : ""
            }`}
            onClick={() => {
              navigate("/learning");
            }}
          >
            My Learning
          </button>
          <button
            className={`text-navy  ${
              selectedPage === "/community" ? "font-bold" : ""
            }`}
            onClick={() => {
              navigate("/community");
            }}
          >
            Communities
          </button>
          <button
            className={`text-navy  ${
              selectedPage === "/interview" ? "font-bold" : ""
            }`}
            onClick={() => {
              navigate("/interview");
            }}
          >
            My Interviews
          </button>
        </nav>
        <div className="flex items-center gap-8">
          <button onClick={(e) => setAnchorElNotifications(e.currentTarget)}>
            {notifications.filter((n) => !n.is_read).length > 0 ? (
              <BiSolidBellRing className="text-navy" size={25} />
            ) : (
              <BiSolidBell className="text-navy" size={25} />
            )}
          </button>
          <Popover
            id="notification-popover"
            open={openNotifications}
            anchorEl={anchorElNotifications}
            onClose={() => {
              setAnchorElNotifications(null);
              markAsReadNotifications();
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              borderRadius: 24,
              "& .MuiPaper-root": {
                borderRadius: 5,
              },
            }}
          >
            <Box
              sx={{
                width: 300,
                maxHeight: 400,
                overflowY: "auto",
              }}
            >
              <List>
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => {
                    const { type, title, message } = notification;
                    const config = typeConfig[type] || {};
                    return (
                      <ListItem
                        key={index}
                        sx={{
                          alignItems: "flex-start",
                          display: "flex",
                          gap: 1,
                          borderBottom: 1,
                          borderColor: "#ddd",
                          backgroundColor: notification.is_read
                            ? ""
                            : "#b0e9ff",
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
            className="w-11 h-11"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {user && (
              <img
                src={user.profile_pic}
                alt={`${user.profile_pic} profile pic`}
                className="object-cover w-full h-full rounded-full"
              />
            )}
          </button>
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
