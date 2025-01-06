import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Box,
  Button,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import "../../../css/colors.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
const AddPlan = ({ open, handleClose }) => {
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

  const stepsContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [steps]);

  const handleInputChange = (field, value) => {
    setLearningPlan({ ...learningPlan, [field]: value });
  };

  const scrollToBottom = () => {
    if (stepsContainerRef) {
      if (steps.length > 4) {
        const container = stepsContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
    }
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
        <h2 className="mb-1 text-3xl font-extrabold text-navy">Steps</h2>
        <Divider
          textAlign="center"
          flexItem
          sx={{
            borderBottomColor: "#1E25A6",
            marginBottom: 2,
          }}
        ></Divider>
        <div className="flex items-center gap-5 mb-4">
          <button onClick={addStep}>
            {" "}
            <IoIosAddCircleOutline className="text-navy" size={40} />
          </button>
          <button className="px-8 py-2 text-xl font-bold transition text-cyan bg-navy rounded- hover:bg-blue-800 rounded-self">
            Enhance with AI
          </button>
        </div>
        <div
          className="overflow-y-auto custom-scrollbar h-[300px] mb-5 scroll-smooth"
          ref={stepsContainerRef}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center pb-2 mt-1 mb-4 border-b "
            >
              <div className="flex w-11/12 gap-10">
                <div className="flex items-center justify-between w-1/3">
                  <label
                    htmlFor={`step-title-${index}`}
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
                      width: "80%",
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
                <div className="flex items-center justify-between w-3/5">
                  <label
                    htmlFor={`step-description-${index}`}
                    className="text-2xl font-bold text-navy"
                  >
                    Description:
                  </label>
                  <TextField
                    id={`step-description-${index}`}
                    name={`step-description-${index}`}
                    multiline={true}
                    maxRows={4}
                    placeholder="Learning description... ex: I will start by learning the fundamentals of NodeJS and then dive deep to become a professional NodeJS developer !"
                    variant="outlined"
                    onChange={handleInputChange}
                    sx={{
                      width: "80%",
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
              <IconButton
                color="error"
                onClick={() => removeStep(index)}
                disabled={steps.length === 1}
              >
                <IoIosRemoveCircleOutline
                  size={40}
                  className={steps.length === 1 ? "text-gray-400" : "text-navy"}
                />
              </IconButton>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button className="px-8 py-2 text-xl font-bold transition text-cyan bg-navy rounded- hover:bg-blue-700 rounded-self">
            Create Learning Plan
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default AddPlan;
