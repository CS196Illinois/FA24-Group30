import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import profiles from "./profiles.json"; // Assume the professors' data is in this file
import ProfileCard from "./ProfileCard.jsx";

const ProfessorPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All"); // For filtering professors
  const [hovered, setHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For collapsing the sidebar
  const textRef = useRef(null);

  const categories = [...new Set(profiles.map((profile) => profile.details)), "All"]; // Extract unique categories

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility

  const filteredProfiles = selectedCategory === "All"
    ? profiles
    : profiles.filter((profile) => profile.details === selectedCategory);

  const scrollToProfessors = () => {
    const element = document.getElementById("professors-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#2c2c2c",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <section
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "100vh",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginBottom: "20px",
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
              top: "50%",
              left: hovered
                ? `${textRef.current?.offsetWidth + 415}px`
                : "285px",
              transform: "translateY(-50%)",
              transition: "left 1s ease-in-out",
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
            ref={textRef}
            style={{
              fontSize: "5rem",
              color: "#fff",
              margin: 0,
              position: "relative",
              zIndex: 1,
              left: "25px"
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            Find My Professor
          </h1>
        </div>

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
          Professors
        </button>
      </section>

      {/* Sidebar and Professors Section */}
      <section
        id="professors-section"
        className="d-flex"
        style={{
          marginTop: "20px",
        }}
      >
        {/* Collapsible Sidebar */}
        <div
          className="d-flex flex-column text-white p-3"
          style={{
            width: isSidebarOpen ? "250px" : "50px", // Collapsed width
            backgroundColor: "#333", // Sidebar color
            minHeight: "calc(100vh - 100px)",
            transition: "width 0.3s ease", // Smooth collapsing effect
            overflowY: "auto",
            whiteSpace: "nowrap",
            borderTopRightRadius: "15px", // Rounded top-right corner
            borderBottomRightRadius: "15px", // Rounded bottom-right corner
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            position: "relative",
          }}
        >
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              position: "absolute",
              top: "10px",
              left: "50%", // Center horizontally
              transform: "translateX(-50%)", // Adjust for exact centering
              cursor: "pointer",
              fontSize: "1.5rem",
              zIndex: 1000
            }}
          >
            {isSidebarOpen ? "<" : ">"}
          </button>

          {isSidebarOpen && (
            <>
              <ul className="list-unstyled" style = {{marginTop: "40px"}}>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      backgroundColor:
                         selectedCategory === category ? "#444" : "transparent",
                      borderRadius: "5px",
                      transition: "background-color  0.3s",
                    }}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Professors Section */}
        <div className="container mt-5" style={{ flex: 1 }}>
          <div className="row">
            {filteredProfiles.map((profile, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <ProfileCard
                  name={profile.name}
                  image={profile.image}
                  details={profile.details}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfessorPage;
