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
const Dashboard = () => {
  const { quote } = useContext(dashboardContext);
  const navigation = useNavigate();
  const [topLearningPicks, setTopLearningPicks] = useState([]);
  const [topCommunities, setTopCommunities] = useState([]);
  const [dashboardButtons, setDashboardButtons] = useState([]);

  useEffect(() => {
    setTopLearningPicks([
      {
        id: 1,
        title: "Become a Full Stack Developer",
        category: "Web Development",
        imageUrl: "bg-navy",
        lessons: [
          "Introduction to web development",
          "Learn the basics",
          "What is a library?",
          "Learn about JavaScript",
          "Create your first React page",
        ],
      },
      {
        id: 2,
        title: "Learn Data Science",
        category: "Data Science",
        imageUrl: "bg-green-500",
        lessons: [
          "Intro to Data Science",
          "Learn Python",
          "Statistics for Data Science",
          "Data Visualization",
        ],
      },
      {
        id: 2,
        title: "Learn Data Science",
        category: "Data Science",
        imageUrl: "bg-green-500",
        lessons: [
          "Intro to Data Science",
          "Learn Python",
          "Statistics for Data Science",
          "Data Visualization",
        ],
      },
    ]);

    setTopCommunities([
      {
        id: 1,
        name: "React Lovers",
        description: "Join us to know more about React!",
      },
      {
        id: 2,
        name: "Frontend Devs",
        description: "A community for frontend enthusiasts.",
      },
      {
        id: 2,
        name: "Frontend Devs",
        description: "A community for frontend enthusiasts.",
      },
      {
        id: 2,
        name: "Frontend Devs",
        description: "A community for frontend enthusiasts.",
      },
      {
        id: 2,
        name: "Frontend Devs",
        description: "A community for frontend enthusiasts.",
      },
      {
        id: 2,
        name: "Frontend Devs",
        description: "A community for frontend enthusiasts.",
      },
    ]);

    setDashboardButtons([
      {
        id: 1,
        label: "My Learning",
        icon: <LuGraduationCap size={80} />,
        url: "/learning",
      },
      {
        id: 2,
        label: "My Interviews",
        icon: <RiSpeakFill size={80} />,
        url: "/interview",
      },
      {
        id: 3,
        label: "Communities",
        icon: <MdPeopleAlt size={80} />,
        url: "/community",
      },
      {
        id: 4,
        label: "My Profile",
        icon: <FaUserPen size={80} />,
        url: "/profile",
      },
    ]);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="pb-5 text-2xl font-thin text-navy">Dashboard</h1>
            <h1 className="mb-4 text-4xl font-bold text-blue-900">
              Welcome Back, Nour!
            </h1>
            <p className="w-3/5 text-xl font-normal text-navy">
              Here you can check your current stats, regarding interviews,
              accomplishments in learning ...etc. Good luck!
            </p>
          </div>

          <div className="w-2/5 p-6 mb-6 border border-b-gray-300 rounded-3xl">
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

        <div className="flex items-center justify-center w-full p-12 border border-gray-300 mb-14 rounded-3xl">
          <div className="w-3/5 p-4 bg-gray-100 rounded shadow">
            <div className="flex items-center justify-center h-64 bg-gray-200">
              <span>Graph Placeholder</span>
            </div>
          </div>
          <div className="grid w-2/5 grid-cols-2 gap-7">
            {dashboardButtons.map((button) => (
              <button
                key={button.id}
                className="flex flex-col items-center justify-center py-4 text-white shadow rounded-xl bg-dark-blue hover:bg-blue-600"
                onClick={() => {
                  navigation(button.url);
                }}
              >
                <div className="flex items-center justify-center dashboard-buttons-icons">
                  {button.icon}
                </div>
                <p className="my-1 mt-5 text-xl font-medium text-black">
                  {button.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <section className="flex justify-center gap-6">
          <div className="w-1/2 p-6 mb-8 border border-gray-300 rounded-3xl">
            <h2 className="mb-4 text-2xl font-normal text-black">
              Top Learning Picks
            </h2>
            <div className="flex items-center justify-center ">
              {topLearningPicks.map((pick) => (
                <div
                  key={pick.id}
                  className="flex flex-col justify-between w-1/3 min-h-[612px] p-4 rounded"
                >
                  <div>
                    <div
                      className={`w-full h-48 mb-1 ${pick.imageUrl} rounded-3xl`}
                    ></div>
                    <div className="inline-block mb-1 text-sm font-bold text-center rounded-full px-9 bg-light-navy text-cyan">
                      {pick.category}
                    </div>
                    <h3 className="text-xl font-bold text-navy">
                      {pick.title}
                    </h3>
                  </div>
                  <ul className="p-4 text-base list-disc text-navy text-start">
                    {pick.lessons.map((lesson, index) => (
                      <li key={index}>{lesson}</li>
                    ))}
                  </ul>
                  <button className="w-full px-6 py-2 mt-4 font-bold text-white transition rounded-xl bg-navy hover:bg-blue-700">
                    Add to your learning
                  </button>
                </div>
              ))}
            </div>
            <div></div>
          </div>
          <div className="flex flex-col items-start justify-between w-1/2 p-6 mb-8 border border-gray-300 min-h-max rounded-3xl">
            <h2 className="mb-4 text-2xl font-normal text-black">
              Top Communities
            </h2>
            <div className="grid grid-cols-1 p-4 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {topCommunities.map((community) => (
                <div
                  key={community.id}
                  className="flex flex-col items-center justify-center p-4 rounded"
                >
                  <div className="w-full h-24 mb-1 bg-navy rounded-3xl"></div>
                  <div className="self-start">
                    <h3 className="text-xl font-bold text-navy">
                      {community.name}
                    </h3>
                    <p className="text-base font-normal text-navy">
                      {community.description}
                    </p>
                  </div>
                  <button className="w-2/3 py-1 mt-4 font-bold text-white transition rounded-xl bg-navy hover:bg-blue-700">
                    Join Community
                  </button>
                </div>
              ))}
            </div>
            <div></div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;
