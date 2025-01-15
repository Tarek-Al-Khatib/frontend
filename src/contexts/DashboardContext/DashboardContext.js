import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { serverUrl } from "../../config/url";
import { authContext } from "../AuthContext/AuthContext";

export const dashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);
  const { token } = useContext(authContext);
  const [communities, setCommunities] = useState(null);
  const [learningPlans, setLearningPlans] = useState(null);
  useEffect(() => {
    if (token) {
      setLoading(true);
      getQuote();
      fetchStepsLastWeek(token);
      fetchTopCommunities();
      fetchTopLearningPlans();
    }
  }, [token]);

  useEffect(() => {
    if (
      quote !== null &&
      chartData !== null &&
      communities !== null &&
      learningPlans !== null
    ) {
      setLoading(false);
    }
  }, [quote, chartData, communities, learningPlans]);

  const getQuote = async () => {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": process.env.REACT_APP_NINJAS_API,
        },
      });

      setQuote(response.data[0]);
    } catch (e) {
      console.log("Error getting a quote:", e);
    }
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

  const fetchTopCommunities = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/community/top`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setCommunities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopLearningPlans = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/ai/top-plans`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.plans) {
        setLearningPlans(response.data.plans);
      }
      if (response.data.learning_plans) {
        setLearningPlans(response.data.learning_plans);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <dashboardContext.Provider
      value={{
        quote,
        chartData,
        loading,
        communities,
        learningPlans,
        setLearningPlans,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;
