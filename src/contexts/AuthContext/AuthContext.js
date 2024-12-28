import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config/url";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchLogin = async (emailOrUsername, password) => {
    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        emailOrUsername,
        password,
      });
      const data = response.data;

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("authToken", token);

      return user;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  };

  const fetchSignup = async (username, email, password) => {
    try {
      const response = await axios.post(`${serverUrl}/api/auth/register`, {
        username,
        email,
        password,
      });
      const data = response.data;

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("authToken", token);

      return user;
    } catch (error) {
      console.error("Error during signup:", error);
      throw new Error(
        error.response?.data?.error || "Failed to sign up. Please try again."
      );
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        token,
        fetchLogin,
        fetchSignup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
