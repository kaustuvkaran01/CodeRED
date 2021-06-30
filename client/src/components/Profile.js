import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from "react-json-pretty";

// Importing Content
import { ProfileData } from "./content/Profile";

const Profile = () => {
  const { user, isAuthenticated} = useAuth0();
  // const [userMetadata, setUserMetadata] = useState(null);
  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = "dev-3wsto-4w.us.auth0.com";

  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         audience: `https://${domain}/api/v2/`,
  //         scope: "read:current_user",
  //       });

  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { user_metadata } = await metadataResponse.json();

  //       setUserMetadata(user_metadata);

  //       console.log(accessToken);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };

  //   getUserMetadata();
  // }, []);
  return (
    isAuthenticated && (
      <div>
        {/* <img src={user.picture} alt={user.name} /> */}
        {/* <h2>{user.name}</h2> */}
        {/* <p>{user.email}</p> */}
        {/* <JSONPretty data={user} /> */}
        {/* <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )} */}
        {/* {JSON.stringify(user,null,2)} */}
        {/* <div class="container items-center px-5 py-12 lg:px-20">
            <div class="flex flex-wrap ">
              <div class="w-full mx-auto my-4 bg-white border rounded-lg shadow-xl lg:w-1/4">
                <div class="p-6"> */}
        {/* <h2 class="mb-8 text-xs font-semibold tracking-widest text-black uppercase title-font"> Hi, {user.name}</h2> */}
        {/* <h4 class="mb-8 text-2xl font-semibold leading-none tracking-tighter text-black lg:text-3xl title-font "> Hi, {user.name}</h4>
                  <p class="mb-3 text-base leading-relaxed text-blueGray-500"> If any Environment Variables values are changed between Deployments, deduplication will always be bypassed. </p>
                  <p></p>
                  <button class="w-full px-16 py-2 my-2 text-base font-medium text-white transition duration-500 ease-in-out transform border-black rounded-md bg-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blueGray-900 "> Button </button> */}
        {/* </div>
              </div>
            </div>
          </div> */}
        <div class="bg-pink-light h-screen">
          <div class="max-w-6xl px-6 py-8 mx-auto md:px-12">
            <div class="items-center -mx-6 md:flex md:-mx-12 mt-12">
              <div class="w-full px-6 md:w-1/2 md:px-12 mx-auto">
                <div class="flex flex-row items-center space-x-2"><img src={user.picture} alt={user.name} class="rounded-full"/>
                <h2 class="text-5xl font-normal text-red mb-2">Hello,</h2></div>
                
                <h2 class="text-3xl font-light text-red mb-8">
                  {user.name}
                </h2>
                {ProfileData.map((item, index) => {
                  return (
                    <Link
                      to={item.path}
                      class="flex mt-2.5 text-pink-dark hover:bg-pink hover:text-white p-2 rounded-md"
                      key={index}
                    >
                      <div class="text-2xl">{item.icon}</div>
                      <div class="ml-6">
                        <div class="text-lg ">{item.title}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
