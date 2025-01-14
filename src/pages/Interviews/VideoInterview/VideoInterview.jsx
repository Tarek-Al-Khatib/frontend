import React, { useContext, useEffect, useState } from "react";
import { videoContext } from "../../../contexts/VideoCallContext/VideoCallContext";
import { useNavigate } from "react-router-dom";

const VideoInterview = () => {
  const { roomId, fetchRoom, setRoomId, setInterview } =
    useContext(videoContext);
  const navigate = useNavigate();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const token = localStorage.getItem("token");
  let iframe = null;

  useEffect(() => {
    const loadDailyIframe = async () => {
      if (!window.DailyIframe) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@daily-co/daily-js";
        script.async = true;
        script.id = "meeting-script";
        script.onload = () => {
          console.log("DailyIframe SDK loaded");
          setScriptsLoaded(true);
        };
        document.body.appendChild(script);
      } else {
        setScriptsLoaded(true);
      }
    };

    loadDailyIframe();

    return () => {
      const script = document.getElementById("meeting-script");
      if (script) {
        document.body.removeChild(script);
      }
      if (iframe) {
        iframe.destroy();
      }
      setScriptsLoaded(false);
      setRoomId(null);
      setInterview(null);
    };
  }, []);

  useEffect(() => {
    const startInterview = async () => {
      try {
        const roomUrl = await fetchRoom(token);
        if (roomUrl && window.DailyIframe) {
          iframe = window.DailyIframe.createFrame({
            iframeStyle: {
              position: "absolute",
              top: "0",
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
            setRoomId(null);
            setInterview(null);
            navigate("/interview");
          });

          iframe.join({ url: roomUrl });
        } else {
          console.error("DailyIframe is not available or room URL is invalid.");
        }
      } catch (error) {
        console.error("Error starting the interview:", error);
      }
    };

    if (roomId && scriptsLoaded) {
      startInterview();
    }

    return () => {
      if (iframe) {
        iframe.destroy();
        iframe = null;
      }
    };
  }, [roomId, scriptsLoaded]);

  return (
    <div
      id="video-interview-container"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default VideoInterview;
