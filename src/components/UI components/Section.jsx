import React from "react";

const Section = (props) => {
  return (
    <section className="border-gray-300 border-b-2 py-10 sm:w-1/3 text-sm flex flex-col gap-2">
      <h3 className="font-bold">{props.title}</h3>
      <ul className="flex flex-col gap-2">
        {props.links.map((link, index) => (
          <li key={index} className="font-thin">
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Section;
