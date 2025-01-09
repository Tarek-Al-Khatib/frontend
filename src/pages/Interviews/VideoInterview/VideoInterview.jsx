import React, { useContext, useEffect, useState } from "react";
import { videoContext } from "../../../contexts/VideoCallContext/VideoCallContext";

const VideoInterview = () => {
  const { roomId, fetchRoom } = useContext(videoContext);
  const token = localStorage.getItem("token");
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    const loadDailyIframe = async () => {
      if (!window.DailyIframe) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@daily-co/daily-js";
        script.async = true;
        script.onload = () => console.log("DailyIframe SDK loaded");
        document.body.appendChild(script);
      }
    };
    loadDailyIframe();
  }, []);

  useEffect(() => {
    const startInterview = async () => {
      const roomUrl = await fetchRoom(token);
      if (roomUrl && window.DailyIframe) {
        const iframe = window.DailyIframe.createFrame({
          iframeStyle: {
            position: "relative",
            width: "100%",
            height: "100%",
            border: "0",
            zIndex: 9999,
          },
          showLeaveButton: true,
          showFullscreenButton: true,
        });
        iframe.join({ url: roomUrl });
      } else {
        console.error("DailyIframe is not available or room URL is invalid.");
      }
    };
    if (roomId) {
      startInterview();
    }
  }, [roomId]);
  return <div></div>;
};

export default VideoInterview;
