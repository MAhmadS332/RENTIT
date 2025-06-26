import React from "react";

const FooterList = () => {
  const list = [
    {
      city: "Amsterdam",
      location: "Cottage rentals",
      href: "https://example.com/amsterdam-cottage-rentals",
    },
    {
      city: "Barcelona",
      location: "Vacation rentals",
      href: "https://example.com/barcelona-vacation-rentals",
    },
    {
      city: "Barrie",
      location: "Apartment rentals",
      href: "https://example.com/barrie-apartment-rentals",
    },
    {
      city: "Barry's Bay",
      location: "Vacation rentals",
      href: "https://example.com/barrys-bay-vacation-rentals",
    },
    {
      city: "The Blue Mountains",
      location: "Vacation rentals",
      href: "https://example.com/blue-mountains-vacation-rentals",
    },
    {
      city: "Boston",
      location: "House rentals",
      href: "https://example.com/boston-house-rentals",
    },
    {
      city: "Calabogie",
      location: "Cottage rentals",
      href: "https://example.com/calabogie-cottage-rentals",
    },
    {
      city: "Sault Ste. Marie",
      location: "Vacation rentals",
      href: "https://example.com/sault-ste-marie-vacation-rentals",
    },
    {
      city: "Cancún",
      location: "Vacation rentals",
      href: "https://example.com/cancun-vacation-rentals",
    },
    {
      city: "Chicago",
      location: "Rentals with pools",
      href: "https://example.com/chicago-rentals-with-pools",
    },
    {
      city: "Cobourg",
      location: "Cottage rentals",
      href: "https://example.com/cobourg-cottage-rentals",
    },
    {
      city: "Davenport",
      location: "Vacation rentals",
      href: "https://example.com/davenport-vacation-rentals",
    },
    {
      city: "Dublin",
      location: "House rentals",
      href: "https://example.com/dublin-house-rentals",
    },
    {
      city: "Edmonton",
      location: "Vacation rentals",
      href: "https://example.com/edmonton-vacation-rentals",
    },
    {
      city: "Florence",
      location: "Villa rentals",
      href: "https://example.com/florence-villa-rentals",
    },
    {
      city: "Flagstaff",
      location: "Condo rentals",
      href: "https://example.com/flagstaff-condo-rentals",
    },
    {
      city: "Halifax",
      location: "Vacation rentals",
      href: "https://example.com/halifax-vacation-rentals",
    },
  ];

  return (
    <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 text-sm py-12 border-gray-300 border-b-2">
      {list.map((listItem, index) => (
        <a key={index} href={listItem.href} className="flex flex-col">
          <span className="font-bold">{listItem.city}</span>
          <span>{listItem.location}</span>
        </a>
      ))}
    </ul>
  );
};

export default FooterList;
