import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { videoContext } from "../VideoCallContext/VideoCallContext";

export const interviewContext = createContext();

const InterviewProvider = ({ children }) => {
  const [userInterviews, setUserInterviews] = useState([]);
  const [interviewInvitations, setInterviewInvitations] = useState([]);
  const [token] = useState(localStorage.getItem("token"));
  const [isVideoCompleted, setIsVideoCompleted] = useState(false);
  const [shareFeedback, setShareFeedback] = useState(false);
  const { interview } = useContext(videoContext);

  const handleOpenIsCompleted = () => {
    setIsVideoCompleted(true);
  };

  const handleCloseIsCompleted = () => {
    setIsVideoCompleted(false);
  };

  const fetchInterviews = async (token) => {
    try {
      const response = await axios.get(`${serverUrl}/api/interviews`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInterviews(response.data.data);
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

      setInterviewInvitations(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error fetching invitations: ", error);
    }
  };

  const createInterview = async (interviewData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/interviews`,
        interviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response);
    } catch (error) {
      console.log("Error creating interview: ", error);
    }
  };

  const updateInterview = async (interviewData) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/interviews/${interview.id}`,
        interviewData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
    } catch (error) {
      console.log(`Error updating interview with id ${interview.id}:`, error);
    }
  };

  const updateStatus = async (interviewId, status) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/interviews/${interviewId}/status`,
        { status: status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      fetchInvitations(token);
    } catch (error) {
      console.log(`Error updating interview with id ${interviewId}:`, error);
    }
  };

  return (
    <interviewContext.Provider
      value={{
        userInterviews,
        interviewInvitations,
        fetchInterviews,
        fetchInvitations,
        createInterview,
        updateInterview,
        updateStatus,
        isVideoCompleted,
        setIsVideoCompleted,
        handleOpenIsCompleted,
        handleCloseIsCompleted,
        shareFeedback,
        setShareFeedback,
      }}
    >
      {children}
    </interviewContext.Provider>
  );
};

export default InterviewProvider;
