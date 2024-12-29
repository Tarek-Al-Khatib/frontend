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
        `${serverUrl}/api/communities/${user.id}`,
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
        `${serverUrl}/api/communities/${communityId}/channels`,
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

  return <CommunityContext.Provider>{children}</CommunityContext.Provider>;
};

export default CommunityProvider;
