import React from "react";
import Tabs from "./UI components/Tabs";
import FooterLinks from "./UI components/FooterLinks";
import FooterSections from "./UI components/FooterSections";
import FooterList from "./UI components/FooterList";

const Footer = () => {
  const tabItems = [
    {
      name: "Popular",
    },
    {
      name: "Arts & Culture",
    },
    {
      name: "Outdoors",
    },
    {
      name: "Mountains",
    },
    {
      name: "Beach",
    },
    {
      name: "Unique Styles",
    },
    {
      name: "Categories",
    },
    {
      name: "Things to do",
    },
    {
      name: "Travel tips & inspiration",
    },
    {
      name: "Airbnb-friendly apartments",
    },
  ];
  return (
    // <footer className="bg-stone-100 overflow-x-hidden -mx-8 p-8">
    //   <h3 className="text-2xl">Inspiration for future getaways</h3>
    //   <Tabs tabItems={tabItems} />
    //   <FooterList />
    //   <FooterSections />
    //   <FooterLinks />
    // </footer>
    <footer className="bg-stone-100 overflow-x-hidden p-5 justify-self-end mt-auto">
      <h3 className="text-2xl">Inspiration for future getaways</h3>
      <FooterSections />
      <FooterLinks />
    </footer>
  );
};

export default Footer;
