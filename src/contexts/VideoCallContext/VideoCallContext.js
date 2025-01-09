import React, { createContext, useContext, useEffect, useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";

export const videoContext = createContext();
const VideoProvider = ({ children }) => {
  return <videoContext.Provider>{children}</videoContext.Provider>;
};

export default VideoProvider;
