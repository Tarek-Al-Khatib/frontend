import React from "react";
import "../../css/colors.css";
import "./Home.css";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import Logo from "../../assets/logo.png";
import { FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import Founder from "../../assets/founder.jpg";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  return (
    <div className="bg-gray-100">
      <header className="py-4 text-white bg-navy">
        <div className="container flex items-center justify-between w-11/12 mx-auto max-sm:justify-center">
          <img src={Logo} alt="Logo" className="w-14 h-14 max-md:hidden" />

          <div className="flex items-center space-x-4 max-sm:hidden">
            <nav className="flex space-x-6 text-2xl gap-14">
              <a href="#home" className="hover:text-gray-200">
                Home
              </a>
              <a href="#about" className="hover:text-gray-200">
                About us
              </a>
              <a href="#contact" className="hover:text-gray-200">
                Contact us
              </a>
            </nav>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                if (userId && token) {
                  navigate("/dashboard");
                } else {
                  navigate("/signin");
                }
              }}
              className="px-4 py-2 font-bold"
            >
              {userId && token ? "Dashboard" : "Login"}
            </button>
            <button
              onClick={() => {
                if (userId && token) {
                  navigate("/signin");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("token");
                } else {
                  navigate("/signup");
                }
              }}
              className="px-4 py-2 font-bold"
            >
              {userId && token ? "Logout" : "SignUp"}
            </button>
          </div>
        </div>
      </header>

      <section className="flex text-center h-[700px] max-xl:h-[400px] max-sm:h-full">
        <div className="w-10/12 max-lg:w-1/2 max-sm:hidden">
          <img
            src="https://www.grosvenorsystems.com/hs-fs/hubfs/Optimized-ezgif.com-gif-maker-1.jpg?width=760&name=Optimized-ezgif.com-gif-maker-1.jpg"
            alt="Logo"
            className="object-cover w-full h-full "
          />
        </div>
        <div className="flex flex-col justify-start w-3/5 p-28 gap-36 max-xl:gap-20 max-xl:p-16 max-lg:gap-10 max-lg:py-8 max-sm:w-full">
          <h1 className="text-6xl font-extrabold leading-normal tracking-widest text-navy text-start max-xl:text-5xl">
            Let's start our careers from here
          </h1>
          <div>
            <button className="block w-40 px-6 py-3 font-bold text-white rounded bg-navy hover:bg-blue-800">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cyan">
        <div className="mx-auto text-center h-72 max-xl:h-full">
          <h2 className="mb-8 text-5xl font-extrabold text-navy max-xl:mb-14">
            Our goals
          </h2>
          <div className="flex items-center justify-center w-2/3 h-full gap-20 mx-auto max-xl:flex-col max-xl:w-full max-sm:px-4">
            <div className="w-2/6 p-6 bg-white rounded-xl h-2/3 max-2xl:p-3 max-xl:w-1/2 max-sm:w-full ">
              <h3 className="p-2 font-extrabold text-white -translate-y-full rounded-lg text-l bg-navy">
                Unlock
              </h3>
              <p className="p-4 text-gray-600 -translate-y-1/4 text-start">
                Unlocking your potential is about embracing growth, discovering
                new opportunities, and achieving greater success.
              </p>
            </div>
            <div className="w-2/6 p-6 bg-white rounded-xl h-2/3 max-2xl:p-3 max-xl:w-1/2 max-sm:w-full ">
              <h3 className="p-2 font-extrabold text-white -translate-y-full rounded-lg text-l bg-navy">
                Grow
              </h3>
              <p className="p-4 pt-2 text-gray-600 -translate-y-1/4 text-start">
                Grow by learning, adapting, and embracing new opportunities to
                become your best self.
              </p>
            </div>
            <div className="w-2/6 p-6 bg-white rounded-xl h-2/3 max-2xl:p-3 max-xl:w-1/2 max-sm:w-full">
              <h3 className="p-2 font-extrabold text-white -translate-y-full rounded-lg text-l bg-navy">
                Expand
              </h3>
              <p className="p-4 text-gray-600 -translate-y-1/4 text-start">
                Expand relations by building strong communities through trust,
                collaboration, and shared values.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 background-opp h-[650px] max-xl:h-full">
        <div className="h-full mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-14 text-navy ">
            More Oppurtunities for everyone
          </h2>
          <div className="flex items-start justify-center w-2/3 h-full gap-20 mx-auto max-xl:flex-col max-sm:w-full max-sm:px-4">
            <div className="flex flex-col items-start justify-between w-2/6 p-6 bg-white border border-blue-900 h-4/5 rounded-xl text-start max-xl:flex-row max-2xl:p-3 max-xl:h-full max-xl:w-full max-sm:items-center">
              <div className="max-sm:flex max-sm:flex-col max-sm:gap-5">
                <h1 className="p-4 text-2xl font-bold text-navy max-2x:text-xl">
                  Virual Mockup Interview
                </h1>
                <p className="p-4 text-navy max-2xl:p-2">
                  The Virtual Mock Interview simulates real interviews with
                  AI-generated questions and feedback, offering detailed
                  performance analysis and live sessions with moderators for
                  real-time guidance.
                </p>
              </div>
              <div className="px-4">
                <button className="p-3 px-8 text-xl text-white rounded-lg bg-navy ">
                  Start now
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-2/6 p-6 bg-white border border-blue-900 h-4/5 rounded-xl text-start max-xl:flex-row max-2xl:p-3 max-xl:h-full max-xl:w-full max-sm:items-center">
              <div className="max-sm:flex max-sm:flex-col max-sm:gap-5">
                <h1 className="p-4 text-2xl font-bold text-navy max-2x:text-xl">
                  Virual Mockup Interview
                </h1>
                <p className="p-4 text-navy max-2xl:p-2">
                  The Virtual Mock Interview simulates real interviews with
                  AI-generated questions and feedback, offering detailed
                  performance analysis and live sessions with moderators for
                  real-time guidance.
                </p>
              </div>
              <div className="px-4">
                <button className="p-3 px-8 text-xl text-white rounded-lg bg-navy ">
                  Start now
                </button>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between w-2/6 p-6 bg-white border border-blue-900 h-4/5 rounded-xl text-start max-xl:flex-row max-2xl:p-3 max-xl:h-full max-xl:w-full max-sm:items-center">
              <div className="max-sm:flex max-sm:flex-col max-sm:gap-5">
                <h1 className="p-4 text-2xl font-bold text-navy max-2x:text-xl">
                  Virual Mockup Interview
                </h1>
                <p className="p-4 text-navy max-2xl:p-2">
                  The Virtual Mock Interview simulates real interviews with
                  AI-generated questions and feedback, offering detailed
                  performance analysis and live sessions with moderators for
                  real-time guidance.
                </p>
              </div>
              <div className="px-4">
                <button className="p-3 px-8 text-xl text-white rounded-lg bg-navy ">
                  Start now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <h2 className="mb-24 text-5xl font-extrabold text-center text-navy">
          About Us
        </h2>
        <div className=" bg-cyan">
          <div className="flex items-center justify-center py-10 gap-14">
            <div className="h-[350px] w-[600px] bg-navy rounded-3xl max-lg:hidden">
              <img
                src={Founder}
                alt="The king of development"
                className="object-cover w-full h-full rounded-3xl"
              />
            </div>
            <div className="h-[500px] w-[400px] bg-navy rounded-3xl -my-20 flex flex-col gap-12 justify-center items-center max-lg:gap-2">
              <h1 className="text-4xl font-bold text-white max-lg:hidden">
                Founder
              </h1>
              <div className="h-[200px] w-[300px] bg-navy  lg:hidden">
                <img
                  src={Founder}
                  alt="The king of development"
                  className="object-cover w-full h-full rounded-3xl"
                />
              </div>
              <p className="p-5 px-10 text-xl text-center text-white max-lg:p-2">
                Tarek, the founder of{" "}
                <span className="font-bold">WorkWise</span>, is driven by a
                passion for technology and career development. He strives to
                create a platform that helps users enhance their skills, prepare
                for interviews, and connect with a supportive community to reach
                their career goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col gap-16 p-12 mt-24 text-white bg-navy">
        <div className="container flex items-center justify-between w-11/12 mx-auto max-md:flex-col max-md:gap-8">
          <div className="flex flex-col items-center justify-center gap-3 max-lg:hidden">
            <div className="flex items-center justify-center w-40 h-40 bg-white rounded-full">
              <img src={Logo} alt="Logo" className="w-24 h-24" />
            </div>
            <p className="text-base font-bold">
              Empower Growth, Unlock Potential
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="flex space-x-6 text-2xl gap-14 max-sm:text-xl max-sm:gap-6">
              <a href="#home" className="hover:text-gray-200">
                Home
              </a>
              <a href="#about" className="hover:text-gray-200">
                About us
              </a>
              <a href="#contact" className="hover:text-gray-200">
                Contact us
              </a>
            </nav>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => {
                if (userId && token) {
                  navigate("/dashboard");
                } else {
                  navigate("/signin");
                }
              }}
              className="px-4 py-2 font-bold"
            >
              {userId && token ? "Dashboard" : "Login"}
            </button>
            <button
              onClick={() => {
                if (userId && token) {
                  navigate("/signin");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("token");
                } else {
                  navigate("/signup");
                }
              }}
              className="px-4 py-2 font-bold"
            >
              {userId && token ? "Logout" : "SignUp"}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between w-4/5 mx-auto">
          <div className="flex max-lg:flex-col lg:justify-between lg:w-2/5">
            <div className="flex items-center gap-1">
              <IoLocationOutline color="white" size={30} />
              <p>Beirut, Lebanon</p>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineEmail color="white" size={30} />
              <p>tarek.al.khatiib@gmail.com</p>
            </div>
          </div>
          <div className="flex max-lg:flex-col lg:justify-between lg:w-2/5">
            <div className="flex items-center gap-1">
              <FiPhone color="white" size={20} />
              <p>+961 76 906 694</p>
            </div>
            <div className="flex gap-2">
              <a href="https://www.linkedin.com/in/tarek-al-khatib/">
                <LuLinkedin color="white" size={30} />
              </a>
              <a href="https://github.com/Tarek-Al-Khatib">
                <FiGithub color="white" size={30} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
