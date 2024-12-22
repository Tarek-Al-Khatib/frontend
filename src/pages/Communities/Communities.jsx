import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Communities.css";
import { IoMdAdd } from "react-icons/io";
import { FiSend } from "react-icons/fi";
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

        <div class="flex flex-col flex-grow bg-white p-6">
          <div>
            <h1 class="text-4xl text-navy mb-4">Welcome to //general</h1>
            <p class="text-xl text-navy mb-4 font-thin">
              @Admin created this channel on 17/07/2024: Channel description
              (not more than 250 chars)
            </p>
            <hr class="border-t border-blue-900 mb-6" />
          </div>
          <div class="flex flex-col gap-5 flex-grow">
            <div>
              <div class="flex items-start gap-7">
                <div class="w-12 h-12 bg-blue-900 rounded-full"></div>
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-6 w-fit">
                    <div class="text-sm text-blue-900 font-bold">Name</div>
                    <div class="px-2 py-1 bg-blue-900 text-white text-xs rounded">
                      Badge
                    </div>
                    <div class="text-blue-900 text-sm">17-8-2024 7:42 PM</div>
                  </div>
                  <p class="text-base text-black">
                    Hello Everyone <br />
                    I'm so excited to start learning today!
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div class="flex items-start gap-7">
                <div class="w-12 h-12 bg-blue-900 rounded-full"></div>
                <div class="flex-1">
                  <div class="flex items-center justify-between gap-6 w-fit">
                    <div class="text-sm text-blue-900 font-bold">Name 2</div>
                    <div class="px-2 py-1 bg-blue-900 text-white text-xs rounded">
                      Badge
                    </div>
                    <div class="text-blue-900 text-sm">17-8-2024 7:45 PM</div>
                  </div>
                  <p class="text-base text-black">
                    Me too ! <br />
                    By the way where are you from ?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-6 bg-slight-gray p-4 rounded-self">
            <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <IoMdAdd size={25} className="text-navy" />
            </button>
            <input
              type="text"
              class="flex-1 bg-transparent placeholder-gray-400 text-xl outline-none"
              placeholder="Type your message here for //general"
            />
            <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <FiSend size={25} className="text-navy" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communities;
