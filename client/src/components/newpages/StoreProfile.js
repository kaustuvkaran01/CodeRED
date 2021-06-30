import React,{useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";
import * as GoIcons from "react-icons/go";
import * as FaIcons from "react-icons/fa";

export default function StoreProfile() {
  const { storeId } = useParams();

  const readOnlyStars = {
    size: 30,
    value: 2.5,
    edit: false,
    color: "#D3D3D3",
  };
  const starRating = {
    size: 40,
    count: 7,
    isHalf: false,
    value: 4,
    color: "#D3D3D3",
    activeColor: "#FFEA00",
    onChange: (newValue) => {
      console.log(`Example 3: new value is ${newValue}`);
    },
  };

  useEffect(() => {
    fetch("http://localhost:4000/api/stores/oneStore", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            store_id: storeId
        })
    }).then(res => res.json())
        .then(data => {

            console.log(data);
            if (data.error) {
                console.log(data.error);
            }
            else {
                console.log(data)
            }
        }).catch(err => {
            //setErrorStatus(true)
            //setErrorMessage(err)
            console.log(err)
        })
}, [])

  return (
    <div className="bg-pink-light pb-3">
      <div
        class=" flex flex-col items-center justify-center h-52 bg-cover bg-center min-w-screen"
        style={{
          backgroundImage: 'url("/hero.png")',
        }}
      >
        <div class=" inset-0 w-full h-full bg-black bg-opacity-75"></div>
      </div>
      <div class=" w-screen">
        <div className="mx-auto max-w-sm bg-pink p-4 text-2xl text-center mt-4 space-y-4">
          <div>Name of the store</div>
          <div className="mx-24 w-full">
            <ReactStars {...readOnlyStars} />
          </div>
          <div className="text-sm"> {readOnlyStars.value} / 7 (Average)</div>

          {/* <ReactStars {...starRating} /> */}
        </div>
        <div className="mx-auto max-w-md p-3 text-xl mt-6 flex flex-row justify-start content-center items-center pb-3 border-b">
          <GoIcons.GoLocation />
          <span className="w-full text-left pl-8 font-light text-base">
            i have no idea what to write here but this seems cute so i made it
          </span>
        </div>
        <div className="mx-auto max-w-md p-3 text-xl mt-6 flex flex-row justify-start content-center items-center pb-3 border-b">
          <ImIcons.ImPriceTags />
          <span className="w-full text-left pl-8 font-light text-base">
            $ 20
          </span>
        </div>
        <div className="mx-auto max-w-md p-3 text-xl mt-6 flex flex-row justify-start content-center items-center pb-3 border-b">
          <BiIcons.BiTimeFive />
          <span className="w-full text-left pl-8 font-light text-base">
            Opens from 9:00 a.m. to 9 p.m.
          </span>
        </div>
        <div className="mx-auto max-w-md p-3 text-xl mt-6 flex flex-row justify-start content-center items-center pb-2">
          <FaIcons.FaPhoneAlt />
          <span className="w-full text-left pl-8 font-light text-base">
            6390261421
          </span>
        </div>
        <div className="mx-auto max-w-sm bg-pink p-4 text-2xl text-center mt-4">
          <div>Rate this store</div>
          <div className="text-sm mt-1">
            {" "}
            Tell us about your perception of social hygiene
          </div>
          <div className="mx-8 w-full mt-5">
            <ReactStars {...starRating} />
          </div>
          {/* <div className="text-sm"> {readOnlyStars.value} / 7 (Average)</div> */}
        </div>
      </div>
    </div>
  );
}
