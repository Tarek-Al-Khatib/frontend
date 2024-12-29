import React, { createContext, useContext } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const learningContext = createContext();

const LearningProvider = ({ children }) => {
  const [learningPlans, setLearningPlans] = useState([]);
  const { user, token } = useContext(authContext);

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/learning/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLearningPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const addPlan = async () => {};

  const updatePlan = async () => {};

  const markPlanAsDone = async () => {};

  const markStepAsDone = async () => {};

  return (
    <learningContext.Provider
      value={{
        learningPlans,
        fetchPlans,
        addPlan,
        updatePlan,
        markPlanAsDone,
        markStepAsDone,
      }}
    >
      {children}
    </learningContext.Provider>
  );
};

export default LearningProvider;
