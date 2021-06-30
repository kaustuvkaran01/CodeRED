import React, { useState } from "react";
import FormIcon from "../../assets/Forms/ShopName.svg";
import axios from "axios";

export default function StoreForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    addressLineOne: "",
    addressLineTwo: "",
    city: "",
    state: "",
    code: "",
    country: "",
    latitude: null,
    longitude: null,
  });

  const {
    name,
    contact,
    addressLineOne,
    addressLineTwo,
    city,
    state,
    code,
    country,
    latitude,
    longitude,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // const newStore = {
    //   name,
    //   contact,
    //   addressLineOne,
    //   addressLineTwo,
    //   city,
    //   state,
    //   code,
    //   country,
    // };
    // try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const body = JSON.stringify(newStore);
    //   const res = await axios.post("/api/v1/stores", body, config);
    //   console.log(res.data);
    // } catch (err) {
    //   console.error(err.response.data);
    // }
  };

  return (
    <>
      <div className="flex flex-col w-full max-w-md px-4 py-8  rounded-lg  dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
          Register your store
        </div>
      </div>
    </>
  );
}
