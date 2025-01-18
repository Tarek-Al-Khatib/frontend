import React from "react";
import "../../css/colors.css";
import Logo from "../../assets/logo.png";
import { Divider } from "@mui/material";
import { LuLinkedin } from "react-icons/lu";
import { FiGithub } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate("/myprofile");
  };

  const handleLogoutClick = () => {
    navigate("/signin");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };
  return (
    <footer className="flex flex-col gap-16 p-8 text-white bg-navy">
      <div className="flex flex-col items-center justify-center gap-3 mt-5 text-center">
        <h1 className="text-5xl font-bold">Empower Growth, Unlock Potential</h1>
        <p className="w-1/3 text-sm">
          WorkWise empowers graduates and junior professionals with personalized
          learning plans, instant feedback from AI-driven mock interviews, and
          expert community connections to boost industry knowledge.
        </p>

        <div className="flex gap-5">
          <button
            onClick={handleLogoutClick}
            className="py-2 bg-white rounded-full px-7 text-navy hover:bg-gray-200"
          >
            Logout
          </button>
          <button
            onClick={handleProfileClick}
            className="py-2 bg-white rounded-full px-7 text-navy hover:bg-gray-200"
          >
            Profile
          </button>
        </div>
      </div>

      <Divider sx={{ borderColor: "#b0e9ff42", marginX: 40 }} />
      <div className="container flex items-center justify-between w-11/12 mx-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full">
            <img src={Logo} alt="Logo" className="w-20 h-20" />
          </div>
        </div>

        <p className="text-xl font-light">2025 © WorkWise</p>
        <div className="flex gap-2">
          <div className="p-3 border border-blue-400 rounded-full">
            <a href="https://www.linkedin.com/in/tarek-al-khatib/">
              <LuLinkedin color="white" size={30} />
            </a>
          </div>
          <div className="p-3 border border-blue-400 rounded-full">
            <a href="https://github.com/Tarek-Al-Khatib">
              <FiGithub color="white" size={30} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
