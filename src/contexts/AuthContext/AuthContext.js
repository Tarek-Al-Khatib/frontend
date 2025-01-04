import React, { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config/url";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    console.log(userId);

    if (userId && token) {
      console.log("getting the user");
      try {
        const response = await axios.get(`${serverUrl}/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;

        setUser(data.user);
        setToken(token);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchLogin = async (emailOrUsername, password) => {
    try {
      const response = await axios.post(`${serverUrl}/api/auth/login`, {
        emailOrUsername,
        password,
      });
      const data = response.data;

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.token);

      return { successful: true, error: null };
    } catch (error) {
      console.error("Error during login:", error);
      return { successful: false, error };
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

      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.token);

      return { successful: true, error: null };
    } catch (error) {
      console.error("Error during login:", error);
      return { successful: false, error };
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
