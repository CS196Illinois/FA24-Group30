import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: "#fff" }}>
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
            >
              LOGO
            </div>
            <span className="ms-2">Find My Professor</span>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/professors"
                style={{ color: "#fff" }}
              >
                Professors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "#fff" }}>
                Dashboard
              </a>
            </li>
          </ul>
          <form className="d-flex ms-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Keyword Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
