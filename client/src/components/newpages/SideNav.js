import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

export default function SideNav() {
  return (
    <div className="fixed bottom-44 right-4 space-y-4 flex flex-col z-50">
      <Link to="/profile">
        <FaIcons.FaUser size={30} />
      </Link>
    </div>
  );
}
