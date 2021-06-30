import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/navLogo.svg";
import LoginButton from './Login/LoginButton';
import LogoutButton from './Login/LogoutButton';

export default function Navbar() {
  return (
    <div>
      <header className="p-4 text-pink-light">
        <div className="container flex justify-between h-16 mx-auto">
          <div className="flex">
            <Link to="/" className="flex items-center p-2 mx-4">
              <img src={Logo} alt="" />
            </Link>
            <ul className="items-stretch hidden space-x-4 lg:flex py-3">
              <li className="flex bg-red-dark rounded ">
                <Link to="/" className="flex items-center -mb-0.5  px-4 ">
                  Link
                </Link>
              </li>
              <li className="flex bg-red-dark rounded ">
                <Link to="/" className="flex items-center -mb-0.5  px-4  ">
                  Link
                </Link>
              </li>
              <li className="flex bg-red-dark rounded ">
                <Link to="/" className="flex items-center -mb-0.5  px-4 ">
                  Link
                </Link>
              </li>
              <li className="flex bg-red-dark rounded ">
                <Link href="/user" className="flex items-center -mb-0.5  px-4 ">
                  Link
                </Link>
              </li>
            </ul>
          </div>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <Link to="/shop">
              <button className="px-8 py-3 font-semibold rounded bg-red-dark ">
                Register Here
              </button>
            </Link>
            <div>
              <LoginButton />
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-red-dark"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}
