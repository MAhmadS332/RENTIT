import React from "react";
import Card from "./UI components/Card";

const ListingCard = (props) => {
  return (
    // <div className="grid gri gap-6">
    /* <div className="my-5 flex justify-center gap-6 flex-wrap"> */
    <div
      className="grid my-5 gap-6 justify-center mx-3 sm:mx-5"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 0.25fr)" }}
    >
      {props.listItems.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ListingCard;
