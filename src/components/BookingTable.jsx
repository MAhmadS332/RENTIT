import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

// Table component to display booking information
const BookingTable = ({ bookings, removeBooking }) => {
  const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  const authContext = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const deleteHandler = async (id) => {
    try {
      await axios.delete(
        authContext.user.userId !== ADMIN_ID
          ? BACKEND_URL + "/api/bookings/" + id
          : BACKEND_URL + "/api/bookings/admin/" + id,
        {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        }
      );
      removeBooking(id);
      console.log("Booking Removed Successfully");
    } catch (err) {
      console.log("Error Removing Booking");
      console.log(err);
    }
  };
  // Format date to a readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="overflow-x-auto my-8 text-xs md:text-sm xl:text-base">
      <h2 className="text-2xl py-2 font-bold text-sky-600">My Bookings</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Sr</th>
            <th className="px-4 py-2 text-left">Listing Id</th>

            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Check-in</th>
            <th className="px-4 py-2 text-left">Check-out</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <Link
                  className="underline text-sky-500"
                  to={"/listings/" + booking.listingId}
                >
                  {booking.listingId}
                </Link>
              </td>
              <td className="px-4 py-2">{booking.name}</td>
              <td className="px-4 py-2">{booking.email}</td>
              <td className="px-4 py-2">{booking.phone}</td>
              <td className="px-4 py-2">{formatDate(booking.checkIn)}</td>
              <td className="px-4 py-2">{formatDate(booking.checkOut)}</td>
              <td className="px-4 py-2 flex justify-center">
                {" "}
                <button
                  className="bg-red-500 text-white p-1 rounded-md"
                  onClick={() => deleteHandler(booking.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="22px"
                    viewBox="0 -960 960 960"
                    width="17px"
                    fill="white"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
