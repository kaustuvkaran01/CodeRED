import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const ProfileData = [
  {
    title: "Find a store and restroom",
    path: "/stores",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Raise an issue",
    path: "/issues",
    icon: <FaIcons.FaCodepen />,
  },
  {
    title: "Add a store",
    path: "/addstores",
    icon: <AiIcons.AiOutlineFundProjectionScreen />,
  },
  {
    title: "Add a washroom",
    path: "/addwashroom",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoIcons.IoMdChatboxes />,
  },
  {
    title: "Add Organisation ",
    path: "/addOrg",
    icon: <IoIcons.IoIosPaper />,
  },
    {
    title: "View My Organisation ",
    path: "/organisation",
    icon: <IoIcons.IoIosPaper />,
  },
];
