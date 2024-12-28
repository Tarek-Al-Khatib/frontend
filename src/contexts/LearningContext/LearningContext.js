import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";

export const learningContext = createContext();

const LearningProvider = ({ children }) => {
  const [learningPlans, setLearningPlans] = useState([]);

  const fetchPlans = async () => {};

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
