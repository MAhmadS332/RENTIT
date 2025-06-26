import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

// Table component to display booking information
const BookingTable = ({ bookings, removeBooking }) => {
  const ADMIN_ID = import.meta.env.VITE_ADMIN_ID;
  const authContext = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(false);
  const deleteHandler = async (id) => {
    setIsLoading(true);
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
      toast.success("Booking Removed Successfully");
      setIsLoading(false);
    } catch (err) {
      toast.error("Error Removing Booking");
      console.log(err);
      setIsLoading(false);
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
      <Toaster />
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
