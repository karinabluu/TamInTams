import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "공지사항",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-button",
    modal: true,
  },
  {
    title: "나의 예약정보",
    icon: <FaIcons.FaCartPlus />,
    cName: "nav-button",
    modal: true,
  },
  {
    title: "로그아웃",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-button",
  },
];
