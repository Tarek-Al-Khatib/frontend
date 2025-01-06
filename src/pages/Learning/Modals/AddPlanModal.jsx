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

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="w-4/5 p-6 mx-auto bg-white rounded-lg shadow-lg"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="flex justify-end w-full">
          <Button onClick={handleClose} color="text-navy">
            <IoCloseCircleOutline color="navy" size={40} />
          </Button>
        </div>
        <h2 className="mb-1 text-3xl font-extrabold text-navy">
          Learning Plan
        </h2>
        <Divider
          textAlign="center"
          flexItem
          sx={{
            borderBottomColor: "#1E25A6",
            marginBottom: 2,
          }}
        ></Divider>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between w-1/2">
            <label
              htmlFor="plan-title"
              className="text-2xl font-bold text-navy"
            >
              Title:
            </label>
            <TextField
              id="plan-title"
              name="plan-title"
              variant="outlined"
              placeholder="Learning title... ex: State NodeJS"
              onChange={handleInputChange}
              sx={{
                width: "70%",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  borderRadius: 5,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
          <div className="flex items-center justify-between w-1/2">
            <label
              htmlFor="plan-title"
              className="text-2xl font-bold text-navy"
            >
              Description:
            </label>
            <TextField
              id="plan-description"
              name="plan-description"
              multiline={true}
              maxRows={4}
              placeholder="Learning description... ex: I will start by learning the fundamentals of NodeJS and then dive deep to become a professional NodeJS developer !"
              variant="outlined"
              onChange={handleInputChange}
              sx={{
                width: "70%",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Open Sans",
                  fontWeight: "700",
                  borderRadius: 5,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default LearningPlanModal;
