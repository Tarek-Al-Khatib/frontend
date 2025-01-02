import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export const useSocket = (channelIds = []) => {
  const socketRef = useRef(null);

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
