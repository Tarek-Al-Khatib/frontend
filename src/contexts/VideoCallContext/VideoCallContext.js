import React, { createContext, useContext, useEffect, useState } from "react";
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
      const response = await axios.post(
        `${serverUrl}/api/meeting/interview-mod/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response);
      if (response.status === 200) {
        return `window.DailyIframe.createFrame({
            iframeStyle: {
              position: "relative",
              width: "100%",
              height: "100%",
              border: "0",
              zIndex: 9999
            },
            showLeaveButton: true,
            showFullscreenButton: true,
          }).join({
            url: "${domain}${roomId}",
          });`;
      }
    } catch (error) {
      console.log("Error fetching room: ", error);
      return null;
    }
  };
  return (
    <videoContext.Provider value={{ roomId, setInterview, fetchRoom }}>
      {children}
    </videoContext.Provider>
  );
};

export default VideoProvider;
