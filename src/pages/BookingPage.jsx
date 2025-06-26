import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/UI components/Loading";
import toast, { Toaster } from "react-hot-toast";

const BookingPage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const id = useParams().id;
  const [item, setItem] = useState(null);
  const [previousCheckOut, setPreviousCheckOut] = useState("");
  const [previousCheckIn, setPreviousCheckIn] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalDays, setTotalDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  const inputStyle = "border border-sky-500 text-base px-1 py-0.5";
  const dateDiff = (date1, date2) => {
    const date_1 = new Date(date1);
    const date_2 = new Date(date2);
    const dateDiff = date_2 - date_1;
    return dateDiff;
  };

  const getDate = (increment = 0) => {
    const curr = new Date();
    curr.setDate(curr.getDate() + increment);
    const date = curr.toISOString().substring(0, 10);
    return date;
  };

  //form state mgmt.
  const [formData, setFormData] = useState({
    listingId: id,
    name: authContext.user.name || "",
    email: authContext.user.email || "",
    phone: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setPreviousCheckIn(formData.checkIn);
    setPreviousCheckOut(formData.checkOut);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        BACKEND_URL + "/api/bookings",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authContext.token,
          },
        }
      );

      navigate("/listings/" + id);
    } catch (err) {
      toast.error("Failed to book listing");
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const itemData = await axios.get(BACKEND_URL + `/api/listings/${id}`);
        setItem(itemData.data);
        setTotalAmount(itemData.data.pricePerNight);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
    setLoading(false);
  }, []);

  //form dates valudation
  useEffect(() => {
    setFormData({ ...formData, checkIn: getDate(), checkOut: getDate(1) });
  }, []);

  useEffect(() => {
    const date = getDate();
    if (dateDiff(date, formData.checkIn) < 0) {
      setFormData({ ...formData, checkIn: previousCheckIn });
    } else if (dateDiff(formData.checkIn, formData.checkOut) <= 0) {
      setFormData({ ...formData, checkIn: previousCheckIn });
    }
  }, [formData.checkIn]);

  useEffect(() => {
    if (dateDiff(formData.checkIn, formData.checkOut) <= 0) {
      setFormData({ ...formData, checkOut: previousCheckOut });
    }
  }, [formData.checkOut]);

  useEffect(() => {
    setTotalDays(
      Math.floor(
        dateDiff(formData.checkIn, formData.checkOut) / (1000 * 60 * 60 * 24)
      ).toString()
    );
  }, [formData.checkOut, formData.checkIn]);

  useEffect(() => {
    if (!item) return;
    setTotalAmount(
      "Rs. " + parseInt(totalDays) * parseInt(item.pricePerNight.substring(3))
    );
  }, [totalDays]);

  // useEffect(() => {
  //   setTotalAmount(totalDays * parseInt(item.pricePerNight.substring(1)));
  // }, [totalDays]);

  return (
    <div className="py-10 my-10">
      <Toaster />
      {!item && <Loading />}
      {!authContext.isLoggedIn && <h1>Please Login to Book</h1>}
      {item && authContext.isLoggedIn && (
        <form
          className="flex flex-col md:flex-row items-center gap-5 justify-around"
          onSubmit={formSubmitHandler}
        >
          <div className="w-full md:w-max flex flex-col gap-5 bg-white md:p-5">
            <h1 className="text-xl font-bold">
              Booking for {item.type} in {item.title}, {item.location}
            </h1>
            <div className="flex flex-col md:flex-row gap-5 justify-start md:items-center">
              <div className="flex flex-col gap-1">
                <label>Name</label>
                <input
                  className="border border-sky-500 text-base px-1 py-0.5"
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  maxLength={30}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Email</label>
                <input
                  className={inputStyle}
                  name="email"
                  placeholder="Enter your email"
                  maxLength={30}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label>Phone</label>
              <input
                className={inputStyle}
                name="phone"
                placeholder="Enter your phone number"
                type="tel"
                min={10000000000}
                max={99999999999}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col md:flex-row gap-5 justify-start md:items-center">
              <div className="flex flex-col gap-1">
                <label>Check In</label>
                <input
                  className={inputStyle}
                  name="checkIn"
                  type="date"
                  value={formData.checkIn}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label>Check Out</label>
                <input
                  className={inputStyle}
                  name="checkOut"
                  type="date"
                  value={formData.checkOut}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="p-5 bg-gray-200 w-full md:w-1/2">
            <h1 className="font-bold text-xl">Summary of Your Reservation</h1>
            <ul className="p-2 flex flex-col gap-2 list-disc m-2">
              <li className="font-bold">
                Property Type: <span className="font-normal">{item.type}</span>
              </li>
              <li className="font-bold">
                Location:{" "}
                <span className="font-normal">
                  {item.title}, {item.location}
                </span>
              </li>

              <li className="font-bold">
                Check In Date:{" "}
                <span className="font-normal">
                  {formData.checkIn ? formData.checkIn : "Not Selected"}
                </span>
              </li>
              <li className="font-bold">
                Check Out Date:{" "}
                <span className="font-normal">
                  {formData.checkOut ? formData.checkOut : "Not Selected"}
                </span>
              </li>
              <li className="list-none bg-gray-300 p-2">
                <ul className="flex flex-col gap-1">
                  <li className="font-bold">
                    Price:{" "}
                    <span className="font-normal">
                      {item.pricePerNight}/night
                    </span>
                  </li>
                  <li className="font-bold">
                    Stay for <span className="text-xl">{totalDays}</span>{" "}
                    night(s)
                  </li>
                  <li className="font-bold">
                    Total Amount to be Paid:{" "}
                    <span className="font-normal">
                      {totalAmount ? totalAmount : "Not Calculated"}
                    </span>
                  </li>
                </ul>
              </li>
            </ul>
            <button
              type="submit"
              className="bg-sky-500 px-1 py-2 w-full hover:bg-gray-300 hover:text-gray-900 font-bold text-gray-200"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingPage;
