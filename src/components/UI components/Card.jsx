import React, { useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const Card = (props) => {
  const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  const authContext = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = React.useState(false);
  const deleteHandler = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${
          authContext.user.userId !== ADMIN_ID
            ? BACKEND_URL + "/api/listings/" + id
            : BACKEND_URL + "/api/listings/admin/" + id
        }`,
        {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        }
      );
      toast.success("Listing Removed Successfully");
      props.removeItem(id);
      setIsLoading(false);
    } catch (err) {
      toast.error("Failed to remove listing");
      console.log(err);
      setIsLoading(false);
    }
  };
  // img: "/public/imgs/card_imgs/1.webp",
  // title: "Mashobra, India",
  // type: "Entire Home",
  // info: { guests: 5, bedrooms: 3, bathrooms: 2 },
  // pricePerNight: "$190",
  // rating: "3",
  return (
    <>
      <Toaster />
      <Link className="flex flex-col w-full" to={`/listings/${props.item.id}`}>
        <img
          className="rounded-2xl w-screen md:h-60 h-full object-center object-cover"
          src={props.item.img}
          alt={props.item.title + " icon"}
        />
        <div className="flex gap-3 items-center">
          <div className="flex flex-col w-max px-2">
            <span className="font-bold text-lg sm:text-lg flex justify-between items-center mt-2">
              {props.item.title}, {props.item.location}
            </span>
            <span className="font-normal text-xs flex items-center">{`⭐${props.item.rating} / 5`}</span>
            <span className="text-xs sm:text-sm font-bold mt-1">
              Type: <span className="font-normal">{props.item.type}</span>
            </span>
            <span className="text-xs sm:text-sm ">{`${props.item.info.bedrooms} bedrooms, ${props.item.info.bathrooms} bathrooms,`}</span>
            <span className="text-xs sm:text-sm ">{`${props.item.info.guests} guests allowed`}</span>
            <span className=" mt-1">
              <span className="font-bold text-sm sm:text-base">
                {props.item.pricePerNight}
              </span>{" "}
              per night
            </span>
          </div>
          {props.allowDelete && (
            <div className="flex justify-center justify-self-end ml-auto mr-2">
              <div
                className="bg-red-500 text-white p-1 rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  deleteHandler(props.item.id);
                }}
              >
                {isLoading ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="17px"
                    fill="#e3e3e3"
                    className="animate-spin-slow"
                  >
                    <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="17px"
                    fill="white"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    </>
  );
};

export default Card;
