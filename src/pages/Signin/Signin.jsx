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
        <div className="flex flex-col items-center justify-center w-1/3 gap-10 p-8 pb-0 bg-white rounded-lg shadow-lg max-lg:w-2/3">
          <div className="flex items-center justify-center w-full ">
            <div className="w-full pr-8 max-lg:pr-0">
              <div>
                <h3 className="text-2xl font-extrabold text-navy max-lg:text-xl">
                  Welcome Back!
                </h3>
                <p className="mb-6 text-sm font-bold text-dark-gray max-lg:text-xs">
                  Let today be as a step to empower growth!
                </p>

                <div className="flex flex-col mb-4 space-y-4">
                  <div>
                    <label
                      htmlFor="emailOrUsername"
                      className="block mb-3 text-base font-extrabold text-navy max-lg:text-sm"
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
                          borderRadius: 1,
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
                      className="block mb-3 text-base font-extrabold text-navy"
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
                          borderRadius: 1,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E5E5",
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-navy">Forgot your password?</p>
                </div>

                <button
                  disabled={
                    loginState.emailOrUsername === "" ||
                    loginState.password === ""
                  }
                  className="w-full py-3 text-2xl font-extrabold text-white transition bg-dark-blue hover:bg-blue-400 rounded-self"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
          <p className="pb-4 text-sm text-navy max-md:text-xs">
            No account? No problem,{" "}
            <button onClick={() => navigation("/signup")}>
              <strong>Sign Up</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
