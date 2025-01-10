import { createContext, useEffect, useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const chat = async (message) => {
    setLoading(true);
    const response = await axios.get(
      `${serverUrl}/api/ai/interview`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
      { message }
    );
    console.log(response.data);
    setMessage(response.data.messages);
    setLoading(false);
  };

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        isUserInteracted,
        setIsUserInteracted,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
