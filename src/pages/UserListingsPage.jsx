import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import UserListingCard from "../components/UserListingCard";
import Loading from "../components/UI components/Loading";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NothingToShow from "../components/UI components/NothingToShow";
import Error from "../components/UI components/Error";

const UserListingsPage = () => {
  const authContext = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const userId = useParams().userId;
  const [listItems, setListItems] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getListItems = async () => {
      try {
        const response = await axios.get(
          BACKEND_URL + "/api/listings/user/" + userId,
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
      {!listItems &&  !error &&<Loading />}
      {!listItems && error  && <Error />}
      {listItems && listItems.length === 0 && <NothingToShow />}
      {listItems && (
        <Link
          to="/listing/add"
          className="p-2 px-4 text-2xl font-bold bg-sky-500 text-white rounded-3xl fixed top-full left-full -translate-x-20 -translate-y-20"
        >
          +
        </Link>
      )}
      {listItems && listItems.length > 0 && <UserListingCard listItems={listItems} setListItems={setListItems} />}
    </>
  );
};

export default UserListingsPage;
