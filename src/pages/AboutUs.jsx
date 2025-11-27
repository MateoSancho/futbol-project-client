import { Link } from "react-router-dom"

function AboutUs() {
    return(
        <div className="about-container">
            <h1>About US</h1>

            <div className="about-content">
                <div className="about-section">
                    <h2>Our Project</h2>
                    <p>
                        This is our final project for the Ironhack Fullstack Bootcamp. 
                        We've created a Barcelona FC fan application where you can explore 
                        all the players and positions of the legendary Barça team.
                    </p>
                </div>

                <div className="about-section">
                    <h2>Meet the Team</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <h3>Mateo</h3>
                            <p>Fullstack Developer</p>
                        </div>
                        <div className="team-member">
                            <h3>Anton</h3>
                            <p>Fullstack Developer</p>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2>About the App</h2>
                    <p>
                        This web app showcases current and legendary FC Barcelona players, 
                        their statistics, trophies, and positions. Built with React and 
                        modern web technologies.
                    </p>
                </div>
            </div>


            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default AboutUs;