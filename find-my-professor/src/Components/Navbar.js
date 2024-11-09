import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2c2c2c', color: '#fff' }}>
      <div className="container-fluid">
        {/* Logo and Title */}
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: '#fff' }}>
          <div className="rounded-circle bg-light text-dark d-flex justify-content-center align-items-center" 
               style={{ width: '40px', height: '40px' }}>
            LOGO
          </div>
          <span className="ms-2 fw-bold">Find My Professor</span>
        </a>

        {/* Centered Professors Dashboard Text */}
        <div className="mx-auto d-none d-lg-block">
          <h5 className="text-light mb-0">Professors Dashboard</h5>
        </div>

        {/* Search Bar */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <form className="d-flex ms-3">
            <input 
              className="form-control rounded-pill me-2" 
              type="search" 
              placeholder="Keyword Search" 
              aria-label="Search"
              style={{ width: '200px' }} 
            />
            <button className="btn btn-outline-light rounded-pill" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;