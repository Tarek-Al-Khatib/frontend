import { TextField } from "@mui/material";
import "./Signup.css";
import "../../css/base.css";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext/AuthContext";

const SignUp = () => {
  const navigation = useNavigate();
  const { fetchSignup } = useContext(authContext);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const [signupState, setSignupState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setSignupState({ ...signupState, [id]: value });
    setError("");
  };

  const handleSignup = async () => {
    const { successful, error } = await fetchSignup(
      signupState.username,
      signupState.email,
      signupState.password
    );

    if (successful) {
      navigation("/signin");
    } else {
      setError(error.response.data.error);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 4000);
    }
  };
  return (
    <div className="signup-container">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white w-[477px] rounded-self shadow-lg flex flex-col items-center justify-center gap-10 pt-6 ">
          <div className="w-full">
            <div className="m-6">
              <h3 className="mb-3 text-2xl font-extrabold text-navy">
                Hey there!
              </h3>
              <p className="mb-6 text-sm font-medium text-dark-gray">
                You've chosen the right path, son. Let it glow!
              </p>

              <div className="flex flex-col space-y-4 mb-9">
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
                    htmlFor="email"
                    className="block mb-3 text-xs font-extrabold text-navy"
                  >
                    Email
                  </label>
                  <TextField
                    id="email"
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

              <button
                className="w-full py-3 text-2xl font-extrabold text-white transition bg-dark-blue rounded- hover:bg-blue-400 rounded-self"
                onClick={handleSignup}
              >
                Sign in
              </button>
              <p className="pt-8 text-sm text-center text-navy">
                Already have an account?{" "}
                <button>
                  <strong>Login</strong>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
