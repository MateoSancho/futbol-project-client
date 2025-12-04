import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import myLogo from "../assets/Logo.png";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-container">
        <img src={myLogo} alt="Logo" className="nav-logo" />
        <h1 className="nav-title">Barça Pedia</h1>

        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/players" className="nav-link">
            Players
          </Link>
          <Link to="/positions" className="nav-link">
            Positions
          </Link>
          <Link to="/aboutus" className="nav-link">
            About Us
          </Link>

          {/* Conditional rendering based on login */}
          {isLoggedIn ? (
            <>
              <span className="nav-link">Welcome</span>
              <button onClick={logOutUser} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
