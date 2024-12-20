import { Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import "../../css/colors.css";
import "./Signin.css";

const Signin = () => {
  const [error, setError] = useState("");
  const [loginState, setLoginState] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginState({ ...loginState, [id]: value });
    setError("");
  };

  const handleSignIn = () => {};
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
                <h3 className="text-2xl font-bold text-navy">Welcome Back!</h3>
                <p className="mb-6 text-sm font-bold text-dark-gray">
                  Let today be as a step to empower growth!
                </p>

                <div className="flex flex-col mb-4 space-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-3 text-xs font-extrabold text-navy"
                    >
                      Username
                    </label>
                    <TextField
                      id="username"
                      onChange={handleInputChange}
                      variant="outlined"
                      sx={{
                        width: "100%",

                        "& .MuiOutlinedInput-root": {
                          borderRadius: 5,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E5E5",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-3 text-xs font-extrabold text-navy"
                    >
                      Password
                    </label>
                    <TextField
                      id="password"
                      type="password"
                      variant="outlined"
                      onChange={handleInputChange}
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 5,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E5E5",
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-navy">
                    Forgot your password?{" "}
                    <button>
                      <strong>Reset</strong>
                    </button>
                  </p>
                </div>

                <button
                  className="w-full py-3 text-2xl font-extrabold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
                  onClick={handleSignIn}
                >
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
          <p className="pb-4 text-sm text-navy">
            No account? No problem,{" "}
            <button>
              <strong>Signup</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
