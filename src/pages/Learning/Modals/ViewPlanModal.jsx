import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Box, IconButton, TextField, Divider } from "@mui/material";
import "../../../css/colors.css";
import Completed from "../../../assets/completed.png";
import Progress from "../../../assets/progress.png";
import { IoCloseCircleOutline } from "react-icons/io5";
import CircularProgressWithLabel from "../../../components/CircularProgressWithLabel/CircularProgressWithLabel";
import { learningContext } from "../../../contexts/LearningContext/LearningContext";
const ViewPlan = ({ open, handleClose, plan }) => {
  const { calculateProgress, markPlanAsDone, markStepAsDone, updatePlan } =
    useContext(learningContext);
  const [learningPlan, setLearningPlan] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const [steps, setSteps] = useState([]);

  const stepsContainerRef = useRef(null);

  useEffect(() => {
    if (plan) {
      setLearningPlan({
        id: plan.id,
        title: plan.title,
        description: plan.description,
      });
      setSteps([...plan.steps]);
    }
  }, [plan]);

  useEffect(() => {
    scrollToBottom();
  }, [steps]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLearningPlan({ ...learningPlan, [id]: value });
  };

  const handleStepInputChange = (index, field, value) => {
    setSteps((prevSteps) =>
      prevSteps.map((step, i) =>
        i === index ? { ...step, [field]: value } : step
      )
    );
  };

  const scrollToBottom = () => {
    if (stepsContainerRef) {
      if (steps.length > 4) {
        const container = stepsContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
    }
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
          <button onClick={handleClose}>
            <IoCloseCircleOutline className="text-navy" size={40} />
          </button>
        </div>
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-center justify-center gap-4">
            <h2 className="mb-1 text-3xl font-extrabold text-navy">
              Learning Plan
            </h2>
            <CircularProgressWithLabel
              value={calculateProgress(plan)}
              size={60}
            />
          </div>
          <button
            onClick={() => {
              markPlanAsDone(learningPlan.id);
              handleClose();
            }}
            className="px-8 py-2 text-xs font-bold transition text-cyan bg-navy rounded- hover:bg-blue-800 rounded-self"
          >
            Mark As Done
          </button>
        </div>
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
              id="title"
              name="title"
              variant="outlined"
              placeholder="Learning title... ex: State NodeJS"
              onChange={handleInputChange}
              defaultValue={learningPlan.title}
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
              id="description"
              name="description"
              multiline={true}
              maxRows={4}
              placeholder="Learning description... ex: I will start by learning the fundamentals of NodeJS and then dive deep to become a professional NodeJS developer !"
              variant="outlined"
              onChange={handleInputChange}
              defaultValue={learningPlan.description}
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
                    id="step_title"
                    name="step_title"
                    variant="outlined"
                    placeholder="Learning title... ex: State NodeJS"
                    onChange={(e) =>
                      handleStepInputChange(
                        step.id,
                        e.target.id,
                        e.target.value
                      )
                    }
                    defaultValue={step.step_title}
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
                    id="step_description"
                    name="step_description"
                    multiline={true}
                    maxRows={4}
                    placeholder="Learning description... ex: I will start by learning the fundamentals of NodeJS and then dive deep to become a professional NodeJS developer !"
                    variant="outlined"
                    onChange={(e) =>
                      handleStepInputChange(
                        step.id,
                        e.target.id,
                        e.target.value
                      )
                    }
                    defaultValue={step.step_description}
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
              <div className="flex flex-col">
                <IconButton
                  onClick={() => {
                    if (steps.length === 1) {
                      markPlanAsDone(learningPlan.id);
                      handleClose();
                    } else {
                      markStepAsDone(step.id);
                      setSteps((prevSteps) =>
                        prevSteps.map((st) =>
                          st.id === step.id ? { ...st, is_completed: true } : st
                        )
                      );
                    }
                  }}
                >
                  <img
                    className="w-14 h-14"
                    src={step.is_completed ? Completed : Progress}
                    alt="Step Icon"
                  />
                </IconButton>
                <p className="">
                  {step.is_completed ? "Completed" : "In Progress"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              updatePlan(learningPlan.id, learningPlan, steps);
              handleClose();
            }}
            className="px-8 py-2 text-xl font-bold transition text-cyan bg-navy rounded- hover:bg-blue-700 rounded-self"
          >
            Edit Learning Plan
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewPlan;
