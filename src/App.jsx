import React, { useState } from "react";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const loadMore = () => {
    // Simulate fetching more data
    const newProfiles = [
      { name: "Alice Johnson", image: "https://via.placeholder.com/150" },
      { name: "Bob Brown", image: "https://via.placeholder.com/150" },
      // Add more profiles here
    ];
    setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
  };
  const profiles = [
    {
      name: "John Doe",
      image: "https://via.placeholder.com/150",
      details: "Professor of Mathematics",
    },
    {
      name: "Jane Smith",
      image: "https://via.placeholder.com/150",
      details: "Professor of Physics",
    },
    {
      name: "Alice Johnson",
      image: "https://via.placeholder.com/150",
      details: "Professor of Chemistry",
    },
    {
      name: "Bob Brown",
      image: "https://via.placeholder.com/150",
      details: "Professor of Biology",
    },
    {
      name: "Charlie Davis",
      image: "https://via.placeholder.com/150",
      details: "Professor of History",
    },
    {
      name: "Dana Lee",
      image: "https://via.placeholder.com/150",
      details: "Professor of BioE",
    },
    {
      name: "name",
      image: "https://via.placeholder.com/150",
      details: "Professor of MechE",
    },
    {
      name: "name",
      image: "https://via.placeholder.com/150",
      details: "Professor of Business",
    },
    {
      name: "Name",
      image: "https://via.placeholder.com/150",
      details: "Professor of Math",
    },
    {
      name: "Name",
      image: "https://via.placeholder.com/150",
      details: "Professor of Literature",
    },
    {
      name: "Name",
      image: "https://via.placeholder.com/150",
      details: "Professor of Literature",
    },
    {
      name: "Name",
      image: "https://via.placeholder.com/150",
      details: "Professor of Literature",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#2c2c2c",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              image={profile.image}
              details={profile.details}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
