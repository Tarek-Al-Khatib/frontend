import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config/url";
import { authContext } from "../AuthContext/AuthContext";

export const communityContext = createContext();

const CommunityProvider = ({ children }) => {
  const [communities, setCommunities] = useState([]);
  const [channels, setChannels] = useState([]);
  const [members, setMembers] = useState([]);
  const { user, token } = useContext(authContext);

  useEffect(() => {
    if (user && token) fetchUserCommunities();
  }, [user, token]);

  const fetchUserCommunities = async () => {
    try {
      const response = await axios.get(
        `${serverUrl}/api/community/${user.id}/communities`,
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
            "Content-Type": "multipart/form-data",
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
      const data = new FormData();
      data.append("title", communityData.title);
      data.append("description", communityData.description);
      if (communityData.community_logo) {
        data.append("community_logo", communityData.community_logo);
      }
      if (communityData.community_logo) {
        data.append("community_banner", communityData.community_banner);
      }

      console.log(data);
      const response = await axios.post(`${serverUrl}/api/community/`, data, {
        headers: {
          "Context-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setCommunities((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  const createChannel = async (communityId, channelData) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/community/${communityId}/channels`,
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

      return response;
    } catch (error) {
      console.error("Error joining community:", error);
    }
  };

  return (
    <communityContext.Provider
      value={{
        communities,
        channels,
        members,
        setChannels,
        fetchUserCommunities,
        fetchChannels,
        fetchMembers,
        createCommunity,
        createChannel,
        joinCommunity,
      }}
    >
      {children}
    </communityContext.Provider>
  );
};

export default CommunityProvider;
