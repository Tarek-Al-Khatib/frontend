import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const dashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      await getQuote();
    };

    fetchQuote();
  }, []);

  const getQuote = async () => {
    try {
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=success",
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_NINJAS_API,
          },
        }
      );

      setQuote(response.data[0]);
    } catch (e) {
      console.log("Error getting a quote:", e);
    }
  };
  return (
    <dashboardContext.Provider value={{ quote }}>
      {children}
    </dashboardContext.Provider>
  );
};

export default DashboardProvider;
