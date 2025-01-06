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
  return <Modal open={open} onClose={handleClose}></Modal>;
};

export default LearningPlanModal;
