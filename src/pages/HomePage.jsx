import axios from "axios";
import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import ListingCard from "../components/ListingCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/UI components/Loading";
import NothingToShow from "../components/UI components/NothingToShow";
import Error from "../components/UI components/Error";

const HomePage = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend URL: ", BACKEND_URL);
  const [listItems, setListItems] = useState(null);
  const [categoryItems, setCategoryItems] = useState(null);
  const [selCategory, setSelCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(false);
  const [disableCategory, setDisableCategory] = useState(false);

  const handleSearch = (input) => {
    setSearchText(input);
  };

  useEffect(() => {
    if (searchText === "") {
      setDisableCategory(false);
      setSelCategory("");
      setCategoryItems(listItems);
      return;
    }
    setDisableCategory(true);
    const getListItems = async () => {
      try {
        const response = await axios.get(
          BACKEND_URL + "/api/listings/search?query=" + searchText
        );
        console.log(response.data);
        setSelCategory("");
        setCategoryItems(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getListItems();
  }, [searchText]);

  const handleCategory = (selCategory) => {
    setSelCategory(selCategory);
    if (listItems === null) return;
    if (selCategory === "") {
      setCategoryItems(listItems);
    } else {
      const updatedData = listItems.filter((item) => item.type === selCategory);
      setCategoryItems(updatedData);
    }
  };

  useEffect(() => {
    const getListItems = async () => {
      try {
        const response = await axios.get(BACKEND_URL + "/api/listings");
        console.log(response.data);
        setListItems(response.data);
        setCategoryItems(response.data);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    };
    getListItems();
  }, []);

  console.log(listItems);
  return (
    <>
      <SearchBar setSearchText={handleSearch} />
      <Categories
        category={selCategory}
        setSelCategory={handleCategory}
        disabled={disableCategory}
      />
      {!categoryItems && error && <Error />}
      {!categoryItems && !error && <Loading />}
      {categoryItems && categoryItems.length === 0 && <NothingToShow />}
      {categoryItems && categoryItems.length > 0 && (
        <ListingCard listItems={categoryItems} />
      )}
    </>
  );
};

export default HomePage;
