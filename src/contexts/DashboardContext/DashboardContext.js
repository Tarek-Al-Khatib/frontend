import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

export const dashboardContext = createContext();
dotenv.config();

const DashboardProvider = ({ children }) => {
  const getQuote = async () => {
    try {
      const response = await axios.get(
        "https://api.api-ninjas.com/v1/quotes?category=success",
        {
          headers: {
            "X-Api-Key": process.env.NINJAS_API,
          },
        }
      );

      console.log(response.data);
    } catch (e) {
      console.log("Error getting a quote:", e);
    }
  };
  return (
    <dashboardContext.Provider value={getQuote}></dashboardContext.Provider>
  );
};

export default DashboardProvider;
