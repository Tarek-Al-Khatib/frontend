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

  return <videoContext.Provider>{children}</videoContext.Provider>;
};

export default VideoProvider;
