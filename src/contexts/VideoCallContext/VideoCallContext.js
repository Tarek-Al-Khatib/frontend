import React, { createContext, useEffect, useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";

export const videoContext = createContext();
const VideoProvider = ({ children }) => {
  const [interview, setInterview] = useState(null);
  const [roomId, setRoomId] = useState(null);
  useEffect(() => {
    if (interview) {
      setRoomId(
        `${interview.id}-${
          interview.moderator.id
        }${interview.moderator.username.substr(0, 3)}-${
          interview.user.id
        }${interview.user.username.substr(0, 3)}`
      );
    }
  }, [interview]);

  const fetchRoom = async (token) => {
    const domain = `https://workwise.daily.co/`;
    try {
      const response = await axios.get(
        `${serverUrl}/api/meeting/interview-mod/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response);
      if (response.status === 200) {
        return `${domain}${roomId}`;
      }
    } catch (error) {
      console.log("Error fetching room: ", error);
      return null;
    }
  };
  return (
    <videoContext.Provider
      value={{ roomId, setRoomId, setInterview, fetchRoom }}
    >
      {children}
    </videoContext.Provider>
  );
};

export default VideoProvider;
