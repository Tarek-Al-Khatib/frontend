import React, { useContext, useEffect } from "react";
import { videoContext } from "../../../contexts/VideoCallContext/VideoCallContext";

const VideoInterview = () => {
  const { roomId, fetchRoom } = useContext(videoContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (roomId) {
      const script = document.createElement("script");
      script.innerHTML = fetchRoom(token);
      document.body.appendChild(script);
    }
  }, [roomId]);
  return <div></div>;
};

export default VideoInterview;
