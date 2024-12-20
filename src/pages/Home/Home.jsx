import React from "react";
import "../../css/colors.css";
import "./Home.css";
const Home = () => {
  return (
    <div className="bg-gray-100">
      <header className="py-4 text-white bg-navy">
        <div className="container flex items-center justify-between w-11/12 mx-auto">
          <img src="public/images/logo.png" alt="Logo" className="h-10" />
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-6 text-2xl gap-14">
              <a href="#" className="hover:text-gray-200">
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
            <button className="px-4 py-2 font-bold">Login</button>
            <button className="px-4 py-2 font-bold">Sign Up</button>
          </div>
        </div>
      </header>

      <section className="flex text-center h-[700px]">
        <div className="w-10/12 ">
          <img
            src="https://www.grosvenorsystems.com/hs-fs/hubfs/Optimized-ezgif.com-gif-maker-1.jpg?width=760&name=Optimized-ezgif.com-gif-maker-1.jpg"
            alt="Logo"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-start w-3/5 p-28 gap-36">
          <h1 className="text-6xl font-extrabold leading-normal tracking-widest text-navy text-start">
            Let's start our careers from here
          </h1>
          <div>
            <button className="block w-40 px-6 py-3 font-bold text-white rounded bg-navy hover:bg-blue-800">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto text-center">
          <h2 className="mb-8 text-3xl font-extrabold text-navy">Our goals</h2>
          <div className="flex items-center justify-center w-1/2 gap-20 mx-auto ">
            <div className="w-2/6 p-6 bg-white rounded-md shadow h-60">
              <h3 className="p-2 font-extrabold text-white -translate-y-full rounded-lg text-l bg-navy">
                Unlock
              </h3>
              <p className="p-4 text-gray-600 text-start">
                Unlocking your potential is about embracing growth, discovering
                new opportunities, and achieving greater success.
              </p>
            </div>
            <div className="w-2/6 p-6 bg-white rounded-md shadow h-60">
              <h3 className="p-2 font-extrabold text-white -translate-y-full rounded-lg text-l bg-navy">
                Grow
              </h3>
              <p className="p-4 pt-2 text-gray-600 text-start">
                Grow by learning, adapting, and embracing new opportunities to
                become your best self.
              </p>
            </div>
            <div className="w-2/6 p-6 bg-white rounded-md shadow h-52">
              <h3 className="p-2 font-extrabold text-white -translate-y-full rounded-lg text-l bg-navy">
                Expand
              </h3>
              <p className="p-4 text-gray-600 text-start">
                Expand relations by building strong communities through trust,
                collaboration, and shared values.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
