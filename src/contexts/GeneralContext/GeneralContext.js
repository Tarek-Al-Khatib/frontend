import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";
import moment from "moment/moment";

export const generalContext = createContext();

const GeneralProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { token } = useContext(authContext);

  useEffect(() => {
    if (token) {
      fetchNotifications(token);
      fetchStepsLastWeek(token);
      fetchLeaderboard(token);
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

      const steps = response.data.data;
      console.log(steps);

      const last7Days = Array.from({ length: 7 }, (_, i) =>
        moment()
          .subtract(6 - i, "days")
          .format("MM/DD")
      );

      const dataset = last7Days.map((day) => ({
        day,
        stepCount: steps.filter(
          (step) => moment(step.completed_at).format("MM/DD") === day
        ).length,
      }));

      setChartData(dataset);
    } catch (error) {
      console.log("Error in fetching steps last week: ", error);
    }
  };

  const fetchLeaderboard = async (token) => {
    try {
      const response = await axios.get(`${serverUrl}/api/user/leaderboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLeaderboardData(response.data.data);
    } catch (error) {
      console.log("Error fetching the leaderboard: ", error);
    }
  };

  const updateImage = async (profileImageFile) => {
    try {
      const formData = new FormData();
      formData.append("profile_image", profileImageFile);

      const response = await axios.put(
        `${serverUrl}/api/user/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log("Error uploading the profile image: ", error);
    }
  };

  return (
    <generalContext.Provider
      value={{
        notifications,
        setNotifications,
        markAsReadNotifications,
        chartData,
        leaderboardData,
        updateImage,
      }}
    >
      {children}
    </generalContext.Provider>
  );
};

export default GeneralProvider;
