import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const interviewContext = createContext();

const InterviewProvider = ({ children }) => {
  const [userInterviews, setUserInterviews] = useState([]);
  const [interviewInvitations, setInterviewInvitations] = useState([]);

  const fetchInterviews = async (token) => {
    try {
      const response = await axios.get(`${serverUrl}/api/interviews/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInterviews(response.data);
    } catch (error) {
      console.log("Error fetching user interviews: ", error);
    }
  };

  const fetchInvitations = async (token) => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/interviews/invitations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInterviewInvitations(response.data);
    } catch (error) {
      console.log("Error fetching invitations: ", error);
    }
  };

  return <interviewContext.Provider>{children}</interviewContext.Provider>;
};

export default InterviewProvider;
