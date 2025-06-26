import React from "react";
import Section from "./Section";

const FooterSections = () => {
  
  const support = [
    { text: "Help Center", href: "#" },
    { text: "Air Cover", href: "#" },
  ];
  const hosting = [
    { text: "Rent your home", href: "#" },
    { text: "AirCover for Hosts", href: "#" },
  ];
  const airbnb = [
    { text: "Newsroom", href: "#" },
    { text: "New features", href: "#" },
  ];
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <Section title={"Support"} links={support} />
      <Section title={"Hosting"} links={hosting} />
      <Section title={"Rent It"} links={airbnb} />
    </div>
  );
};

export default FooterSections;
