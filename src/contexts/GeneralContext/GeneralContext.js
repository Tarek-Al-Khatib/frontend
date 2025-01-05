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

  const markAsReadNotifications = () => {
    notifications
      .filter((n) => !n.is_read)
      .map(async (notification) => {
        const response = await axios.patch(
          `${serverUrl}/api/notifications/${notification.id}/read`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data);
      });

    fetchNotifications(token);
  };

  return (
    <generalContext.Provider
      value={{ notifications, setNotifications, markAsReadNotifications }}
    >
      {children}
    </generalContext.Provider>
  );
};

export default GeneralProvider;
