import React from "react";
import "../../css/colors.css";
const Home = () => {
  return (
    <div className="bg-gray-100">
      <header className="py-4 text-white bg-navy">
        <div className="container flex items-center justify-between w-11/12 mx-auto">
          <img src="public/images/logo.png" alt="Logo" className="h-10" />
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-6 text-2xl gap-14">
              <a href="#" className="hover:text-gray-200">
                Home
              </a>
              <a href="#about" className="hover:text-gray-200">
                About us
              </a>
              <a href="#contact" className="hover:text-gray-200">
                Contact us
              </a>
            </nav>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 font-bold">Login</button>
            <button className="px-4 py-2 font-bold">Sign Up</button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
