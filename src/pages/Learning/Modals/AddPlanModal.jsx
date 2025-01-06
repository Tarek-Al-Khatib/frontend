import React, { useState } from "react";
import { Box, Button, Divider, Modal, TextField } from "@mui/material";
import "../../../css/colors.css";
import { IoCloseCircleOutline } from "react-icons/io5";

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
  const handleInputChange = (field, value) => {
    setLearningPlan({ ...learningPlan, [field]: value });
  };

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
