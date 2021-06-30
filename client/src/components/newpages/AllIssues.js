import React, { useState ,useEffect} from "react";
import Modal from "react-modal";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

export default function AllIssues() {
  const {user} = useAuth0();

  // MODAL
  //Modal.setAppElement("#yourAppElement");
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // FORM
  const [formData, setFormData] = useState({
    lat:0,
    lng:0,
    Title: "",
    Description: "",
    isAccepted: false,
    isCounsellorRequired:false,
  isSingleParent:false,
  isUnder18:false,
  ownerEmail : user.email,
  });

  const { lat,lng, Title,Description,isAccepted,isCounsellorRequired,isSingleParent,isUnder18, ownerEmail} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onTick = (e) => {
      setFormData({ ...formData, [e.target.name]: true });
    };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const newQuery = {
      lat,
      lng,
      Title,
      Description,
      isAccepted,
      isCounsellorRequired,
    isSingleParent,
    isUnder18,
    ownerEmail,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newQuery);
      const res = await axios.post("http://localhost:4000/api/query/newQuery", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  // FETCH ISSUES
  const [issues,setIssues]= React.useState([]);
  
  const fetchUrl = 'http://localhost:4000/api/query/allQueries'
  useEffect(()=>{
    async function fetchIssues(){
      const request = await axios.get(fetchUrl);
    setIssues(request.data);
    return request;
    }
    fetchIssues();},
  [issues]);

  return (
    <div class="bg-pink-light body-font">
      <div class="pb-1 text-center text-gray-700 bg-cover">
        <div class="container relative max-w-2xl px-5 pt-12 mx-auto sm:py-12 lg:px-0">
          <h2 class="mb-10 text-4xl font-extrabold leading-10 tracking-tight text-left text-gray-900 sm:text-5xl sm:leading-none md:text-6xl sm:text-center">
            Raise an <span class="inline-block text-pink-dark">Issue</span>
          </h2>
          <p class="mt-5 text-xl text-left opacity-75 sm:text-center">
            Here are some awesome features that we really think you'll like.
            With features like this you'll want to punch yourself in the face
            for not signing up sooner.
          </p>
        </div>
      </div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="bg-pink"
      >
      <section>
        <div class="container items-center py-12 lg:px-20 mx-auto">
        <button onClick={closeModal}>close</button>
          <form
            class="flex flex-col w-full mx-auto p-10 px-8 pt-6 my-6 mb-4 transition duration-500 ease-in-out transform  rounded-lg lg:w-1/2"
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div class="flex flex-wrap mb-6 -mx-3">
              <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="text-base leading-7 text-blueGray-500"
                  for="grid-title"
                >
                  {" "}
                  Title{" "}
                </label>
                <input
                  class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  id="grid-title"
                  type="text"
                  name="Title"
                  placeholder="Issue Title"
                  required=""
                  value={Title}
                  onChange={onChange}
                />
              </div>
              <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="text-base leading-7 text-blueGray-500"
                  for="grid-url"
                >
                  Latitude
                </label>
                <input
                  class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  id="grid-url"
                  type="number"
                  name="lat"
                  placeholder="latitude"
                  required=""
                  value={lat}
                  onChange={onChange}
                />
              </div>
              <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label
                  class="text-base leading-7 text-blueGray-500"
                  for="grid-url"
                >
                  Longitude
                </label>
                <input
                  class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  id="grid-url"
                  type="number"
                  name="lng"
                  placeholder="longitude"
                  required=""
                  value={lng}
                  onChange={onChange}
                />
              </div>
            </div>
            <div class="flex flex-wrap mb-6 -mx-3">
              <div class="w-full px-3">
                <label
                  class="text-base leading-7 text-blueGray-500"
                  for="description"
                >
                  {" "}
                  Description{" "}
                </label>
                <textarea
                  class="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-blueGray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 apearance-none autoexpand"
                  id="description"
                  type="text"
                  name="Description"
                  placeholder="Message..."
                  value={Description}
                  onChange={onChange}
                  required
                ></textarea>
              </div>
            </div>
            <div class="flex flex-wrap mb-2 -mx-3">
              <div class="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                <label class="text-base leading-7 text-blueGray-500" for="date">
                  Type of the issue
                </label>
                <div class="relative ">
                <span className="mt-2 mb-1 flex items-center">
                <input
                  type="checkbox"
                  name="isCounsellorRequired"
                  value={isCounsellorRequired}
                  onChange={onTick}
                  className="absolute h-5 w-5 opacity-0"
                />
                <div class="bg-white border-2 border-pink-dark w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:pink">
                  <svg
                    class="fill-current hidden w-3 h-3 text-pink-dark pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#B6465F"
                        fill-rule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <label className="ml-2 text-lg">Counsellor Required</label>
              </span>
              <span className="mt-2 mb-1 flex items-center">
                <input
                  type="checkbox"
                  name="isSingleParent"
                  value={isSingleParent}
                  onChange={onTick}
                  className="absolute h-5 w-5 opacity-0"
                />
                <div class="bg-white border-2 border-pink-dark w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:pink">
                  <svg
                    class="fill-current hidden w-3 h-3 text-pink-dark pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#B6465F"
                        fill-rule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <label className="ml-2 text-lg">Are you a single parent?</label>
              </span>
              <span className="mt-2 mb-1 flex items-center">
                <input
                  type="checkbox"
                  name="isUnder18"
                  value={isUnder18}
                  onChange={onTick}
                  className="absolute h-5 w-5 opacity-0"
                />
                <div class="bg-white border-2 border-pink-dark w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 focus-within:pink">
                  <svg
                    class="fill-current hidden w-3 h-3 text-pink-dark pointer-events-none"
                    version="1.1"
                    viewBox="0 0 17 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="none" fill-rule="evenodd">
                      <g
                        transform="translate(-9 -11)"
                        fill="#B6465F"
                        fill-rule="nonzero"
                      >
                        <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <label className="ml-2 text-lg">Are you under 18?</label>
              </span>

                  
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-blueGray-500">
                    <svg
                      fill="#ffffff"
                      class="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center w-full pt-4">
              <button
                class="w-full py-3 text-base font-semibold text-white transition duration-500 ease-in-out transform bg-pink-dark rounded-md focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 hover:bg-blue-800 "
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
      </Modal>
      <section>
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
          {issues.map((issue) => (
               <div class="p-4 md:w-1/3">
               <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                 <img
                   class="lg:h-48 md:h-36 w-full object-cover object-center"
                   src="https://dummyimage.com/720x400"
                   alt="blog"
                 />
                 <div class="p-6">
                   <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                     {((issue.isUnder18)?"Under 18":"")}
                     
                   </h2>
 
                   <h2 class="title-font text-lg font-medium text-gray-900 mb-3">
                   {issue.Title}
                   </h2>
                   <p class="leading-relaxed mb-3">
                   {issue.Description}
                   </p>
                
                 </div>
               </div>
             </div>
          ))}
         
          </div>
        </div>
      </section>
    </div>
  );
}
