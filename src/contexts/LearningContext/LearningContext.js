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

  const addPlan = async (planData, steps) => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/learning/${user.id}`,
        { planData, steps },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newPlan = response.data.plan;
      setLearningPlans((prevPlans) => [...prevPlans, newPlan]);
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  const updatePlan = async (planId, planData, steps) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/learning/${planId}`,
        { planData, steps },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPlan = response.data.plan;

      setLearningPlans((prevPlans) =>
        prevPlans.map((plan) =>
          plan.id === planId ? { ...plan, ...updatedPlan } : plan
        )
      );
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

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
