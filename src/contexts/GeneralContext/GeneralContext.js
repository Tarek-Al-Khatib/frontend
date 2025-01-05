import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const generalContext = createContext();

const GeneralProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user, token } = useContext(authContext);

  useEffect(() => {
    if (user && token) {
      fetchNotifications();
    }
  }, [user, token]);

  const fetchNotifications = async (userId, token) => {
    const response = await axios.get(`${serverUrl}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotifications(response.data);
  };

  return <generalContext.Provider>{children}</generalContext.Provider>;
};

export default GeneralProvider;
