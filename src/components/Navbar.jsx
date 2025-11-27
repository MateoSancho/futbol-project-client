import { Link } from "react-router-dom";
import myLogo from "../assets/Logo.png"

function Navbar() {
    return(
        <div className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-brand">
                    <img src={myLogo} alt="Logo" className="nav-logo" />
                    <h1 className="nav-title">Futbol Pedia</h1>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/athletes" className="nav-link">Players</Link>
                    <Link to="/positions" className="nav-link">Positions</Link>
                    <Link to="/about-us" className="nav-link">About Us</Link>
                </div>
                
            </div>
        </div>
    )
}

export default Navbar;