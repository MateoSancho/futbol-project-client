import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Futbol Pedia</h1>
      <p>All the futbol players and clubs from all around the world</p>

      <div className="sections-container">
        {/* Athletes Section */}
        <div className="section-box">
          <div className="content-container">
            <h2 className="section-title">Athletes</h2>
            <h3 className="section-d">Here wyou can see all the football players you can imagine</h3>
            <Link to="/athletes" className="section-btn">See Athletes</Link>
          </div>
        </div>

        {/* Clubs Section */}
        <div className="section-box">
          <div className="content-container">
            <h2 className="section-title">Clubs</h2>
            <h3 className="section-d">Here are all the clubs around the world</h3>
            <Link to="/clubs" className="section-btn">See Clubs</Link>
          </div>
        </div>

        {/* About Section */}
        <div className="section-box">
          <div className="content-container">
            <h2 className="section-title">About US</h2>
            <h3 className="section-d">Here you can find about our portfolio, and our project</h3>
            <Link to="/about-us" className="section-btn"> See more </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home