import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  // const logout = async() => {
  //     const domain = "dev-3wsto-4w.us.auth0.com";
  //     const clientId = "FkoTeT7jfXPc6R6sI9jf7jcMvnY3oC5T";
  //     const returnTo = "http://localhost:3000"
  //     const response = await fetch(
  //         `http://${domain}/logout?client_id=${clientId}&returnTo=${returnTo}`,
  //         {redirect:"manual"}
  //     );

  //     window.location.replace(response.url);
  // };
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button
        className="flex items-center self-start justify-center px-5 py-3 mt-5 ml-5 text-base font-medium leading-tight text-indigo-500 transition duration-150 ease-in-out bg-pink-dark border-transparent rounded-lg shadow hover:bg-white focus:outline-none focus:border-gray-100 focus:shadow-outline-gray md:py-4 md:text-lg md:px-8"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Log out
      </button>
    )
  );
};

export default LogoutButton;
