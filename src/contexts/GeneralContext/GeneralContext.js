import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const generalContext = createContext();

const GeneralProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [chartData, setChartData] = useState({});
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
        console.log(token);
        const response = await axios.patch(
          `${serverUrl}/api/notifications/${notification.id}/read`,
          {},
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

  const fetchStepsLastWeek = async (token) => {
    try {
      const response = await axios.get(`${serverUrl}/api/learning/last-week`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);
    } catch (error) {
      console.log("Error in fetching steps last week: ", error);
    }
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
