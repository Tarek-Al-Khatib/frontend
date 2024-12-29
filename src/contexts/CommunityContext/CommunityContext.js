import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config/url";
import { authContext } from "../AuthContext/AuthContext";

export const CommunityContext = createContext();

const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);
  const [channels, setChannels] = useState([]);
  const [members, setMembers] = useState([]);
  const { user, token } = useContext(authContext);

  const fetchUserCommunities = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/community/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommunities(response.data);
    } catch (error) {
      console.error("Error fetching user communities:", error);
    }
  };

  const fetchChannels = async (communityId) => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/community/${communityId}/channels`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChannels(response.data);
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };

  const fetchMembers = async (communityId) => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/community/${communityId}/members`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const createCommunity = async (communityData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/community/${user.id}`,
        communityData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommunities((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  const createChannel = async (communityId, channelData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/communities/${user.id}/${communityId}/channels`,
        channelData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setChannels((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  };

  const joinCommunity = async (communityId, role = "USER") => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/communities/${user.id}/${communityId}/join`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  return (
    <CommunityContext.Provider
      value={{
        communities,
        channels,
        members,
        fetchUserCommunities,
        fetchChannels,
        fetchMembers,
        createCommunity,
        createChannel,
        joinCommunity,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export default CommunityProvider;
