import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Navbar/Footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
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
      </div>

      <Footer />
    </div>
  );
};
export default Dashboard;
