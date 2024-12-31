import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

export const useSocket = (channelId) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:8080");
    }

    if (channelId) {
      console.log("Joined channel", channelId);
      socketRef.current.emit("joinChannel", channelId);
    }

    return () => {
      if (channelId) {
        console.log("Leaving channel", channelId);
        socketRef.current.emit("leaveChannel", channelId);
      }
    };
  }, [channelId]);

  return socketRef.current;
};
