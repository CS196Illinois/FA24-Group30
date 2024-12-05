import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import profiles from "./profiles.json"; // Assume the professors' data is in this file
import ProfileCard from "./ProfileCard.jsx";

const ProfessorPage = () => {
  const scrollToProfessors = () => {
    const element = document.getElementById("professors-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ backgroundColor: "#2c2c2c", color: "#fff", minHeight: "100vh" }}>
      {/* Hero Section */}
      <section
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "100vh",
          backgroundColor: "#2c2c2c",
          textAlign: "center",
        }}
      >
        {/* Magnifying Glass and Text */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          {/* Magnifying Glass */}
          <div
            style={{
              width: "70px", // Size of the magnifying glass
              height: "70px",
              borderRadius: "50%", // Circle shape
              border: "8px solid black", // Thick border for the lens
              position: "relative", // Relative for positioning the handle
              backgroundColor: "gray", // Background color inside the lens
              boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)", // Shadow for depth
              marginRight: "20px", // Add space between magnifying glass and text
            }}
          >
            <div
              style={{
                width: "15px", // Width of the handle
                height: "30px", // Height of the handle
                backgroundColor: "black", // Handle color
                position: "absolute", // Absolute to attach to the lens
                bottom: "-19px", // Slightly below the lens
                right: "-10px", // Slightly to the right of the lens
                transform: "rotate(135deg)", // Rotate to create the angled handle
                borderRadius: "5px", // Rounded edges for the handle
              }}
            />
          </div>
          {/* Text */}
          <h1 style={{ fontSize: "5rem", color: "#fff", margin: 0 }}>Find My Professor</h1>
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
                