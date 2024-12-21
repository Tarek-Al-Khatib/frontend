import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Navbar/Footer";
import "./Dashboard.css";
import { LuGraduationCap } from "react-icons/lu";
import { RiSpeakFill } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
const Dashboard = () => {
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
            <p className="text-xl font-bold text-center text-navy">
              "Continuous effort, not strength or intelligence, is the key to
              unlocking our potential." - Winston Churchill
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full p-12 border border-gray-300 rounded-3xl">
          <div className="w-3/5 p-4 bg-gray-100 rounded shadow">
            <div className="flex items-center justify-center h-64 bg-gray-200">
              <span>Graph Placeholder</span>
            </div>
          </div>
          <div className="grid w-2/5 grid-cols-2 gap-7">
            <button className="flex flex-col items-center justify-center py-4 text-white shadow rounded-xl bg-dark-blue hover:bg-blue-600">
              <div className="flex items-center justify-center dashboard-buttons-icons">
                <LuGraduationCap size={80} />
              </div>
              <p className="my-1 mt-5 text-xl font-medium text-black">
                My Learning
              </p>
            </button>
            <button className="flex flex-col items-center justify-center py-4 text-white shadow rounded-xl bg-dark-blue hover:bg-blue-600">
              <div className="flex items-center justify-center dashboard-buttons-icons">
                <RiSpeakFill size={80} />
              </div>
              <p className="my-1 mt-5 text-xl font-medium text-black">
                My Interviews
              </p>
            </button>
            <button className="flex flex-col items-center justify-center py-4 text-white shadow rounded-xl bg-dark-blue hover:bg-blue-600">
              <div className="flex items-center justify-center dashboard-buttons-icons">
                <MdPeopleAlt size={80} />
              </div>
              <p className="my-1 mt-5 text-xl font-medium text-black">
                Communities
              </p>
            </button>
            <button className="flex flex-col items-center justify-center py-4 text-white shadow rounded-xl bg-dark-blue hover:bg-blue-600">
              <div className="flex items-center justify-center dashboard-buttons-icons">
                <FaUserPen size={80} />
              </div>
              <p className="my-1 mt-5 text-xl font-medium text-black">
                My Profile
              </p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;
