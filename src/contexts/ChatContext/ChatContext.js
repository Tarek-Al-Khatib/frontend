import { createContext, useContext, useEffect, useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { interviewContext } from "../InterviewContext/InterviewContext";
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [allMessages, setAllMessages] = useState([]);
  const [userInput, setUserInput] = useState(null);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [startChatting, setStartChatting] = useState(false);
  const [ended, setEnded] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { fetchInterviews, speciality, characteristics, voiceId } =
    useContext(interviewContext);

  useEffect(() => {
    return () => {
      setMessage(null);
      setAllMessages(null);
      setMessages(null);
      setLoading(false);
      setEnded(false);
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
      {
        messages: messages,
        speciality: speciality,
        characteristics: characteristics,
        voiceId: voiceId,
      },
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

    if (messageResponse.content.isCompleted === true) {
      setEnded(true);
    }
  };

  const complete = async () => {
    if (!allMessages) {
      return;
    }
    const response = await axios.post(
      `${serverUrl}/api/ai/completed`,
      { messages: allMessages },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    fetchInterviews(token);
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
        setLoading,
        setUserInput,
        userInput,
        allMessages,
        setAllMessages,
        setStartChatting,
        ended,
        complete,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
