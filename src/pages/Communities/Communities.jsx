import React, { useContext, useEffect, useRef, useState } from "react";
import "../../css/colors.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Communities.css";
import { IoMdAdd } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { scrollToBottom, renderMessages } from "./utils";
import { communityContext } from "../../contexts/CommunityContext/CommunityContext";
import CreateCommunity from "./Modals/CreateCommunityModal";
import CreateChannel from "./Modals/CreateChannelModal";
import { useSocket } from "../../utils/useSocket";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import moment from "moment";

const Communities = () => {
  const {
    communities,
    channels,
    members,
    setChannels,
    fetchChannels,
    fetchMembers,
  } = useContext(communityContext);
  const { user } = useContext(authContext);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [flipChannel, setFlipChannel] = useState(true);
  const [flipModerators, setFlipModerators] = useState(true);

  const messagesContainerRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [selectedCommunity, setSelectedCommunity] = useState(communities[0]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [moderatorsData, setModeratorsData] = useState(
    members.filter((m) => m.role === "MODERATOR")
  );
  const socket = useSocket(channels.map((channel) => channel.id));

  useEffect(() => {
    if (selectedCommunity) {
      fetchMembers(selectedCommunity.id);
      fetchChannels(selectedCommunity.id);
    }
  }, [selectedCommunity]);

  useEffect(() => {
    setModeratorsData(members.filter((m) => m.role === "MODERATOR"));
  }, [members]);

  useEffect(() => {
    if (messages.length > 0)
      scrollToBottom(
        messagesContainerRef,
        messages[messages.length - 1].sender.username !== user.username
      );
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (newMessage) => {
        console.log("Received something");
        if (selectedChannel?.id !== newMessage.channel_id) {
          setChannels((prevChannels) => {
            return prevChannels.map((channel) => {
              if (channel.id === newMessage.channel_id) {
                return {
                  ...channel,
                  unread: channel.unread ? channel.unread + 1 : 1,
                  chats: [...channel.chats, newMessage],
                };
              }
              return channel;
            });
          });
        } else {
          setChannels((prevChannels) => {
            return prevChannels.map((channel) => {
              if (channel.id === selectedChannel.id) {
                return {
                  ...channel,
                  chats: [...channel.chats, newMessage],
                };
              }
              return channel;
            });
          });
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, selectedChannel]);

  const handleCommunitySelect = (community) => {
    setSelectedCommunity(community);
    setSelectedChannel(null);
    setMessages([]);
  };

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setMessages(channel.chats);
    setChannels((prevChannels) => {
      return prevChannels.map((ch) =>
        ch.id === channel.id ? { ...ch, unread: 0 } : ch
      );
    });
  };

  const handleCommunityModalToggle = () => {
    setIsCommunityModalOpen((prev) => !prev);
  };

  const handleChannelModalToggle = () => {
    setIsChannelModalOpen((prev) => !prev);
  };

  const handleMessageSend = () => {
    if (messageInput.trim()) {
      const newMessage = messageInput.trim();
      socket.emit("sendMessage", {
        messageContent: newMessage,
        channelId: selectedChannel.id,
        userId: user.id,
      });
      setMessageInput("");
    }
  };

  const messagesToRender = renderMessages(messages);

  return (
    <div>
      <Navbar />
      <CreateCommunity
        isOpen={isCommunityModalOpen}
        onClose={handleCommunityModalToggle}
      />
      <CreateChannel
        isOpen={isChannelModalOpen}
        onClose={handleChannelModalToggle}
        communityId={selectedCommunity ? selectedCommunity.id : null}
      />
      <div className="flex w-full bg-white h-screen/92">
        <div className="flex flex-col items-center w-24 py-6 bg-white">
          {communities.map((community) => (
            <button
              key={community.id}
              className="flex items-center justify-center w-20 h-20 mb-5 overflow-hidden rounded-full bg-navy"
              onClick={() => handleCommunitySelect(community)}
            >
              {community.community_logo ? (
                <img
                  src={community.community_logo}
                  alt={`${community.title} logo`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-sm text-white">No Logo</span>
              )}
            </button>
          ))}
          <button
            onClick={handleCommunityModalToggle}
            className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg"
          >
            <IoMdAdd size={25} />
          </button>
        </div>
        {selectedCommunity ? (
          <div className="p-6 bg-blue-900 w-80">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center justify-center h-24 mb-4 text-base font-light text-center text-blue-300 bg-blue-900 rounded w-28">
                {selectedCommunity ? selectedCommunity.logo : ""}
              </div>
              <div className="text-lg font-light text-white">
                {selectedCommunity.title}
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center justify-between w-full mb-3 text-lg font-bold text-white">
                <button
                  className="flex items-center"
                  onClick={() => setFlipChannel(!flipChannel)}
                >
                  {flipChannel ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  Channels
                </button>
                <button onClick={handleChannelModalToggle}>
                  <IoMdAdd size={25} />
                </button>
              </div>
              {flipChannel && (
                <div className="flex flex-col">
                  {channels.map((channel, index) => (
                    <button
                      key={index}
                      className={`flex items-center justify-between w-full px-3 py-3 font-bold text-white bg-transparent rounded text-start ${
                        selectedChannel != null &&
                        channel.id === selectedChannel.id
                          ? "bg-dark-blue"
                          : "hover:bg-blue-700/30"
                      }`}
                      onClick={() => handleChannelSelect(channel)}
                    >
                      {channel.name}
                      {channel.unread > 0 && (
                        <div className="flex items-center justify-center w-5 h-5 text-xs bg-blue-600 rounded-full">
                          {channel.unread}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {moderatorsData.length > 0 && (
              <div>
                <button
                  onClick={() => setFlipModerators(!flipModerators)}
                  className="flex items-center mb-3 text-lg font-bold text-white"
                >
                  {flipModerators ? <IoIosArrowDown /> : <IoIosArrowForward />}
                  Moderators
                </button>
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
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
            Please join a community or create a new one !
          </div>
        )}

        {selectedChannel ? (
          <div className="flex flex-col flex-grow gap-4 p-6 bg-white">
            <div>
              <h1 className="mb-4 text-4xl text-navy">
                Welcome to // {selectedChannel.name}
              </h1>
              <p className="mb-4 text-xl font-thin text-navy">
                @{selectedChannel.creator.username} created this channel on{" "}
                {new Date(selectedChannel.created_at).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                : {selectedChannel.description}
              </p>
              <hr className="mb-6 border-t border-blue-900" />
            </div>
            <div
              ref={messagesContainerRef}
              className="flex flex-col flex-grow gap-5 overflow-y-auto scroll-container custom-scrollbar scroll-smooth"
            >
              <div className="flex flex-col flex-grow gap-5 ">
                {messagesToRender.length > 0 ? (
                  messagesToRender.map((message, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-7">
                        <div className="w-12 h-12 bg-blue-900 rounded-full"></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 w-fit">
                            <div className="text-sm font-bold text-blue-900">
                              {message.sender.username}
                            </div>
                            <div className="px-2 py-1 text-xs text-white bg-blue-900 rounded">
                              {
                                members.find(
                                  (member) =>
                                    member.user_id === message.sender.id
                                ).role
                              }
                            </div>
                            <div className="text-sm text-blue-900">
                              {moment().diff(moment(message.sent_at), "days") >=
                              2
                                ? moment(message.sent_at).format(
                                    "MMM Do, YYYY, h:mm A"
                                  )
                                : moment(message.sent_at).fromNow()}
                            </div>
                          </div>
                          <p
                            className="text-base text-black break-all whitespace-normal"
                            dangerouslySetInnerHTML={{
                              __html: message.message,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
                    No Messages to show here
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-6 p-4 bg-slight-gray rounded-self">
              <button className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg">
                <IoMdAdd size={25} className="text-navy" />
              </button>
              <input
                type="text"
                className="flex-1 text-xl placeholder-gray-400 bg-transparent outline-none"
                placeholder={
                  "Type your message here for // " + selectedChannel.name
                }
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
                }}
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
        ) : (
          <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
            Please select a channel to start chatting.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Communities;
