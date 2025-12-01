import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home-section">
      <h1>Barca Enthusiasm</h1>
      <p>All the football players and positions from Barca</p>

      <div className="sections-container">
        {/* Players Section */}
        <div id="box1">
          <div className="section-box">
            <div className="content-container">
              <h2 className="section-title">Players</h2>
              <h3 className="section-d">Here you can see all the football players from Barca</h3>
              <Link to="/players" className="section-btn">See Players</Link>
            </div>
          </div>
        </div>

        {/* Position Section */}
        <div id="box2">
          <div className="section-box">
            <div className="content-container">
              <h2 className="section-title">Positions</h2>
              <h3 className="section-d">Here are all the positions of football 11</h3>
              <Link to="/positions" className="section-btn">See Positions</Link>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="box3">
          <div className="section-box">
            <div className="content-container">
              <h2 className="section-title">About US</h2>
              <h3 className="section-d">Here you can find about our portfolio, and our project</h3>
              <Link to="/aboutus" className="section-btn"> See more </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home