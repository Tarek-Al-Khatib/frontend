import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "../../css/colors.css";
import Avatar from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
          <button>
            <FaBell className="text-navy" size={20} />
          </button>
          <button
            className="rounded-full bg-navy w-11 h-11"
            onClick={handleProfileClick}
          ></button>
          <Menu
            id="account-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
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
              onClick={handleClose}
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
              onClick={handleClose}
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
