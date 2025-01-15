import React, { useContext, useState } from "react";
import "../../css/custom-scroll.css";
import CircularWithValueLabel from "../../components/CircularProgressWithLabel/CircularProgressWithLabel";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Completed from "../../assets/completed.png";
import Progress from "../../assets/progress.png";
import { Divider } from "@mui/material";
import { learningContext } from "../../contexts/LearningContext/LearningContext";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import { MdDoneOutline } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { GoTasklist } from "react-icons/go";
import capitalize from "capitalize";
import AddPlan from "./Modals/AddPlanModal";
import ViewPlan from "./Modals/ViewPlanModal";

const Learning = () => {
  const { learningPlans, calculateProgress } = useContext(learningContext);
  const { user } = useContext(authContext);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [planView, setPlanView] = useState(null);

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const handleViewModalClose = () => {
    setOpenViewModal(false);
    setPlanView({
      title: "",
      description: "",
      steps: [{ title: "", description: "" }],
    });
  };
  const renderPlanSteps = (steps) =>
    steps.map((step, index) => (
      <div key={index} className="flex items-center space-x-4">
        <img
          className="w-14 h-14"
          src={step.is_completed ? Completed : Progress}
          alt="Step Icon"
        />
        <div>
          <div className="text-base font-normal text-start text-navy">
            {step.step_title}
          </div>
          <Divider
            orientation="horizontal"
            textAlign="center"
            flexItem
            sx={{
              color: "#1E25A6",
              "::before, ::after": {
                borderColor: "#1E25A6",
              },
              fontWeight: "800",
              fontSize: 20,
            }}
          ></Divider>
          <div className="text-2xl font-normal text-start text-navy">
            {step.step_description}
          </div>
        </div>
      </div>
    ));

  const calculateTotalStepsProgress = () => {
    if (learningPlans.length > 0) {
      let count = 0;
      for (const plan of learningPlans) {
        if (plan.steps.length > 0)
          count += plan.steps.filter((s) => !s.is_completed).length;
      }

      return count;
    } else {
      return 0;
    }
  };
  return (
    <div>
      <Navbar />
      <AddPlan open={openAddModal} handleClose={handleAddModalClose} />
      <ViewPlan
        open={openViewModal}
        handleClose={handleViewModalClose}
        plan={planView}
      />
      <div className="min-h-screen p-8 bg-white">
        <div className="flex justify-center">
          <div className="w-1/4">
            <div className="mb-16 text-2xl font-light text-navy">
              My Learning | Learning Plans
            </div>
            <div className="mb-2 text-4xl font-bold text-navy">
              {user != null && `Hey ${capitalize(user.username)}!`}
            </div>
            <div className="mb-8 text-xl font-light text-navy">
              Here you can check your learning plans and see each plan's steps
              and progress. Have a productive day!
            </div>
          </div>

          <div className="flex flex-col items-stretch flex-grow gap-5 pl-20 mt-10">
            <div className="flex justify-end">
              <button
                onClick={() => setOpenAddModal(true)}
                className="px-12 py-2 text-xl font-normal text-white rounded-lg bg-navy"
              >
                Add Plan
              </button>
            </div>
            <div className="flex justify-center gap-10 h-60">
              <div className="flex items-center justify-center w-2/5 p-6 bg-white border border-gray-200 h-4/5 rounded-xl">
                <div className="flex items-center justify-center mb-4 rounded-full w-28 h-28 bg-navy">
                  <GoTasklist size={60} color="white" />
                </div>
                <div>
                  <div className="mb-5 text-6xl font-bold text-center text-navy">
                    {learningPlans.length}
                  </div>
                  <div className="text-xl font-normal text-navy">
                    Plans Created
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-2/5 p-6 bg-white border border-gray-200 h-4/5 rounded-xl">
                <div className="flex items-center justify-center mb-4 rounded-full w-28 h-28 bg-navy">
                  <MdDoneOutline size={60} color="white" />
                </div>
                <div>
                  <div className="mb-5 text-5xl font-bold text-center text-navy ">
                    {learningPlans.filter((l) => l.is_completed).length}
                  </div>
                  <div className="text-xl font-normal text-navy">
                    Plans Completed
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center w-2/5 p-6 bg-white border border-gray-200 h-4/5 rounded-xl">
                <div className="flex items-center justify-center mb-4 rounded-full w-28 h-28 bg-navy">
                  <GiProgression size={60} color="white" />
                </div>
                <div>
                  <div className="mb-5 text-5xl font-bold text-center text-navy ">
                    {calculateTotalStepsProgress()}
                  </div>
                  <div className="text-xl font-normal text-navy">
                    Steps in progress
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto scroll-container custom-scrollbar">
          <div className="flex mb-3 gap-9 min-w-max">
            {learningPlans.map((plan, index) => (
              <button
                key={index}
                className="border rounded-2xl border-gray-200 bg-white p-4 max-w-sm h-[650px] w-[350px] flex flex-col items-start"
                onClick={() => {
                  setPlanView(plan);
                  setOpenViewModal(true);
                }}
              >
                <div className="flex justify-between w-full gap-6">
                  <div className="w-3/4">
                    <div className="mb-4 text-2xl font-bold text-start text-navy">
                      {plan.title}
                    </div>
                    <div className="mb-6 text-xl font-normal text-start text-navy">
                      {plan.description}
                    </div>
                  </div>
                  <div>
                    <CircularWithValueLabel
                      value={calculateProgress(plan)}
                      size={60}
                    />
                  </div>
                </div>

                <div className="relative p-4 bg-white ">
                  <div className="space-y-4 h-[400px] overflow-y-auto overflow-x-hidden custom-scrollbar whitespace-normal py-6">
                    {renderPlanSteps(plan.steps)}
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-b from-white via-white/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white via-white/70 to-transparent"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Learning;
