import { Link } from "react-router-dom";
import myLogo from "../assets/Logo.png"

function Navbar() {
    return(
        <div className="navbar">
            <div className="nav-container">
                <img src={myLogo} alt="Logo" className="nav-logo" />
                <h1 className="nav-title">Futbol Pedia</h1>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/players" className="nav-link">Players</Link>
                    <Link to="/positions" className="nav-link">Positions</Link>
                    <Link to="/about-us" className="nav-link">About Us</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </div>

            </div>
        </div>
    )
}

export default Navbar;