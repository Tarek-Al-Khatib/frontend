import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export const useSocket = (channelIds = []) => {
  const socketRef = useRef(null);
  const data = localStorage.getItem("userId") || null;
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080");
    }

    if (channelIds.length > 0) {
      console.log("Joining channels", channelIds);
      channelIds.forEach((channelId) => {
        socketRef.current.emit("joinChannel", channelId);
      });
    }

    if (data) {
      console.log("Joining user room for notifications");
      if (data.userId) {
        socketRef.current.emit("joinUserRoom", data.userId);
      }
    }
    return () => {
      if (channelIds.length > 0) {
        console.log("Leaving channels", channelIds);
        channelIds.forEach((channelId) => {
          socketRef.current.emit("leaveChannel", channelId);
        });
      }
    };
  }, [channelIds]);

  return socketRef.current;
};
