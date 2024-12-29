import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../config/url";
import { authContext } from "../AuthContext/AuthContext";

export const CommunityContext = createContext();

const CommunityProvider = ({ children }) => {
  return <CommunityContext.Provider>{children}</CommunityContext.Provider>;
};

export default CommunityProvider;
