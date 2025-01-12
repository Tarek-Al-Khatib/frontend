import React, { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { serverUrl } from "../../config/url";
import axios from "axios";
import { authContext } from "../AuthContext/AuthContext";

export const learningContext = createContext();

const LearningProvider = ({ children }) => {
  const [learningPlans, setLearningPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useContext(authContext);

  const [learningPlan, setLearningPlan] = useState({
    title: "",
    description: "",
  });

  const [steps, setSteps] = useState([
    {
      step_title: "",
      step_description: "",
    },
  ]);
  useEffect(() => {
    if (user && token) {
      fetchPlans();
    }
  }, [user, token]);

  const calculateProgress = (plan) => {
    if (!plan || !plan.steps) {
      return 0;
    }

    if (plan.is_completed) {
      return 100;
    }

    const totalSteps = plan.steps.length;
    const completedSteps = plan.steps.filter(
      (step) => step.is_completed
    ).length;

    if (totalSteps === 0) {
      return 0;
    }

    const progress = (completedSteps / totalSteps) * 100;
    return Math.round(progress);
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/learning`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLearningPlans(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const addPlan = async (planData, steps) => {
    try {
      console.log(steps);
      const response = await axios.post(
        `${serverUrl}/api/learning`,
        { planData: planData, steps: steps },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchPlans();
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
      console.log(response);

      fetchPlans();
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };

  const markPlanAsDone = async (planId) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/learning/plan-done/${planId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchPlans();
    } catch (error) {
      console.error("Error marking plan as done:", error);
    }
  };

  const markStepAsDone = async (stepId) => {
    try {
      const response = await axios.put(
        `${serverUrl}/api/learning/step-done/${stepId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      fetchPlans();
    } catch (error) {
      console.error("Error marking step as done:", error);
    }
  };

  const enhancePlan = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${serverUrl}/api/ai/enhance`,
        {
          plan: {
            title: learningPlan.title,
            description: learningPlan.description,
            steps: [...steps],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      setLearningPlan({
        title: response.data.plan.title,
        description: response.data.plan.description,
      });
      setSteps([...response.data.plan.steps]);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <learningContext.Provider
      value={{
        learningPlans,
        fetchPlans,
        addPlan,
        updatePlan,
        markPlanAsDone,
        markStepAsDone,
        calculateProgress,
        learningPlan,
        setLearningPlan,
        steps,
        setSteps,
        enhancePlan,
        loading,
      }}
    >
      {children}
    </learningContext.Provider>
  );
};

export default LearningProvider;
