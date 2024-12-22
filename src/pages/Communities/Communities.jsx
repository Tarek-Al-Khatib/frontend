import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Communities.css";
import { IoMdAdd } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const Communities = () => {
  return (
    <div>
      <Navbar />
      <div class="flex bg-white w-full h-screen/92">
        <div class="w-24 bg-white flex flex-col items-center py-6">
          <button class="w-20 h-20 bg-navy rounded-full mb-5"></button>
          <button class="w-20 h-20 bg-navy rounded-full mb-5"></button>
          <button class="w-20 h-20 bg-navy rounded-full mb-5"></button>
          <button class="w-20 h-20 bg-navy rounded-full mb-5"></button>
          <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <IoMdAdd size={25} />
          </button>
        </div>
        <div class="w-80 bg-blue-900 p-6">
          <div class="flex flex-col items-center mb-8">
            <div class="w-28 h-24 bg-blue-900 rounded mb-4 flex items-center justify-center text-center text-blue-300 text-base font-light">
              Community
              <br />
              logo
            </div>
            <div class="text-white text-lg font-light">Community Name</div>
          </div>

          <div class="mb-10">
            <hutton class="text-white text-lg font-bold mb-3 flex items-center">
              <IoIosArrowForward />
              <IoIosArrowDown />
              Channels
            </hutton>
            <div class="flex flex-col">
              <button class="w-full py-3 bg-blue-600/60 rounded text-white font-bold text-start px-3">
                // general
              </button>
              <button class="w-full py-3 bg-transparent px-3 hover:bg-blue-700/30 flex justify-between items-center rounded text-white font-bold text-start">
                // announcements
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs">
                  1
                </div>
              </button>
              <button class="w-full py-3 bg-transparent px-3 hover:bg-blue-700/30 flex justify-between items-center rounded text-white font-bold">
                // projects
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs">
                  1
                </div>
              </button>
              <button class="w-full py-3 bg-transparent px-3 hover:bg-blue-700/30 flex justify-between items-center rounded text-white font-bold">
                // q/a
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs">
                  1
                </div>
              </button>
              <button class="w-full py-3 bg-transparent px-3 hover:bg-blue-700/30 flex justify-between items-center rounded text-white font-bold">
                // discussion
                <div class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs">
                  1
                </div>
              </button>
            </div>
          </div>

          <div>
            <hutton class="text-white text-lg font-bold mb-3 flex items-center">
              <IoIosArrowForward />
              <IoIosArrowDown />
              Moderators
            </hutton>
            <div class="space-y-3">
              <button class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-white rounded"></div>
                <div class="text-white text-sm font-thin">Moderator name</div>
              </button>
              <button class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-white rounded"></div>
                <div class="text-white text-sm font-thin">Moderator name</div>
              </button>
              <button class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-white rounded"></div>
                <div class="text-white text-sm font-thin">Moderator name</div>
              </button>
              <button class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-white rounded"></div>
                <div class="text-white text-sm font-thin">Moderator name</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communities;
