import React from "react";

const Tabs = (props) => {
  return (
    <>
      <div
        className={`flex gap-5 flex-nowrap justify-center sticky top-0 shadow-sm p-2 shadow-gray-500 bg-white
         overflow-auto`}
      >
        {props.tabItems.map((tabItem, index) => (
          <button
            key={index}
            onClick={() => {
              if (props.disabled) return;
              if (props.category === tabItem.name) {
                props.setSelCategory("");
              } else {
                props.setSelCategory(tabItem.name);
              }
            }}
            className={` flex flex-col items-center bg-transparent text-gray-500 border-b-2 box-border ${
              props.disabled ? "" : "hover:text-black"
            } whitespace-nowrap ${
              props.category === tabItem.name && !props.disabled
                ? "border-black text-black"
                : ""
            }`}
          >
            {tabItem.img ? (
              <img
                src={tabItem.img}
                alt={tabItem.name + " icon"}
                height={18}
                width={18}
              />
            ) : (
              ""
            )}
            <span className="text-xs">{tabItem.name}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Tabs;
