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
  const [quoteLoaded, setQuoteLoaded] = useState(false);
  const [chartDataLoaded, setChartDataLoaded] = useState(false);
  useEffect(() => {
    if (token) {
      setLoading(true);
      getQuote();
      fetchStepsLastWeek(token);
    }
  }, [token]);

  useEffect(() => {
    if (quoteLoaded && chartDataLoaded) {
      setLoading(false);
    }
  }, [quoteLoaded, chartDataLoaded]);

  const getQuote = async () => {
    try {
      const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": process.env.REACT_APP_NINJAS_API,
        },
      });

      setQuote(response.data[0]);
      setQuoteLoaded(true);
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
      setChartDataLoaded(true);
    } catch (error) {
      console.log("Error in fetching steps last week: ", error);
    }
  };
  return (
    <dashboardContext.Provider value={{ quote, chartData, loading }}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;
