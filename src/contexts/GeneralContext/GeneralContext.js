import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const generalContext = createContext();

const GeneralProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const { user, token } = useContext(authContext);

  useEffect(() => {}, []);

  return <generalContext.Provider>{children}</generalContext.Provider>;
};

export default GeneralProvider;
