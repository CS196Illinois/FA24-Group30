import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { throttle } from "lodash"; // Import throttle function
import faculty from "./CS124_Data/professorname.json";
import professor_collection from "./CS124_Data/professorimages.json";
import ProfileCard from "./ProfileCard.jsx";
import professor_links from "./CS124_Data/professorlinks.json";

const ProfessorPage = () => {
  const ITEMS_PER_LOAD = 9; // Number of profiles to load at a time
  const MIN_PROFILES = ITEMS_PER_LOAD; // Minimum number of profiles to show
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(false);
  const textRef = useRef(null);
  const lastScrollY = useRef(0); // Track the last scroll position
  const scrollingDown = useRef(true); // Track scroll direction
  const [hovered, setHovered] = useState(false); // Track hover for magnifying glass

  // Combine faculty and images
  const combinedProfiles = faculty.faculty.map((name, index) => ({
    name: name || "Unknown",
    image: professor_collection.professor_collection[index] || "https://via.placeholder.com/150",
    details: "CS Faculty",
    links: professor_links.professor_links[index]
  }));

  // Profiles to display
  const displayedProfiles = combinedProfiles.slice(0, visibleCount);

  // Handle scrolling logic
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Determine scroll direction
    scrollingDown.current = scrollTop > lastScrollY.current;

    if (scrollingDown.current) {
      // Scrolling down
      if (
        scrollTop + clientHeight >= scrollHeight - 100 && // Near the bottom
        visibleCount < combinedProfiles.length &&
        !isLoading
      ) {
        console.log("Scrolling down, loading more profiles...");
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, combinedProfiles.length));
          setIsLoading(false);
        }, 300);
      }
    } else {
      // Scrolling up
      if (scrollTop < lastScrollY.current - 300 && visibleCount > MIN_PROFILES) {
        // Only decrease profiles when scrolling up significantly
        console.log("Scrolling up, decreasing profiles...");
        setVisibleCount((prev) => Math.max(prev - ITEMS_PER_LOAD, MIN_PROFILES));
      }
    }

    // Update the last scroll position
    lastScrollY.current = scrollTop;
  };

  // Throttle the handleScroll function
  const throttledHandleScroll = throttle(handleScroll, 200);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [visibleCount, isLoading]);

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
          {/* Magnifying Glass Animation */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              border: "8px solid black",
              backgroundColor: "gray",
              position: "absolute",
              top: "50%",
              left: hovered ? `${textRef.current?.offsetWidth + 415}px` : "300px",
              transform: "translateY(-50%)",
              transition: "left 1s ease-in-out",
              boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.4)",
              pointerEvents: "none", // Prevent interaction with the magnifying glass
              zIndex: 1,
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

          {/* Hero Text */}
          <h1
            ref={textRef}
            style={{
              fontSize: "5rem",
              color: "#fff",
              margin: 0,
              position: "relative",
              zIndex: 0,
              left: "35px",
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

      {/* Professors Section */}
      <section id="professors-section" className="container mt-5" style={{ flex: 1 }}>
        <div className="row">
          {displayedProfiles.map((profile, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <ProfileCard name={profile.name} image={profile.image} details={profile.details} link={profile.links} />
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div style={{ textAlign: "center", margin: "20px", color: "#fff" }}>Loading more...</div>
        )}

        {/* End of Profiles */}
        {!isLoading && visibleCount >= combinedProfiles.length && (
          <div style={{ textAlign: "center", margin: "20px", color: "#fff" }}>No more profiles!</div>
        )}
      </section>
    </div>
  );
};

export default ProfessorPage;
