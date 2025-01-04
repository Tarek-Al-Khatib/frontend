import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "../../css/colors.css";
const Interview = () => {
  return (
    <div>
      <Navbar />
      <div class="p-8 min-h-screen">
        <h1 className="pb-5 text-2xl font-thin text-navy">My Interviews</h1>

        <div className="flex">
          <div class="bg-gradient-to-r from-[#b0e9ff] to-[#0594b4] rounded-l-lg w-full flex flex-col items-start justify-center p-6 pl-32 gap-4">
            <h1 class="text-navy text-4xl font-extrabold">
              Practicing Interviews?
            </h1>
            <p class="text-navy text-2xl font-normal">
              Try out our new advanced{" "}
              <span className="font-extrabold">AI feature!</span>
            </p>
            <p class="text-navy text-2xl font-normal">
              Start your mock interview with our{" "}
              <span className="font-extrabold">AI model.</span>
            </p>
            <p class="text-navy text-2xl font-normal">
              Just like a normal one!
              <span className="font-extrabold"> TRY IT NOW</span>
            </p>
            <div class="flex flex-col items-center gap-4">
              <button class="bg-[#1e25a5] text-white text-xl font-bold font-['Open_Sans_Hebrew'] px-6 py-3 rounded-md">
                Start Mock Interview
              </button>
            </div>
          </div>
          <img
            class="w-full h-auto rounded-r-lg max-h-[350px] object-cover"
            src="https://miro.medium.com/v2/resize:fit:1000/1*ycwawTXjHk1-yuDuugyT5g.jpeg"
            alt="AI Recruitment"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Interview;
