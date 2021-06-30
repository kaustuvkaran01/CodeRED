import React from "react";
import image from "../../assets/hero.jpg";
import LoginButton from "../Login/LoginButton";
import LogoutButton from "../Login/LogoutButton";

import {NavLink} from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div
        class="relative flex flex-col items-center justify-center min-h-screen bg-cover min-w-screen"
        style={{
          backgroundImage: 'url("/hero.png")',
        }}
      >
        <div class="absolute inset-0 w-full h-full bg-black bg-opacity-75"></div>

        <div class="flex max-w-6xl mx-auto">
          <div class="container relative flex flex-col w-1/2 px-10 pb-1 pr-12 text-2xl font-hairline text-white">
            <h2 class="relative z-20 text-5xl font-extrabold leading-tight text-red">
              CodeRED
              <br /> The All-in-One app for all your needs
            </h2>
            <p class="relative z-20 block mt-4 text-xl text-pink-light">
              At CodeRED we understand the need for hygienic washrooms, and value of supplies during periods along with the need to make people aware of the needs of a menstruating person.
            </p>
            <div class="flex mt-4">
              <NavLink to="/stores" className="flex items-center self-start justify-center px-5 py-3 mt-5 text-base font-medium leading-tight text-white transition duration-150 ease-in-out bg-indigo-600 border border-pink-dark rounded-lg shadow hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo md:py-4 md:text-lg md:px-8">
                Get Started
              </NavLink>
              <div>
                <LogoutButton />
                <LoginButton />
              </div>
            </div>
          </div>
          <div class="relative w-1/2 overflow-hidden rounded-lg shadow-2xl cursor-pointer group">
            <div class="absolute flex items-center justify-center w-full h-full bg-black bg-opacity-25">
              <span class="flex items-center justify-center w-20 h-20 bg-white bg-opacity-75 rounded-full">
                <svg
                  class="w-auto h-8 ml-1 text-indigo-600 fill-current"
                  viewBox="0 0 52 66"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 30.7L4.1.6C2.6-.4.8.9.8 2.9v60.3c0 2 1.8 3.3 3.3 2.3L50 35.3c1.5-1 1.5-3.6 0-4.6z"
                    fill-rule="nonzero"
                  />
                </svg>
              </span>
            </div>
            <img src={image} class="object-cover w-full h-full" alt="something"/>
          </div>
        </div>
      </div>
    </div>
  );
}
