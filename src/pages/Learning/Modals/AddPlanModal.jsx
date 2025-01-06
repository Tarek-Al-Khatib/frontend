import React from "react";
import { Modal } from "@mui/material";
import "../../../css/colors.css";

const LearningPlanModal = ({ open, handleClose }) => {
  return <Modal open={open} onClose={handleClose}></Modal>;
};

export default LearningPlanModal;
