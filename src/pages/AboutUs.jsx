import { Link } from "react-router-dom"

function AboutUs() {
    return(
        <div>
            <h1>About US</h1>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default AboutUs;