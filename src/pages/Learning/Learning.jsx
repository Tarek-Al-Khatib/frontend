import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Learning = () => {
  return (
    <div>
      <Navbar />
      <div class="min-h-screen bg-white p-8">
        <div className="flex justify-center">
          <div className="w-1/4">
            <div class="text-navy text-2xl font-light mb-16">
              My Learning | Learning Plans
            </div>
            <div class="text-4xl font-bold mb-2 text-navy">Hey Nour!</div>
            <div class="text-xl font-light mb-8 text-navy">
              Here you can check your learning plans and see each plan's steps
              and progress. Have a productive day!
            </div>
          </div>

          <div className="flex flex-col items-stretch flex-grow gap-5 pl-20 mt-10">
            <div class="flex justify-end">
              <button class="bg-navy text-white text-xl font-normal px-12 py-2 rounded-2xl">
                Add Plan
              </button>
            </div>
            <div class="flex justify-center gap-10 mb-12 h-60">
              <div class="flex items-center justify-center w-2/5 h-4/5  bg-white border rounded-xl border-gray-200 p-6">
                <div class="w-28 h-28 bg-navy rounded-full flex items-center justify-center mb-4"></div>
                <div>
                  <div class="text-navy text-6xl font-bold text-center mb-5">
                    13
                  </div>
                  <div class="text-navy text-xl font-normal">Plans Created</div>
                </div>
              </div>

              <div class="flex items-center justify-center w-2/5 h-4/5  bg-white rounded-xl border border-gray-200 p-6">
                <div class="w-28 h-28 bg-navy rounded-full flex items-center justify-center mb-4"></div>
                <div>
                  <div class="text-navy text-5xl font-bold text-center mb-5  ">
                    4
                  </div>
                  <div class="text-navy text-xl font-normal">
                    Plans Completed
                  </div>
                </div>
              </div>

              <div class="flex items-center h-4/5 justify-center w-2/5 bg-white rounded-xl border border-gray-200 p-6">
                <div class="w-28 h-28 bg-navy rounded-full flex items-center justify-center mb-4"></div>
                <div>
                  <div class="text-navy text-5xl font-bold text-center mb-5  ">
                    7
                  </div>
                  <div class="text-navy text-xl font-normal">
                    Steps in progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learning;
