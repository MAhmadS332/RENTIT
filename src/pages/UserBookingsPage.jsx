import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/UI components/Loading";
import { useParams } from "react-router-dom";
import BookingTable from "../components/BookingTable";
import { AuthContext } from "../context/AuthContext";
import NothingToShow from "../components/UI components/NothingToShow";
import Error from "../components/UI components/Error";

const UserBookingsPage = () => {
  const authContext = useContext(AuthContext);
  const userId = useParams().userId;
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [listItems, setListItems] = useState(null);
  const [error, setError] = useState(false);

  const removeBooking = (bookingId) => {
    setListItems(listItems.filter((item) => item.id !== bookingId));
  };

  useEffect(() => {
    const getListItems = async () => {
      try {
        const response = await axios.get(
          BACKEND_URL + "/api/bookings/" + userId,
          {
            headers: {
              Authorization: "Bearer " + authContext.token,
            },
          }
        );
        console.log(response.data);
        setListItems(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getListItems();
  }, []);

  return (
    <>
      {!listItems && !error && <Loading />}
      {!listItems && error && <Error />}
      {listItems && listItems.length === 0 && <NothingToShow />}
      {listItems && listItems.length > 0 && (
        <BookingTable bookings={listItems} removeBooking={removeBooking} />
      )}
    </>
  );
};

export default UserBookingsPage;
