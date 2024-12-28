import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchLogin = async (emailOrUsername, password) => {
    try {
      const response = await axios.post("/api/auth/login", {
        emailOrUsername,
        password,
      });
      const { user, token } = response.data;

      setUser(user);
      setToken(token);

      localStorage.setItem("authToken", token);

      return user;
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error(
        error.response?.data?.error || "Failed to log in. Please try again."
      );
    }
  };

  const fetchSignup = async () => {};

  return (
    <authContext.Provider
      value={{
        user,
        userId: user.id,
        fetchLogin,
        fetchSignup,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
