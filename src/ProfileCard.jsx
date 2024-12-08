import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfileCard.css"; // Import the CSS file for hover effect

const ProfileCard = ({ name, image, details, link }) => {
  return (
    <div
      className="profile-card position-relative"
      style={{
        width: "250px",
        margin: "10px auto",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "#e0e0e0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        cursor: "pointer",
      }}
      onClick={() => window.location.href = link}
    >
      {/* Image Section */}
      <div
        style={{
          height: "300px",
          backgroundColor: "#000000",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "90%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Hover Text (Initially Hidden) */}
      <div className="hover-text">
        <p style={{ margin: 0, padding: "10px" }}> {details} </p>
      </div>

      {/* Name Section */}
      <div
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px",
        }}
      >
        <h5
          style={{
            margin: 0,
            fontSize: "1.2rem",
          }}
        >
          {name}
        </h5>
      </div>
    </div>
  );
};

export default ProfileCard;
