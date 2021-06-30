import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as GrIcons from "react-icons/gr";
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";

export default function Issues() {
  // const { user } = useAuth0();
  // FETCH ISSUES
  const [issues, setIssues] = React.useState([]);

  const fetchUrl = "http://localhost:4000/api/query/allQueries";
  useEffect(() => {
    async function fetchIssues() {
      const request = await axios.get(fetchUrl);
      setIssues(request.data);
      // console.log(request.data);
      return request;
    }
    fetchIssues();
  }, [issues]);
  // const [accepted, setAccepted] = useState({
  //   isAccepted: false,
  //   ownerEmail: user.email,
  // });

  function setTrigger(e) {
    console.log(e._id);
    // const id = e._id;
    try{
      const config = {
        headers: {
          "Content-Type" : "application/json",
        }
      };
      const body = {id:e._id}
      const res = axios.post("http://localhost:4000/api/query/acceptQuery",body,config);
      console.log(res.data);
    } catch(err){
      console.error(err.response.data);
    }
  }
  // change accepted
  // const onClick = (e) => {
  //   setAccepted(!accepted);
  // };
  return (
    <div>
      <div class="container items-center px-5 py-12 lg:px-20 flex flex-col space-y-3">
        {issues.map((issue) => (
          <div class="p-6 mx-auto bg-white rounded-lg shadow-xl lg:w-1/2">
            <div class="flex flex-col items-start py-2 rounded-lg lg:flex-row">
              {/* <div class="flex items-center justify-center w-full lg:justify-start lg:w-1/2">
                  <img src="https://dummyimage.com/200x200/F3F4F7/8693ac" alt="placeholder" class="rounded-lg"/>
                </div> */}
              <div class="flex flex-col w-full text-blueGray-500 lg:ml-4">
                <h2 class="mt-4 mb-2 text-xs font-semibold tracking-widest text-black uppercase lg:mt-0 title-font">
                  {issue.isUnder18 ? "Under 18" : ""} &nbsp;{" "}
                  {issue.isSingleParent ? "Single Parent" : ""}
                </h2>
                <h2 class="mb-4 text-xl font-semibold tracking-widest text-black uppercase lg:mt-0 title-font">
                  {" "}
                  {issue.Title}{" "}
                </h2>
                <p class="mb-3 text-base leading-relaxed text-blueGray-500">
                  {" "}
                  {issue.Description}
                </p>
                <div class="flex flex-row space-x-2 items-center justify-left">
                  <span class="mt-4 mb-2 text-xl font-semibold tracking-widest text-black uppercase lg:mt-0 title-font">
                    {" "}
                    <GrIcons.GrMapLocation />
                  </span>
                  <p class="mb-2 text-base leading-relaxed text-blueGray-500">
                    {" "}
                    Location of Issue
                  </p>
                </div>
                <Link to="/video" class="flex flex-row space-x-2 items-center justify-left border"><span class="mt-4 mb-2 text-xl font-semibold tracking-widest text-black uppercase lg:mt-0 title-font"> <MdIcons.MdDateRange /></span>
                  <p class="text-base leading-relaxed text-blueGray-500"> {((issue.isAccepted)?"Accepted":"Pending") }</p>
                </Link>{
                  issue.isCounsellorRequired === true &&
                  <div class="flex flex-row space-x-2 text-white mt-3 items-center"><button class="flex flex-row bg-pink-dark rounded-full p-1.5"><span class="mt-4 mb-2 text-xl font-semibold tracking-widest uppercase lg:mt-0 title-font"> <BiIcons.BiSupport/></span>
                  <p class="text-base leading-relaxed "> Counsellor Needed</p></button>
                  <button class="flex flex-row bg-pink-dark rounded-full p-1.5">
                  <p class="text-base leading-relaxed "> Schedule Meeting </p></button>
                </div> 
                }
                </div>
                <button class="flex flex-row space-x-2 items-center justify-left border">
                  <span class="mt-4 mb-2 text-xl font-semibold tracking-widest text-black uppercase lg:mt-0 title-font">
                    {" "}
                    <MdIcons.MdDateRange />
                  </span>
                  <p class="text-base leading-relaxed text-blueGray-500">
                    {" "}
                    {issue.isAccepted ? "Accepted" : "Pending"}
                  </p>
                </button>
                {issue.isCounsellorRequired === true && (
                  <div class="flex flex-row space-x-2 text-white mt-3 items-center">
                    <button class="flex flex-row bg-pink-dark rounded-full p-1.5">
                      <span class="mt-4 mb-2 text-xl font-semibold tracking-widest uppercase lg:mt-0 title-font">
                        {" "}
                        <BiIcons.BiSupport />
                      </span>
                      <p class="text-base leading-relaxed ">
                        {" "}
                        Counsellor Needed
                      </p>
                    </button>
                    <button
                      class="flex flex-row bg-pink-dark rounded-full p-1.5"
                      onClick={() => setTrigger(issue)}
                    >
                      <p class="text-base leading-relaxed ">
                        {" "}
                        Schedule Meeting{" "}
                      </p>
                    </button>
                  </div>
                )}
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
