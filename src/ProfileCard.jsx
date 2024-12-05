import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileCard = ({ name, image }) => {
  return (
    <div
      className="profile-card"
      style={{
        width: "250px", // Fixed width for consistency
        margin: "10px auto", // Center the card with spacing
        borderRadius: "8px", // Rounded corners
        overflow: "hidden", // Clip overflowing content
        backgroundColor: "#e0e0e0", // Light gray background
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        textAlign: "center", // Center align text
      }}
    >
      {/* Image Section */}
      <div
        style={{
          height: "150px", // Fixed height for image area
          backgroundColor: "#d3d3d3", // Placeholder background color
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "100%", // Image should span full width
            height: "100%", // Image should span full height
            objectFit: "cover", // Ensure the image maintains aspect ratio
          }}
        />
      </div>

      {/* Name Section */}
      <div
        style={{
          backgroundColor: "#333", // Dark gray background for the name section
          color: "#fff", // White text color for contrast
          padding: "10px", // Spacing around the text
        }}
      >
        <h5
          style={{
            margin: 0, // Remove default margin
            fontSize: "1.2rem", // Adjust font size
          }}
        >
          {name}
        </h5>
      </div>
    </div>
  );
};

export default ProfileCard;
