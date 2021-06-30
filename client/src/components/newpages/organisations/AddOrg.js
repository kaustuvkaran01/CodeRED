import React from 'react'
import FormIcon from "../../../assets/Forms/ShopName.svg";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

export default function AddOrg() {

// USER
  const {user} = useAuth0();

  const [formData, setFormData] = React.useState({
    Name: "",
    website:"",
    contact:0,
    description:"",
    ownerEmail : user.email,
  });
  
  const {
    Name,
    website,
    contact,
    description,
    ownerEmail,
  } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = async (e) => {
   
    e.preventDefault();
    const newOrg = {
      Name,
      website,
      contact,
      description,
      ownerEmail,
    };
    console.log(newOrg);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newOrg);
      const res = await axios.post("http://localhost:4000/api/orgs/newOrg", body, config);
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

    return (
        <div className="bg-pink-light">
           <div className=" max-w-md mx-auto pb-4">
        <form action="#" autoComplete="off" onSubmit={onSubmit}>
          <div className="flex flex-col mb-2">
            <div className="flex relative mt-4 ">
              <span className="rounded-l-lg inline-flex items-center px-3  border-b bg-white border-pink-dark text-pink shadow-sm text-2xl">
                <img src={FormIcon} alt="" />
              </span>
              <input
                type="text"
                name="Name"
                value={Name}
                onChange={onChange}
                className=" rounded-r-lg flex-1 appearance-none border-b border-pink-dark w-full py-2.5 px-4 bg-white text-gray-700 placeholder-pink shadow-sm text-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Organisation Name"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative mt-4 ">
              <span className="rounded-l-lg inline-flex items-center px-3  border-b bg-white border-pink-dark text-pink shadow-sm text-2xl">
                <img src={FormIcon} alt="" />
              </span>
              <input
                type="text"
                name="website"
                value={website}
                onChange={onChange}
                className=" rounded-r-lg flex-1 appearance-none border-b border-pink-dark w-full py-2.5 px-4 bg-white text-gray-700 placeholder-pink shadow-sm text-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Organisation Website"
              />
            </div>
          </div>
      
          <div className="flex flex-col mb-2">
            <div className="flex relative mt-4 ">
              <span className="rounded-l-lg inline-flex items-center px-3  border-b bg-white border-pink-dark text-pink shadow-sm text-2xl">
                <img src={FormIcon} alt="" />
              </span>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={onChange}
                className=" rounded-r-lg flex-1 appearance-none border-b border-pink-dark w-full py-2.5 px-4 bg-white text-gray-700 placeholder-pink shadow-sm text-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Describe your org"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="flex relative mt-4 w-3/4">
              <span className="rounded-l-lg inline-flex items-center px-3 border-b bg-white border-pink-dark text-pink shadow-sm text-2xl">
                <img src={FormIcon} alt="" />
              </span>
              <input
                type="number"
                name="contact"
                value={contact}
                onChange={onChange}
                className="rounded-r-lg flex-1 appearance-none border-b border-pink-dark  py-2.5 px-4 bg-white text-gray-700 placeholder-pink shadow-sm text-xl focus:outline-none"
                placeholder="Average Price"
              />
            </div>
          </div>
          <div className="flex w-full my-8 mx-auto">
            <button
              type="submit"
              className="py-2 px-4  bg-pink-dark hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              ADD STORE
            </button>
          </div>
        </form>
      </div>
        </div>
    )
}
