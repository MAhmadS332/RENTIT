import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/UI components/Loading";
import { AuthContext } from "../context/AuthContext";

const ListingDetails = () => {
  const authContext = useContext(AuthContext);

  let userId = null;
  let userToken = null;

  if (authContext.isLoggedIn && authContext.user) {
    userId = authContext.user.userId;
    userToken = authContext.token;
  }

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [listItem, setListItem] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const id = useParams().id;

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(BACKEND_URL + `/api/listings/${id}`);
        console.log(response.data);
        setListItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getItem();
  }, []);

  useEffect(() => {
    const checkBooked = async () => {
      console.log("Checking bookings for userId: ", userId);
      if (!userId) {
        return;
      } // If user is not logged in, no need to check bookings
      try {
        const response = await axios.get(
          BACKEND_URL + `/api/bookings/${userId}`,
          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        console.log(response.data);
        if (response.data && response.data.length > 0) {
          response.data.forEach((booking) => {
            if (booking.listingId === id) {
              setIsBooked(true);
              setCheckInDate(new Date(booking.checkIn).toLocaleDateString());
              setCheckOutDate(new Date(booking.checkOut).toLocaleDateString());
            } else {
              setIsBooked(false);
            }
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkBooked();
  }, [userId]);

  return (
    // id: 9,
    // img: "/imgs/card_imgs/9.webp",
    // title: "Bora Bora",
    // location: "French Polynesia",
    // type: "Overwater Bungalow",
    // info: { guests: 2, bedrooms: 1, bathrooms: 1 },
    // pricePerNight: "$500",
    // rating: "5",
    <>
      {!listItem && <Loading />}
      {listItem && (
        <div className="grid md:grid-cols-2 py-5 justify-center items-center gap-5">
          <img
            className="border-sky-500 border-2 p-0.5 ml-auto justify-self-right h-full max-h-96"
            src={listItem.img}
            alt={listItem.title + "'s Icon"}
          />
          <div className="m-auto w-full xl:w-3/4">
            <div className="text-2xl xl:text-3xl">{listItem.type} </div>
            <div className="font-bold xl:text-lg">
              in {listItem.title}, {listItem.location}
            </div>
            <div className="text-lg">
              ⭐ {listItem.rating} <span className="text-sm">/ 5</span>
            </div>
            <ul className="font-bold xl:text-2xl p-2 bg-gray-200 my-3">
              Details:
              <li className="font-normal text-sm xl:text-lg list-disc py-0.5 mx-5">
                {listItem.info.bedrooms} Bedrooms
              </li>
              <li className="font-normal text-sm xl:text-lg list-disc py-0.5 mx-5">
                {listItem.info.bathrooms} Bathrooms
              </li>
              <li className="font-normal text-sm xl:text-lg list-disc py-0.5 mx-5">
                {listItem.info.guests} Guests Allowed
              </li>
            </ul>
            <div className="">
              <div className="text-2xl xl:text-3xl flex gap-1 items-center py-3">
                {listItem.pricePerNight}
                <div className="text-sm">/night</div>
              </div>

              <div className="w-max bg-sky-500 font-bold my-1 text-gray-50 xl:text-xl hover:bg-gray-300 hover:text-gray-950 shadow-sm shadow-gray-400 p-2 box-border">
                {!isBooked && <Link to={`/book/${listItem.id}`}>Book Now</Link>}
                {isBooked && (
                  <div>
                    Booked between {checkInDate} and {checkOutDate}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListingDetails;
