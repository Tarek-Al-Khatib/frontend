import React, { useState } from "react";
import { Modal } from "@mui/material";
import "../../../css/colors.css";

const LearningPlanModal = ({ open, handleClose }) => {
  const [learningPlan, setLearningPlan] = useState({
    title: "",
    description: "",
  });

  const [steps, setSteps] = useState([
    {
      title: "",
      description: "",
    },
  ]);

  const addStep = () => {
    setSteps([...steps, { title: "", description: "" }]);
  };

  const removeStep = (index) => {
    console.log(index);
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  return <Modal open={open} onClose={handleClose}></Modal>;
};

export default LearningPlanModal;
