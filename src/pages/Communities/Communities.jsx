import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { IoMdAdd } from "react-icons/io";
const Communities = () => {
  return (
    <div>
      <Navbar />
      <div class="flex bg-white w-full h-screen">
        <div class="w-24 bg-white flex flex-col items-center py-6">
          <div class="w-20 h-20 bg-navy rounded-full mb-5"></div>
          <div class="w-20 h-20 bg-navy rounded-full mb-5"></div>
          <div class="w-20 h-20 bg-navy rounded-full mb-5"></div>
          <div class="w-20 h-20 bg-navy rounded-full mb-5"></div>
          <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <IoMdAdd size={25} />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communities;
