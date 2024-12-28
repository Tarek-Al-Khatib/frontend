import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchPlans = async () => {};

  const addPlan = async () => {};

  return (
    <authContext.Provider
      value={{
        user,
        userId: user.id,
        fetchPlans,
        addPlan,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
