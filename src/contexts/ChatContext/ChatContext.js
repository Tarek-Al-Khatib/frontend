import { createContext, useEffect, useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [startChatting, setStartChatting] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    return () => {
      setMessage(null);
      setAllMessages(null);
      setMessages(null);
      setLoading(false);
      setIsUserInteracted(false);
    };
  }, []);

  useEffect(() => {
    if (startChatting) {
      chat(allMessages);
    }
  }, [startChatting]);

  const chat = async (messages) => {
    if (!messages) {
      return;
    }
    setLoading(true);
    const response = await axios.post(
      `${serverUrl}/api/ai/interview`,
      { messages: messages },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    const messageResponse = response.data.messageResponse;
    console.log(messageResponse);
    setMessage(messageResponse.content);
    setMessages([...messages, messageResponse.content]);
    setAllMessages([
      ...allMessages,
      {
        role: messageResponse.role,
        content: messageResponse.content.text,
      },
    ]);
    setUserInput(null);
    setStartChatting(false);
    setLoading(false);
  };

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
    setMessage(null);
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        isUserInteracted,
        setIsUserInteracted,
        setUserInput,
        userInput,
        allMessages,
        setAllMessages,
        setStartChatting,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
