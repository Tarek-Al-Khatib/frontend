import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Communities.css";
import { IoMdAdd } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const Communities = () => {
  const communitiesData = [
    {
      id: 1,
      name: "Community 1",
      logo: "Logo 1",
      description: "Description of Community 1",
    },
    {
      id: 2,
      name: "Community 2",
      logo: "Logo 2",
      description: "Description of Community 2",
    },
    {
      id: 3,
      name: "Community 3",
      logo: "Logo 3",
      description: "Description of Community 3",
    },
  ];

  const channelsData = [
    { name: "general", unread: 1 },
    { name: "announcements", unread: 1 },
    { name: "projects", unread: 1 },
    { name: "q/a", unread: 1 },
    { name: "discussion", unread: 1 },
  ];

  const moderatorsData = [
    { name: "Moderator 1" },
    { name: "Moderator 2" },
    { name: "Moderator 3" },
    { name: "Moderator 4" },
  ];

  const messagesData = [
    {
      name: "User 1",
      badge: "Newbie",
      timestamp: "17-8-2024 7:42 PM",
      message: "Hello Everyone! I'm so excited to start learning today!",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
    {
      name: "User 2",
      badge: "Learner",
      timestamp: "17-8-2024 7:45 PM",
      message: "Me too! By the way, where are you from?",
    },
  ];

  const [selectedCommunity, setSelectedCommunity] = useState(
    communitiesData[0]
  );
  const messagesContainerRef = useRef(null);
  const [messages, setMessages] = useState(messagesData);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    if (messages[messages.length - 1].name === "You") scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  const parseTimestamp = (timestamp) => new Date(timestamp).getTime();

  const getMessageDuration = (prevTimestamp, currentTimestamp) => {
    const prevTime = parseTimestamp(prevTimestamp);
    const currentTime = parseTimestamp(currentTimestamp);
    return (currentTime - prevTime) / 60000;
  };

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
  };

  const handleMessageSend = () => {
    if (messageInput.trim()) {
      const newMessage = {
        name: "You",
        badge: "Learner",
        timestamp: new Date().toLocaleString(),
        message: messageInput.trim(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput("");
    }
  };

  const renderMessages = () => {
    const combinedMessages = [];
    messages.forEach((currentMessage, index) => {
      const previousMessage = messages[index - 1];
      if (
        previousMessage &&
        previousMessage.name === currentMessage.name &&
        getMessageDuration(
          previousMessage.timestamp,
          currentMessage.timestamp
        ) < 5
      ) {
        combinedMessages[
          combinedMessages.length - 1
        ].message += `<br />${currentMessage.message}`;
      } else {
        combinedMessages.push({ ...currentMessage });
      }
    });
    return combinedMessages;
  };

  const messagesToRender = renderMessages();

  return (
    <div>
      <Navbar />
      <div className="flex w-full bg-white h-screen/92">
        <div className="flex flex-col items-center w-24 py-6 bg-white">
          {communitiesData.map((community) => (
            <button
              key={community.id}
              className="w-20 h-20 mb-5 rounded-full bg-navy"
              onClick={() => handleCommunitySelect(community)}
            >
              <span className="text-white">{community.logo}</span>
            </button>
          ))}
          <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
            <IoMdAdd size={25} />
          </button>
        </div>
        <div className="p-6 bg-blue-900 w-80">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center h-24 mb-4 text-base font-light text-center text-blue-300 bg-blue-900 rounded w-28">
              {selectedCommunity.logo}
            </div>
            <div className="text-lg font-light text-white">
              {selectedCommunity.name}
            </div>
          </div>

          <div className="mb-10">
            <hutton className="flex items-center mb-3 text-lg font-bold text-white">
              <IoIosArrowForward />
              <IoIosArrowDown />
              Channels
            </hutton>
            <div className="flex flex-col">
              {channelsData.map((channel, index) => (
                <button
                  key={index}
                  className="flex items-center justify-between w-full px-3 py-3 font-bold text-white bg-transparent rounded hover:bg-blue-700/30 text-start"
                >
                  // {channel.name}
                  {channel.unread > 0 && (
                    <div className="flex items-center justify-center w-5 h-5 text-xs bg-blue-600 rounded-full">
                      {channel.unread}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <hutton className="flex items-center mb-3 text-lg font-bold text-white">
              <IoIosArrowForward />
              <IoIosArrowDown />
              Moderators
            </hutton>
            <div className="space-y-3">
              {moderatorsData.map((moderator, index) => (
                <button key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-white rounded"></div>
                  <div className="text-sm font-thin text-white">
                    {moderator.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow gap-4 p-6 bg-white">
          <div>
            <h1 className="mb-4 text-4xl text-navy">Welcome to //general</h1>
            <p className="mb-4 text-xl font-thin text-navy">
              @Admin created this channel on 17/07/2024: Channel description
              (not more than 250 chars)
            </p>
            <hr className="mb-6 border-t border-blue-900" />
          </div>
          <div
            ref={messagesContainerRef}
            className="flex flex-col flex-grow gap-5 overflow-y-auto scroll-container custom-scrollbar scroll-smooth"
          >
            <div className="flex flex-col flex-grow gap-5 ">
              {messagesToRender.map((message, index) => (
                <div key={index}>
                  <div className="flex items-start gap-7">
                    <div className="w-12 h-12 bg-blue-900 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-6 w-fit">
                        <div className="text-sm font-bold text-blue-900">
                          {message.name}
                        </div>
                        <div className="px-2 py-1 text-xs text-white bg-blue-900 rounded">
                          {message.badge}
                        </div>
                        <div className="text-sm text-blue-900">
                          {message.timestamp}
                        </div>
                      </div>
                      <p
                        className="text-base text-black"
                        dangerouslySetInnerHTML={{ __html: message.message }}
                      ></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6 p-4 bg-slight-gray rounded-self">
            <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
              <IoMdAdd size={25} className="text-navy" />
            </button>
            <input
              type="text"
              className="flex-1 text-xl placeholder-gray-400 bg-transparent outline-none"
              placeholder="Type your message here for //general"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleMessageSend();
                }
              }}
            />
            <button
              className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg"
              onClick={handleMessageSend}
            >
              <FiSend size={25} className="text-navy" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Communities;
