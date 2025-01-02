import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import "../../css/colors.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (e) => {
    setAnchorEl(e.currentTarget);
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
          <button className="rounded-full bg-navy w-11 h-11"></button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
