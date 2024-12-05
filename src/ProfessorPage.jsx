import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import profiles from "./profiles.json"; // Assume the professors' data is in this file
import ProfileCard from "./ProfileCard.jsx";

const ProfessorPage = () => {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef(null); // Reference to the text for dynamic positioning

  const scrollToProfessors = () => {
    const element = document.getElementById("professors-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#2c2c2c", color: "#fff", minHeight: "100vh", alignItems: "center" }}>
      {/* Hero Section */}
      <section
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "100vh",
          textAlign: "center",
        }}
      >
        {/* Container for Magnifying Glass and Text */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%", // Full width for centering
            marginBottom: "20px",
            paddingLeft: "47px"
          }}
        >
          {/* Magnifying Glass */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "8px solid black",
              backgroundColor: "gray",
              position: "absolute",
              top: "50%", // Vertically centered
              left: hovered
                ? `${textRef.current?.offsetWidth + 400}px` // End position to the right of the text
                : "285px", // Start position to the left of the text
              transform: "translateY(-50%)", // Align vertically
              transition: "left 1s ease-in-out", // Smooth horizontal animation
              boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "30px",
                backgroundColor: "black",
                position: "absolute",
                bottom: "-19px",
                right: "-10px",
                transform: "rotate(135deg)",
                borderRadius: "5px",
              }}
            />
          </div>

          {/* Text */}
          <h1
            ref={textRef} // Attach the reference to the text
            style={{
              fontSize: "5rem",
              color: "#fff",
              margin: 0,
              position: "relative",
              zIndex: 1, // Ensure text is above the magnifying glass
            }}
            onMouseEnter={() => setHovered(true)} // Trigger animation on hover
            onMouseLeave={() => setHovered(false)} // Reset animation on mouse leave
          >
            Find My Professor
          </h1>
        </div>

        {/* Scroll to Professors Button */}
        <button
          onClick={scrollToProfessors}
          style={{
            backgroundColor: "#fff",
            color: "#000",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            marginTop: "20px",
          }}
        >
          Scroll to Professors
        </button>
      </section>

      {/* Professors Section */}
      <section id="professors-section" className="container mt-5">
        <div className="row">
          {profiles.map((profile, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <ProfileCard
                name={profile.name}
                image={profile.image}
                details={profile.details}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfessorPage;
