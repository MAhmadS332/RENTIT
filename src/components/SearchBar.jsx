import React, { useState } from "react";

const SearchBar = ({setSearchText}) => {
  const [input, setInput] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setSearchText(input);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit ={submitHandler} className=" border-gray-500 border flex items-center w-2/3 sm:w-1/3 rounded-full p-2 gap-2">
        <input
          className="p-1 text-sm ps-2 w-full outline-none box-border"
          value={input}
          placeholder="Search..."
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <button className="bg-sky-400 rounded-full p-1" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="white"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
