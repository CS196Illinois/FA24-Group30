import React, { useState } from "react";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileCard = ({ name, image, details }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="col-md-4 mb-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="card text-center"
        style={{ backgroundColor: "#e0e0e0", borderRadius: "10px" }}
      >
        <div className="card-body" style={{ padding: "0" }}>
          <div
            style={{
              width: "100%",
              height: "120px",
              backgroundColor: "#d3d3d3",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <img
              src={image}
              alt="Profile"
              style={{
                width: "50%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            />
          </div>
          <div
            style={{
              backgroundColor: "#333",
              padding: "10px",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <h5 className="card-title" style={{ color: "#fff", margin: 0 }}>
              {name}
            </h5>
          </div>
        </div>
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
            }}
          >
            <p>{details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
