import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ImageUploading from "react-images-uploading";

const AddListingPage = () => {
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Resorts",
    info: { guests: "", bedrooms: "", bathrooms: "" },
    pricePerNight: "",
    rating: "0",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.info) {
      setFormData({
        ...formData,
        info: { ...formData.info, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    setFormData({ ...formData, image: imageList[0].file });
  };
  // const handleFileChange = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", formData);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("type", formData.type);

    formDataToSend.append("info", JSON.stringify(formData.info));
    formDataToSend.append("pricePerNight", "Rs. " + formData.pricePerNight);
    formDataToSend.append("rating", formData.rating);
    formDataToSend.append("img", formData.image);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/listings/`,
        formDataToSend,
        {
          headers: {
            Authorization: "Bearer " + authContext.token,
          },
        }
      );
      console.log("Listing added successfully:", response.data);
      if (authContext.user.userId === import.meta.env.VITE_ADMIN_ID) {
        navigate("/admin/listings/");
      } else {
        navigate("/listings/user/" + authContext.user.userId);
      }
    } catch (error) {
      toast.error("Error adding listing");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 h-full">
      <Toaster />
      <h1 className="text-xl font-semibold text-center w-full text-sky-500 mb-4">
        Rent a New Place
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex gap-5 flex-col sm:flex-row w-2/3"
      >
        <div className="sm:w-1/2">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          {/* <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png"
            required
            className="p-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          /> */}
          <ImageUploading
            multiple={false}
            value={images}
            onChange={handleFileChange}
            dataURLKey="data_url"
            acceptTypes={["jpg", "jpeg", "png"]}
            maxFileSize={500000} // 500 KB
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="p-2 border flex items-center justify-center  border-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-500">
                {images.length === 0 && (
                  <button
                    type="button"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Click or Drop here
                  </button>
                )}
                &nbsp;
                {imageList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item flex flex-col items-center w-full"
                    onClick={() => onImageUpdate(index)}
                  >
                    <img
                      className="hover:opacity-70 h-36 md:h-48 lg:h-72"
                      src={image["data_url"]}
                    />
                    <button
                      type="button"
                      className="self-end ml-auto bg-red-500 p-2 rounded-sm text-white hover:bg-red-600 w-full shadow-sm shadow-gray-500"
                      onClick={() => {
                        onImageRemove(index);
                        stopPropagation();
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
        <div className="h-full flex flex-col gap-2 w-full sm:w-1/2">
          <div>
            <label
              htmlFor="title"
              className="block text-xs font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              maxLength={30}
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 text-xs sm:text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-xs font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              maxLength={30}
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full p-2 text-xs sm:text-sm  border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-xs font-medium text-gray-700"
            >
              Type
            </label>
            <select
              name="type"
              maxLength={30}
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full p-2 text-xs sm:text-sm  border border-gray-700 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="Resorts"> Resorts </option>
              <option value="Rooms"> Rooms </option>
              <option value="Apartments"> Apartments </option>
              <option value="Amazing Views"> Amazing Views </option>
              <option value="Houses"> Houses </option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="guests"
                className="block text-xs font-medium text-gray-700"
              >
                Guests
              </label>
              <input
                type="number"
                name="guests"
                min={1}
                max={999999}
                value={formData.info.guests}
                onChange={handleChange}
                required
                className="w-full p-2 text-xs sm:text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="bedrooms"
                className="block text-xs font-medium text-gray-700"
              >
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                min={1}
                max={999999}
                value={formData.info.bedrooms}
                onChange={handleChange}
                required
                className="w-full p-2 text-xs sm:text-sm border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label
                htmlFor="bathrooms"
                className="block text-xs font-medium text-gray-700"
              >
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                min={1}
                max={999999}
                value={formData.info.bathrooms}
                onChange={handleChange}
                required
                className="w-full p-2 text-xs sm:text-sm  border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="pricePerNight"
              className="block text-xs font-medium text-gray-700"
            >
              Price Per Night
            </label>
            <input
              type="number"
              name="pricePerNight"
              min={1}
              max={999999}
              value={formData.pricePerNight}
              onChange={handleChange}
              required
              className="w-full p-2 text-xs sm:text-sm  border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="text-xs font-medium flex items-center text-gray-700"
            >
              Rating
              <span className="justify-self-end ml-auto">
                ⭐{formData.rating}
              </span>
            </label>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              className="w-full p-2 text-xs sm:text-sm  border border-gray-700 rounded-md focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white p-2 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Rent It
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddListingPage;
