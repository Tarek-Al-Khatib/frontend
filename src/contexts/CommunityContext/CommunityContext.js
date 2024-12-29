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

  return <CommunityContext.Provider>{children}</CommunityContext.Provider>;
};

export default CommunityProvider;
