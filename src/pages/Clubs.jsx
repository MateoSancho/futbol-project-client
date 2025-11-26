import { Link } from "react-router-dom"
import clubs from "../assets/data/clubs.json"

function Clubs() {
    return(
        <div>
            <h1>Clubs main page</h1>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Clubs;