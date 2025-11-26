import myLogo from "../assets/Logo.png"

function Navbar() {
    return(
        <div className="navbar">
            <div className="nav-container">
            <img src={myLogo} alt="Logo" className="nav-logo" />
            <h1 className="nav-title">Futbol Pedia</h1>
        </div>
        </div>
    )
}

export default Navbar;