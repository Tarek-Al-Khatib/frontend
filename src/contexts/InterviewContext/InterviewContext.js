import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const interviewContext = createContext();

const InterviewProvider = ({ children }) => {
  return <interviewContext.Provider>{children}</interviewContext.Provider>;
};

export default InterviewProvider;
