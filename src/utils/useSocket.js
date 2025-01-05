import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export const useSocket = (channelIds = []) => {
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
  }, []);

  return socketRef.current;
};
