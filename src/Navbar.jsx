import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#2c2c2c", color: "#fff" }}
    >
      <div className="container-fluid">
        {/* Align the navbar-brand to the left */}
        <div className="d-flex align-items-center me-auto">
          <Link className="navbar-brand" to="/professors" style={{ color: "#fff" }}>
            Find My Professor
          </Link>
        </div>
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
              <Link className="nav-link" to="/professors" style={{ color: "#fff" }}>
                Professors
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard" style={{ color: "#fff" }}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
