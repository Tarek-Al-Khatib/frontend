import React, { useState } from "react";
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
  ];

  const [selectedCommunity, setSelectedCommunity] = useState(
    communitiesData[0]
  );
  const [messages, setMessages] = useState(messagesData);
  const [messageInput, setMessageInput] = useState("");

  const parseTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.getTime();
  };

  const getMessageDuration = (prevTimestamp, currentTimestamp) => {
    const prevTime = parseTimestamp(prevTimestamp);
    const currentTime = parseTimestamp(currentTimestamp);
    return (currentTime - prevTime) / 60000;
  };

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
  };

  const renderMessages = () => {
    const combinedMessages = [];

    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      const previousMessage = messages[i - 1];

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
        combinedMessages.push(currentMessage);
      }
    }

    return combinedMessages;
  };

  const handleMessageSend = () => {
    if (messageInput.trim()) {
      const newMessage = {
        name: "You",
        badge: "Learner",
        timestamp: new Date().toLocaleString(),
        message: messageInput,
      };
      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };
  return (
    <div>
      <Navbar />
      <div class="flex bg-white w-full h-screen/92">
        <div class="w-24 bg-white flex flex-col items-center py-6">
          {communitiesData.map((community) => (
            <button
              key={community.id}
              className="w-20 h-20 mb-5 rounded-full bg-navy"
              onClick={() => handleCommunitySelect(community)}
            >
              <span className="text-white">{community.logo}</span>
            </button>
          ))}
          <button class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <IoMdAdd size={25} />
          </button>
        </div>
        <div class="w-80 bg-blue-900 p-6">
          <div class="flex flex-col items-center mb-8">
            <div class="w-28 h-24 bg-blue-900 rounded mb-4 flex items-center justify-center text-center text-blue-300 text-base font-light">
              {selectedCommunity.logo}
            </div>
            <div class="text-white text-lg font-light">
              {selectedCommunity.name}
            </div>
          </div>

          <div class="mb-10">
            <hutton class="text-white text-lg font-bold mb-3 flex items-center">
              <IoIosArrowForward />
              <IoIosArrowDown />
              Channels
            </hutton>
            <div class="flex flex-col">
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
            <hutton class="text-white text-lg font-bold mb-3 flex items-center">
              <IoIosArrowForward />
              <IoIosArrowDown />
              Moderators
            </hutton>
            <div class="space-y-3">
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

        <div class="flex flex-col flex-grow bg-white p-6">
          <div>
            <h1 class="text-4xl text-navy mb-4">Welcome to //general</h1>
            <p class="text-xl text-navy mb-4 font-thin">
              @Admin created this channel on 17/07/2024: Channel description
              (not more than 250 chars)
            </p>
            <hr class="border-t border-blue-900 mb-6" />
          </div>
          <div className="flex flex-col flex-grow gap-5">
            {messages.map((message, index) => (
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
                    <p className="text-base text-black">{message.message}</p>
                  </div>
                </div>
              </div>
            ))}
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
