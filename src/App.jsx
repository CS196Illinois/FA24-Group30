import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileCard from "./ProfileCard.jsx";
import Dashboard from "./Dashboard/dashboard.jsx";
import ProfessorPage from "./ProfessorPage.jsx"; // Import the new ProfessorPage component
import "bootstrap/dist/css/bootstrap.min.css";
import profiles from './profiles.json';

const App = () => {
  const Home = () => (
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
  );

  return (
    <Router>
      <div
        style={{
          backgroundColor: "#2c2c2c",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Navbar />
        <Routes>
          {/* Define the home route */}
          <Route path="/" element={<Home />} />
          
          {/* Define the dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Define the professors route to use the new ProfessorPage */}
          <Route path="/professors" element={<ProfessorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
