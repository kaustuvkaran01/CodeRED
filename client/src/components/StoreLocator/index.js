import React from "react";

//importing components
import About from "./About";
import AddStore from "./AddStore";
import FetchStore from "./FetchStore";

export default function StoreLocator() {
  return (
    <>
      <FetchStore />

      {/* <About />
      <AddStore /> */}
    </>
  );
}
