import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal, Box, IconButton, TextField, Divider } from "@mui/material";
import "../../../css/colors.css";
import "../../../css/base.css";
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
    is_completed: false,
  });

  const [steps, setSteps] = useState([]);
  const [progress, setProgress] = useState(calculateProgress(plan));

  const stepsContainerRef = useRef(null);

  useEffect(() => {
    if (plan) {
      setLearningPlan({
        id: plan.id,
        title: plan.title,
        description: plan.description,
        is_completed: plan.is_completed,
      });
      setSteps([...plan.steps]);
    }
  }, [plan]);

  useEffect(() => {
    scrollToBottom();
    setProgress(calculateProgress({ steps: steps }));
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
      if (steps.length > 3) {
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

        <div className="flex items-end justify-between mb-3 max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <div className="flex flex-col max-sm:flex-row max-sm:items-center max-sm:gap-3">
            <div className="flex items-center justify-center gap-4">
              <h2 className="mb-1 text-3xl font-extrabold text-navy max-md:text-xl">
                Learning Plan
              </h2>
              <CircularProgressWithLabel value={progress} size={60} />
            </div>
            <div className="px-3 py-1 text-sm font-bold rounded-self bg-blue w-fit h-fit">
              <p className="text-white">
                +{steps.reduce((sum, step) => sum + (step.points || 0), 0)}{" "}
                points
              </p>
            </div>
          </div>
          <button
            disabled={learningPlan.is_completed}
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
          <div className="flex items-center justify-between w-1/2 max-xl:w-full max-md:flex-col max-md:items-start max-md:gap-2">
            <label
              htmlFor="plan-title"
              className="text-2xl font-bold text-navy"
            >
              Title:
            </label>
            <TextField
              disabled={learningPlan.is_completed}
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
                  borderRadius: 1,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
          <div className="flex items-center justify-between w-1/2 max-xl:w-full max-md:flex-col max-md:items-start max-md:gap-2">
            <label
              htmlFor="plan-title"
              className="text-2xl font-bold text-navy"
            >
              Description:
            </label>
            <TextField
              disabled={learningPlan.is_completed}
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
                  borderRadius: 1,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E5E5",
                },
              }}
            />
          </div>
        </div>
        <h2 className="mb-1 text-3xl font-extrabold text-navy max-sm:text-xl">
          Steps
        </h2>
        <Divider
          textAlign="center"
          flexItem
          sx={{
            borderBottomColor: "#1E25A6",
            marginBottom: 2,
          }}
        ></Divider>
        <div
          className="overflow-y-auto custom-scrollbar h-[300px] mb-5 scroll-smooth max-sm:mb-0"
          ref={stepsContainerRef}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center pb-2 mt-1 mb-4 border-b"
            >
              <div className="flex flex-col w-11/12">
                <div className="px-3 py-1 text-sm font-bold rounded-self bg-blue w-fit">
                  <p className="text-white">+{step.points} points</p>
                </div>

                <div className="flex w-11/12 gap-10 max-lg:flex-col max-lg:gap-4">
                  <div className="flex flex-col items-start justify-start w-1/3 mt-2 max-lg:w-full">
                    <label
                      htmlFor={`step-title-${index}`}
                      className="text-xl font-bold text-navy"
                    >
                      Title:
                    </label>
                    <TextField
                      disabled={step.completed_at != null}
                      id="step_title"
                      name="step_title"
                      variant="outlined"
                      placeholder="Learning title... ex: State NodeJS"
                      onChange={(e) =>
                        handleStepInputChange(
                          index,
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
                          borderRadius: 1,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E5E5",
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col items-start justify-between w-4/5 mt-2 max-lg:w-full">
                    <label
                      htmlFor={`step-description-${index}`}
                      className="text-xl font-bold text-navy"
                    >
                      Description:
                    </label>
                    <TextField
                      disabled={step.completed_at != null}
                      id="step_description"
                      name="step_description"
                      multiline={true}
                      maxRows={4}
                      placeholder="Learning description... ex: I will start by learning the fundamentals of NodeJS and then dive deep to become a professional NodeJS developer !"
                      variant="outlined"
                      onChange={(e) =>
                        handleStepInputChange(
                          index,
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
                          borderRadius: 1,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#E5E5E5",
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <IconButton
                  disabled={step.completed_at != null}
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
            disabled={learningPlan.is_completed}
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
