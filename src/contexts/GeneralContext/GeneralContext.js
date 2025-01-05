import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const generalContext = createContext();

const GeneralProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { token } = useContext(authContext);

  useEffect(() => {
    if (token) {
      fetchNotifications(token);
    }
  }, [token]);

  const fetchNotifications = async (token) => {
    const response = await axios.get(`${serverUrl}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(response.data);
  };

  return (
    <generalContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </generalContext.Provider>
  );
};

export default GeneralProvider;
