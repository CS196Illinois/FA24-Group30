import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"; 
import ProfileCard from "./Components/Professor/ProfileCard"; 
import Dashboard from "./Components/Dashboard/dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
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
  ];

  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        
        <Route
          path="/"
          element={
            <div
              style={{
                backgroundColor: "#2c2c2c",
                minHeight: "100vh",
                padding: "20px",
              }}
            >
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
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
