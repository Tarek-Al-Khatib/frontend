import React, { createContext } from "react";
import { useContext, useState } from "react";

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
