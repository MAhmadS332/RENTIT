import React from "react";
import Card from "./UI components/Card";

const UserListingCard = (props) => {
  const removeItem = (id) => {
    props.setListItems(props.listItems.filter((item) => item.id !== id));
  };

  return (
    // <div className="grid gri gap-6">
    /* <div className="my-5 flex justify-center gap-6 flex-wrap"> */
    <div
      className="grid my-5 gap-5 justify-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 0.25fr)" }}
    >
      {props.listItems.map((item) => (
        <Card
          key={item.id}
          item={item}
          allowDelete={true}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default UserListingCard;
