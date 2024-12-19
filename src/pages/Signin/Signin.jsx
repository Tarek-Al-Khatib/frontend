import { Button, TextField } from "@mui/material";
import React from "react";

const Signin = () => {
  return (
    <div className="signin-container bg-">
      <div className="signin-center-content flex flex-col items-center justify-center w-3/5 m-auto">
        <div className="flex">
          <div className="signin-left-side">
            <h3>Welcome back!</h3>
            <p>Let today be as a step to empower growth!</p>

            <div className="signin-form">
              <label htmlFor="username" className="signin-label">
                Username
              </label>
              <TextField id="username" variant="outlined" />

              <label htmlFor="password" className="signin-label">
                Username
              </label>
              <TextField id="username" variant="outlined" />
            </div>
            <p>
              Forgot your password?{" "}
              <button className="signin-reset-button">Reset</button>
            </p>
            <Button variant="contained">Sign in</Button>
          </div>
          <div className="signin-right-side">
            <strong>Hi</strong>
          </div>
        </div>
        <p>
          No account ? No problem,{" "}
          <button className="signin-reset-button">Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Signin;
