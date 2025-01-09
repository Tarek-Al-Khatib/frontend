import React, { useContext, useEffect, useState } from "react";
import { videoContext } from "../../../contexts/VideoCallContext/VideoCallContext";
import { useNavigate } from "react-router-dom";

const VideoInterview = () => {
  const { roomId, fetchRoom, setRoomId, setInterview } =
    useContext(videoContext);
  const navigate = useNavigate();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadDailyIframe = async () => {
      if (!window.DailyIframe) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@daily-co/daily-js";
        script.async = true;
        script.onload = () => console.log("DailyIframe SDK loaded");
        document.body.appendChild(script);
      }
      setScriptsLoaded(true);
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
        iframe.on("left-meeting", () => {
          iframe.destroy();
          setScriptsLoaded(false);
          setRoomId(null);
          setInterview(null);
          navigate("/interview");
        });
        iframe.join({ url: roomUrl });
      } else {
        console.error("DailyIframe is not available or room URL is invalid.");
      }
    };
    if (roomId && scriptsLoaded) {
      startInterview();
    }
  }, [roomId, scriptsLoaded]);
  return <div></div>;
};

export default VideoInterview;
