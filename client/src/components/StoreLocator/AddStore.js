import React from "react";

//IMPORTING COMPONENTS
import StoreForm from "./StoreForm";
import StoreMap from "./StoreMap";

export default function AddStore() {
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="absolute inset-0 bg-gray-300">
          <StoreMap width="100%" height="100%" />
        </div>
        <div class="container px-5 py-24 mx-auto flex">
          <div class="lg:w-1/3 md:w-1/2 bg-pink-light rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <div class="relative mb-4">
              <StoreForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
