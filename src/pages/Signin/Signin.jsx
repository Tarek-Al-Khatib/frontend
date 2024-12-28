import { Alert, AlertTitle, Collapse, Divider, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import "../../css/colors.css";
import "../../css/base.css";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import "./Signin.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigation = useNavigate();
  const { fetchLogin } = useContext(authContext);
  const [error, setError] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [loginState, setLoginState] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginState({ ...loginState, [id]: value });
    setError("");
  };

  const handleSignIn = async () => {
    const { successful, error } = await fetchLogin(
      loginState.emailOrUsername,
      loginState.password
    );

    if (successful) {
      navigation("/dashboard");
    } else {
      setError(error.response.data.error);
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 4000);
    }
  };
  return (
    <div className="signin-container">
      <div className="flex items-center justify-center min-h-screen">
        <Collapse
          in={alertVisible}
          sx={{
            position: "absolute",
            top: "20px",
            zIndex: 1000,
            width: "20%",
          }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Collapse>
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
                      htmlFor="emailOrUsername"
                      className="block mb-3 text-xs font-extrabold text-navy"
                    >
                      Username/email
                    </label>
                    <TextField
                      id="emailOrUsername"
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
                  className="w-full py-3 text-2xl font-extrabold text-white transition bg-dark-blue hover:bg-blue-400 rounded-self"
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
