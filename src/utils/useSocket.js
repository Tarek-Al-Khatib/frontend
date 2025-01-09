import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export const useSocket = (channelIds = [], selectedChannel, channels) => {
  const socketRef = useRef(null);
  const userId = localStorage.getItem("userId") || null;

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080");
    }
    if (userId) {
      console.log("Joining user room for notifications");
      socketRef.current.emit("joinUserRoom", userId);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("leaveUserRoom", userId);
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (channelIds.length > 0) {
      console.log("Joining channels", channelIds);
      channelIds.forEach((channelId) => {
        socketRef.current.emit("joinChannel", channelId);
      });
    }

    return () => {
      if (channelIds.length > 0) {
        console.log("Leaving channels", channelIds);
        channelIds.forEach((channelId) => {
          socketRef.current.emit("leaveChannel", channelId);
        });
      }
    };
  }, [selectedChannel, channels]);

  return socketRef.current;
};
