import { Button, capitalize, Divider, TextField } from "@mui/material";
import React from "react";
import "./Signin.css";

const Signin = () => {
  return (
    <div className="signin-container">
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="bg-white w-[923px] p-12 pb-0 rounded-lg shadow-lg flex flex-col items-center justify-center gap-10"
          style={{ borderRadius: 50 }}
        >
          <div className="flex items-center justify-center w-full ">
            <div className="w-3/5 pr-8">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-blue-600">
                  Welcome Back!
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  Let today be as a step to empower growth!
                </p>

                <div className="flex flex-col mb-4 space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-1 font-medium text-gray-600"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-1 font-medium text-gray-600"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">
                    Forgot your password?{" "}
                    <button className="text-blue-500 hover:underline">
                      Reset
                    </button>
                  </p>
                </div>

                <button className="w-full py-3 text-lg font-extrabold text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
                  Sign in
                </button>
              </div>
            </div>
            <Divider
              orientation="vertical"
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
            >
              OR
            </Divider>
            <div className="flex flex-col items-center justify-center w-2/5">
              <strong>Sign in with Google</strong>
              <strong>Sign in with Github</strong>
              <strong>Sign in with Linkedin</strong>
            </div>
          </div>
          <p className="pb-4 text-sm text-gray-500">
            No account? No problem,{" "}
            <button className="text-blue-500 hover:underline">Signup</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
