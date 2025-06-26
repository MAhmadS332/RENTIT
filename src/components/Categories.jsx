import React, { useState } from "react";
import Tabs from "./UI components/Tabs";

const Categories = (props) => {
  const tabItems = [
    { name: "Resorts", img: "/imgs/cat_icons/1.webp" },
    { name: "Rooms", img: "/imgs/cat_icons/2.jpg" },
    { name: "Apartments", img: "/imgs/cat_icons/3.jpg" },
    { name: "Amazing Views", img: "/imgs/cat_icons/4.jpg" },
    { name: "Houses", img: "/imgs/cat_icons/5.jpg" },
  ];
  return <Tabs tabItems={tabItems} category={props.category} setSelCategory = {props.setSelCategory} disabled = {props.disabled} />;
};

export default Categories;
