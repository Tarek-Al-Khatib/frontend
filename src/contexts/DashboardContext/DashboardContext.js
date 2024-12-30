import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const dashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  return <dashboardContext.Provider></dashboardContext.Provider>;
};

export default DashboardProvider;
