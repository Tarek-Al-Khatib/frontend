import React from "react";

const Profile = () => {
  return (
    <div class="flex gap-5 justify-between w-[650px] bg-white rounded-[15px] p-6">
      <div class="w-32 h-32 bg-[#1e25a6] rounded-full flex justify-center items-center">
        <span class="text-white text-sm font-bold font-['Open Sans Hebrew']">
          user img
        </span>
      </div>

      <div class="flex justify-center gap-10">
        <div className="flex flex-col justify-center w-1/3 gap-5">
          <div class="flex justify-start gap-5">
            <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
              Name:
            </span>
            <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
              Username
            </span>
          </div>
          <div class="flex justify-start gap-5">
            <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
              Email:
            </span>
            <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
              Email
            </span>
          </div>
          <div class="flex justify-start gap-5">
            <span class="text-[#1e25a6] text-sm font-normal font-['Open Sans Hebrew']">
              Points:
            </span>
            <span class="text-[#1e25a6] text-sm font-bold font-['Open Sans Hebrew']">
              1200
            </span>
          </div>
        </div>
        <div class="flex flex-col items-center w-1/3">
          <span class="text-[#1e25a6] text-base font-extrabold font-['Open Sans Hebrew'] mb-4">
            Badges
          </span>
          <div class="flex flex-wrap gap-3 justify-center">
            <div class="w-9 h-9 bg-[#1e25a6] rounded-full flex justify-center items-center">
              <span class="text-black text-base font-extrabold font-['Open Sans Hebrew']">
                13
              </span>
            </div>
            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
            <div class="w-9 h-9 bg-[#1e25a6] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
