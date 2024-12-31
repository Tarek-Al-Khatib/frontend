import { io } from "socket.io-client";
import { useEffect, useRef } from "react";

const socket = io("http://localhost:1738");

export const useSocket = (channelId) => {
  const socketRef = useRef(socket);

  useEffect(() => {
    if (channelId) {
      socketRef.current.emit("joinChannel", channelId);
    }

    return () => {
      socketRef.current.disconnect();
    };
  }, [channelId]);

  return socketRef.current;
};
