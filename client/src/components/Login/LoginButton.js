import React from 'react';

import {useAuth0} from '@auth0/auth0-react';

const LoginButton = () => {
    // const login = async() => {
    //     const domain = "dev-3wsto-4w.us.auth0.com";
    //     const audience = "http://localhost:4000";
    //     const scope = "read:appointments";
    //     const clientId = "FkoTeT7jfXPc6R6sI9jf7jcMvnY3oC5T";
    //     const responseType = "code";
    //     const redirectUri = "http://localhost:3000/appointments";

    //     const response = await fetch(
    //         `https://${domain}/authorize?` +
    //         `audience=${audience}&`+
    //         `scope=${scope}&`+
    //         `response_type=${responseType}&`+
    //         `client_id=${clientId}&`+
    //         `redirect_uri=${redirectUri}`
    //         ,{
    //             redirect:"manual",
    //         }
    //     );
    //         console.log(JSON.stringify(response));
    //     window.location.replace(response.url);
    // };
    const {isAuthenticated,loginWithRedirect} = useAuth0();
  return (
    !isAuthenticated && (

    <button className="flex items-center self-start justify-center px-5 py-3 mt-5 ml-5 text-base font-medium leading-tight text-indigo-500 transition duration-150 ease-in-out bg-pink-dark border-transparent rounded-lg shadow hover:bg-white focus:outline-none focus:border-gray-100 focus:shadow-outline-gray md:py-4 md:text-lg md:px-8" onClick={loginWithRedirect}>
        Log in 
    </button>
    )    

  );
}

export default LoginButton;
