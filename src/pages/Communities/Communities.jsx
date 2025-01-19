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
import InviteModerator from "./Modals/InviteModeratorModal";
import { interviewContext } from "../../contexts/InterviewContext/InterviewContext";
import Hamburger from "hamburger-react";

const Communities = () => {
  const {
    communities,
    channels,
    members,
    setChannels,
    fetchChannels,
    fetchMembers,
  } = useContext(communityContext);
  const { createInterview } = useContext(interviewContext);
  const { user } = useContext(authContext);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false);
  const [flipChannel, setFlipChannel] = useState(true);
  const [flipModerators, setFlipModerators] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [inviteModal, setInviteModal] = useState(false);

  const messagesContainerRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [selectedModerator, setSelectedModerator] = useState(null);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [moderatorsData, setModeratorsData] = useState(
    members.filter((m) => m.role === "MODERATOR")
  );
  const socket = useSocket(
    channels.map((channel) => channel.id),
    selectedChannel,
    channels
  );

  useEffect(() => {
    if (selectedCommunity) {
      fetchMembers(selectedCommunity.id);
      fetchChannels(selectedCommunity.id);
    }
  }, [selectedCommunity]);

  useEffect(() => {
    setModeratorsData(members.filter((m) => m.role === "MODERATOR"));
    console.log(members);
  }, [members]);

  useEffect(() => {
    if (messages.length > 0)
      scrollToBottom(
        messagesContainerRef,
        messages[messages.length - 1].sender.username !== user.username
      );
  }, [messages]);

  useEffect(() => {
    if (socket && socket.connected) {
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
  }, [socket, selectedChannel, selectedCommunity]);

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

      const now = moment();
      const messageDisplay = {
        sender: user,
        sent_at: now,
        message: newMessage,
      };

      setChannels((prevChannels) =>
        prevChannels.map((channel) =>
          channel.id === selectedChannel.id
            ? {
                ...channel,
                chats: [...channel.chats, messageDisplay],
              }
            : channel
        )
      );

      setMessages((prevMessages) => [...prevMessages, messageDisplay]);
    }
  };

  const handleOpenInviteDiv = (index) => {
    setSelectedModerator((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCloseInvite = () => {
    setInviteModal(false);
    setSelectedModerator(null);
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
      {moderatorsData !== null &&
        moderatorsData.length > 0 &&
        selectedModerator !== null &&
        user !== null && (
          <InviteModerator
            isOpen={inviteModal}
            onClose={handleCloseInvite}
            createInterview={createInterview}
            data={{
              moderator_id: moderatorsData[selectedModerator].user_id,
              user_id: user.id,
            }}
          />
        )}
      <div className="flex w-full bg-white h-screen/92">
        <button
          className="fixed z-50 p-3 text-whiterounded-full top-28 right-4 lg:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Hamburger
            color="#4a80f1"
            toggled={isSidebarOpen}
            toggle={setIsSidebarOpen}
          />
        </button>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black opacity-50"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed top-0 left-0 z-40 h-full max-lg:flex lg:hidden bg-white transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 w-[400px]`}
        >
          <div className="flex flex-col items-center w-24 max-h-screen py-6 overflow-y-auto bg-white scrollbar-hidden ">
            <div className="flex flex-col items-center w-full ">
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
            </div>
            <div>
              <button
                onClick={handleCommunityModalToggle}
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <IoMdAdd size={25} className="text-gray-700" />
              </button>
            </div>
          </div>
          {communities && communities.length > 0 ? (
            selectedCommunity ? (
              <div className="p-6 bg-blue-900 w-80">
                <div className="flex flex-col items-center mb-8">
                  <div className="flex items-center justify-center mb-4 overflow-hidden text-base font-light text-center text-blue-300 bg-blue-900 rounded-full first-letter:h-24 w-28 h-28">
                    {selectedCommunity && selectedCommunity.community_logo ? (
                      <img
                        src={selectedCommunity.community_logo}
                        alt={`${selectedCommunity.title} logo`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span>No Logo</span>
                    )}
                  </div>

                  <div className="text-lg font-light text-white">
                    {selectedCommunity.title}
                  </div>
                </div>

                <div className="mb-10">
                  <div className="flex items-center justify-between w-full mb-3 text-lg font-bold text-white">
                    <button
                      className="flex items-center gap-2"
                      onClick={() => setFlipChannel(!flipChannel)}
                    >
                      {flipChannel ? <IoIosArrowDown /> : <IoIosArrowForward />}
                      Channels
                    </button>
                    {user ? (
                      members.some((m) => m.user_id === user.id) ? (
                        ["MODERATOR", "ADMIN"].includes(
                          members.find((m) => m.user_id === user.id)?.role
                        ) ? (
                          <button onClick={handleChannelModalToggle}>
                            <IoMdAdd size={25} />
                          </button>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <div></div>
                      )
                    ) : (
                      <div></div>
                    )}
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
                      {flipModerators ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowForward />
                      )}
                      Moderators
                    </button>
                    {flipModerators && (
                      <div className="space-y-3">
                        {moderatorsData.map((moderator, index) => (
                          <div>
                            <button
                              onClick={() => handleOpenInviteDiv(index)}
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-10 h-10 bg-white rounded-full">
                                {moderator.user &&
                                  moderator.user.profile_pic && (
                                    <img
                                      src={moderator.user.profile_pic}
                                      alt={`${moderator.user.profile_pic} profile pic`}
                                      className="object-cover w-full h-full rounded-full"
                                    />
                                  )}
                              </div>
                              <div className="text-lg font-thin text-white">
                                {moderator.user.username}
                              </div>
                            </button>
                            {selectedModerator === index && (
                              <div className="p-2 mt-2 text-white bg-gray-800 rounded shadow-lg w-fit">
                                <p>
                                  Invite {moderator.user.username} to an
                                  interview?
                                </p>
                                <div className="flex justify-end">
                                  <button
                                    className="px-2 py-1 mt-1 text-white bg-blue-600 rounded hover:bg-blue-500"
                                    onClick={() => setInviteModal(true)}
                                  >
                                    Invite
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-grow text-base font-bold text-gray-500">
                Let's start! Select a community that you like
              </div>
            )
          ) : (
            <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
              Please join a community or create a new one !
            </div>
          )}
        </div>
        <div
          className={`flex ${
            (communities && communities.length === 0) || !selectedCommunity
              ? "w-full"
              : ""
          } max-lg:hidden`}
        >
          <div className="flex flex-col items-center w-24 max-h-screen py-6 overflow-y-auto bg-white scrollbar-hidden ">
            <div className="flex flex-col items-center w-full ">
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
            </div>
            <div>
              <button
                onClick={handleCommunityModalToggle}
                className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-100"
              >
                <IoMdAdd size={25} className="text-gray-700" />
              </button>
            </div>
          </div>

          {communities && communities.length > 0 ? (
            selectedCommunity ? (
              <div className="p-6 bg-blue-900 w-80">
                <div className="flex flex-col items-center mb-8">
                  <div className="flex items-center justify-center mb-4 overflow-hidden text-base font-light text-center text-blue-300 bg-blue-900 rounded-full first-letter:h-24 w-28 h-28">
                    {selectedCommunity && selectedCommunity.community_logo ? (
                      <img
                        src={selectedCommunity.community_logo}
                        alt={`${selectedCommunity.title} logo`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span>No Logo</span>
                    )}
                  </div>

                  <div className="text-lg font-light text-white">
                    {selectedCommunity.title}
                  </div>
                </div>

                <div className="mb-10">
                  <div className="flex items-center justify-between w-full mb-3 text-lg font-bold text-white">
                    <button
                      className="flex items-center gap-2"
                      onClick={() => setFlipChannel(!flipChannel)}
                    >
                      {flipChannel ? <IoIosArrowDown /> : <IoIosArrowForward />}
                      Channels
                    </button>
                    {user ? (
                      members.some((m) => m.user_id === user.id) ? (
                        ["MODERATOR", "ADMIN"].includes(
                          members.find((m) => m.user_id === user.id)?.role
                        ) ? (
                          <button onClick={handleChannelModalToggle}>
                            <IoMdAdd size={25} />
                          </button>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <div></div>
                      )
                    ) : (
                      <div></div>
                    )}
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
                      {flipModerators ? (
                        <IoIosArrowDown />
                      ) : (
                        <IoIosArrowForward />
                      )}
                      Moderators
                    </button>
                    {flipModerators && (
                      <div className="space-y-3">
                        {moderatorsData.map((moderator, index) => (
                          <div>
                            <button
                              onClick={() => handleOpenInviteDiv(index)}
                              key={index}
                              className="flex items-center space-x-3"
                            >
                              <div className="w-10 h-10 bg-white rounded-full">
                                {moderator.user &&
                                  moderator.user.profile_pic && (
                                    <img
                                      src={moderator.user.profile_pic}
                                      alt={`${moderator.user.profile_pic} profile pic`}
                                      className="object-cover w-full h-full rounded-full"
                                    />
                                  )}
                              </div>
                              <div className="text-lg font-thin text-white">
                                {moderator.user.username}
                              </div>
                            </button>
                            {selectedModerator === index && (
                              <div className="p-2 mt-2 text-white bg-gray-800 rounded shadow-lg w-fit">
                                <p>
                                  Invite {moderator.user.username} to an
                                  interview?
                                </p>
                                <div className="flex justify-end">
                                  <button
                                    className="px-2 py-1 mt-1 text-white bg-blue-600 rounded hover:bg-blue-500"
                                    onClick={() => setInviteModal(true)}
                                  >
                                    Invite
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
                <p>Let's start! Select a community that you like</p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
              <p>Please join a community or create a new one !</p>
            </div>
          )}
        </div>
        {!selectedChannel && selectedCommunity ? (
          <div className="flex items-center justify-center flex-grow text-2xl font-bold text-gray-500">
            Please select a channel to start chatting.
          </div>
        ) : (
          selectedChannel && (
            <div className="flex flex-col flex-grow gap-4 p-6 bg-white">
              <div>
                <h1 className="mb-4 text-4xl text-navy">
                  Welcome to // {selectedChannel.name}
                </h1>
                <p className="mb-4 text-xl font-thin text-navy">
                  @{selectedChannel.creator.username} created this channel on{" "}
                  {new Date(selectedChannel.created_at).toLocaleString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}{" "}
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
                        <div className="flex items-start gap-7 max-sm:gap-3">
                          <div className="w-12 h-12">
                            {message.sender.profile_pic && (
                              <img
                                src={message.sender.profile_pic}
                                alt={`${message.sender.profile_pic} profile pic`}
                                className="object-cover w-full h-full rounded-full"
                              />
                            )}
                          </div>
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
                                {moment().diff(
                                  moment(message.sent_at),
                                  "days"
                                ) >= 2
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
          )
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Communities;
