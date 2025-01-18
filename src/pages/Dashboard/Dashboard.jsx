import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Dashboard.css";
import { LuGraduationCap } from "react-icons/lu";
import { RiSpeakFill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { dashboardContext } from "../../contexts/DashboardContext/DashboardContext";
import { authContext } from "../../contexts/AuthContext/AuthContext";
import capitalize from "capitalize";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { HashLoader } from "react-spinners";
import { learningContext } from "../../contexts/LearningContext/LearningContext";
import { communityContext } from "../../contexts/CommunityContext/CommunityContext";
const Dashboard = () => {
  const {
    quote,
    chartData,
    loading,
    communities,
    learningPlans,
    setLearningPlans,
  } = useContext(dashboardContext);
  const { joinCommunity } = useContext(communityContext);
  const { user } = useContext(authContext);
  const { addPlan } = useContext(learningContext);
  const navigation = useNavigate();
  const [dashboardButtons, setDashboardButtons] = useState([]);

  useEffect(() => {
    setDashboardButtons([
      {
        id: 1,
        label: "My Learning",
        icon: <LuGraduationCap size={60} />,
        url: "/learning",
      },
      {
        id: 2,
        label: "My Interviews",
        icon: <RiSpeakFill size={60} />,
        url: "/interview",
      },
      {
        id: 3,
        label: "Communities",
        icon: <MdPeopleAlt size={60} />,
        url: "/community",
      },
      {
        id: 4,
        label: "My Profile",
        icon: <FaUserPen size={60} />,
        url: "/myprofile",
      },
    ]);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-600 class">
          <HashLoader color="#3572ef" size={60} />
        </div>
      ) : (
        <div>
          {/* <Navbar /> */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-3 max-md:flex-col max-md:gap-5">
              <div>
                <h1 className="pb-5 text-2xl font-thin text-navy">Dashboard</h1>
                <h1 className="mb-4 text-4xl font-bold text-blue-900">
                  Welcome Back, {user && capitalize(user.username)}!
                </h1>
                <p className="w-3/5 text-xl font-normal text-navy max-sm:w-full">
                  Here you can check your current stats, regarding interviews,
                  accomplishments in learning ...etc. Good luck!
                </p>
              </div>

              <div className="w-2/5 p-6 mb-6 border border-b-gray-300 rounded-3xl max-xl:w-3/4 max-md:w-full">
                <h2 className="mb-3 font-thin text-center text-navy">
                  For you to remember
                </h2>

                {quote && (
                  <p className="text-xl font-bold text-center text-navy">
                    {quote.quote} - {quote.author}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center w-full p-8 py-4 border border-gray-300 mb-14 rounded-3xl gap-14 max-2xl:flex-col">
              {chartData && (
                <ResponsiveContainer height={600}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      label={{
                        value: "Day",
                        position: "insideBottomRight",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      dataKey={"stepCount"}
                      label={{
                        value: "Step Count",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="stepCount"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}

              <div className="grid w-2/5 grid-cols-2 gap-7 max-xl:w-4/5 max-sm:w-full">
                {dashboardButtons.map((button) => (
                  <button
                    key={button.id}
                    className="flex flex-col items-center justify-center py-4 text-white border border-gray-300 shadow rounded-xl"
                    onClick={() => {
                      navigation(button.url);
                    }}
                  >
                    <div className="flex items-center justify-center rounded-full bg-navy w-36 h-36 max-sm:w-20 max-sm:h-20">
                      {button.icon}
                    </div>
                    <p className="my-1 mt-5 text-xl font-medium text-black">
                      {button.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <section className="flex justify-center gap-6 max-2xl:flex-col">
              <div className="w-1/2 p-6 mb-8 border border-gray-300 rounded-3xl max-2xl:w-full">
                <h2 className="mb-4 text-2xl font-normal text-black">
                  Top Learning Picks
                </h2>
                <div className="flex items-center justify-center max-md:flex-col">
                  {learningPlans.map((pick, index) => (
                    <div
                      key={pick.title}
                      className="flex flex-col justify-between w-1/3 min-h-[612px] p-4 rounded max-md:w-full max-md:min-h-fit"
                    >
                      <div>
                        <div className="inline-block mb-1 text-sm font-bold text-center rounded-full px-9 bg-light-navy text-cyan">
                          {pick.category}
                        </div>
                        <h3 className="text-xl font-bold text-navy">
                          {pick.title}
                        </h3>
                      </div>
                      <ul className="p-4 text-base list-disc text-navy text-start">
                        {pick.steps.map((step, index) => (
                          <li key={index}>{step.step_title}</li>
                        ))}
                      </ul>
                      <button
                        disabled={pick.is_added}
                        onClick={() => {
                          addPlan(
                            {
                              title: pick.title,
                              description: pick.description,
                            },
                            pick.steps
                          );
                          setLearningPlans((prevPlans) =>
                            prevPlans.map((plan, i) =>
                              i === index ? { ...plan, is_added: true } : plan
                            )
                          );

                          navigation("/learning");
                        }}
                        className={`w-full px-6 py-2 mt-4 font-bold text-white transition rounded-lg ${
                          pick.is_added ? "bg-blue " : "bg-navy"
                        } hover:bg-blue-700`}
                      >
                        {pick.is_added ? "Added " : "Add to your learning"}
                      </button>
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
              <div className="flex flex-col items-start justify-between w-1/2 p-6 mb-8 border border-gray-300 rounded-3xl max-2xl:w-full">
                <h2 className="mb-4 text-2xl font-normal text-black">
                  Top Communities
                </h2>
                <div className="grid items-start w-full h-full grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                  {communities.length > 0 &&
                    communities.map((community) => (
                      <div
                        key={community.id}
                        className="flex flex-col items-center justify-between p-4 rounded h-60"
                      >
                        <div className="flex items-center justify-center w-full h-24 mb-4 overflow-hidden text-base font-light text-center text-blue-300 bg-blue-900 rounded-3xl first-letter:h-24">
                          {community && community.community_banner ? (
                            <img
                              src={community.community_banner}
                              alt={`${community.title} banner`}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span>No Logo</span>
                          )}
                        </div>
                        <div className="self-start">
                          <h3 className="text-xl font-bold text-navy">
                            {community.title}
                          </h3>
                          <p className="text-base font-normal text-navy">
                            {community.description}
                          </p>
                        </div>
                        <button
                          onClick={() => joinCommunity(community.id)}
                          className="self-start w-2/3 py-1 mt-4 font-bold text-white transition rounded-lg bg-navy hover:bg-blue-700"
                        >
                          Join Community
                        </button>
                      </div>
                    ))}
                  {communities.length === 0 && <p>No Communities to join</p>}
                </div>
                <div></div>
              </div>
            </section>
          </div>
          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
