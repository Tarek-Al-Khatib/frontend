import React from "react";
import CircularWithValueLabel from "../../components/CircularProgressWithLabel/CircularProgressWithLabel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Divider } from "@mui/material";

const Learning = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen p-8 bg-white">
        <div className="flex justify-center">
          <div className="w-1/4">
            <div className="mb-16 text-2xl font-light text-navy">
              My Learning | Learning Plans
            </div>
            <div className="mb-2 text-4xl font-bold text-navy">Hey Nour!</div>
            <div className="mb-8 text-xl font-light text-navy">
              Here you can check your learning plans and see each plan's steps
              and progress. Have a productive day!
            </div>
          </div>

          <div className="flex flex-col items-stretch flex-grow gap-5 pl-20 mt-10">
            <div className="flex justify-end">
              <button className="px-12 py-2 text-xl font-normal text-white bg-navy rounded-2xl">
                Add Plan
              </button>
            </div>
            <div className="flex justify-center gap-10 mb-12 h-60">
              <div className="flex items-center justify-center w-2/5 p-6 bg-white border border-gray-200 h-4/5 rounded-xl">
                <div className="flex items-center justify-center mb-4 rounded-full w-28 h-28 bg-navy"></div>
                <div>
                  <div className="mb-5 text-6xl font-bold text-center text-navy">
                    13
                  </div>
                  <div className="text-xl font-normal text-navy">
                    Plans Created
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-2/5 p-6 bg-white border border-gray-200 h-4/5 rounded-xl">
                <div className="flex items-center justify-center mb-4 rounded-full w-28 h-28 bg-navy"></div>
                <div>
                  <div className="mb-5 text-5xl font-bold text-center text-navy ">
                    4
                  </div>
                  <div className="text-xl font-normal text-navy">
                    Plans Completed
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-2/5 p-6 bg-white border border-gray-200 h-4/5 rounded-xl">
                <div className="flex items-center justify-center mb-4 rounded-full w-28 h-28 bg-navy"></div>
                <div>
                  <div className="mb-5 text-5xl font-bold text-center text-navy ">
                    7
                  </div>
                  <div className="text-xl font-normal text-navy">
                    Steps in progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className=" border rounded-2xl border-gray-200 bg-white p-4 w-full max-w-sm h-[600px]">
            <div className="flex gap-6">
              <div>
                <div className="text-navy text-2xl font-bold font-['Open Sans Hebrew'] mb-4">
                  Learning Plan
                </div>
                <div className="text-navy text-xl font-normal font-['Open Sans Hebrew'] mb-6">
                  This is a learning plan that was implemented by the user
                </div>
              </div>
              <div>
                <CircularWithValueLabel value={67} size={60} />
              </div>
            </div>

            <div className="relative p-4 bg-white ">
              <div className="space-y-4 h-[400px] overflow-y-scroll">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <Divider
                      orientation="horizontal"
                      textAlign="center"
                      flexItem
                      sx={{
                        color: "#1E25A6",
                        "::before, ::after": {
                          borderColor: "#1E25A6",
                        },
                        fontWeight: "800",
                        fontSize: 20,
                      }}
                    ></Divider>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <img
                    className="w-14 h-14"
                    src="https://via.placeholder.com/61x59"
                    alt="Step Icon"
                  />
                  <div>
                    <div className="text-base font-normal text-navy">Step</div>
                    <div className="text-2xl font-normal text-navy">
                      Do something
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-b from-white via-white/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white via-white/70 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learning;
