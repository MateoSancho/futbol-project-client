import { Link } from "react-router-dom"
import athletes from "../assets/data/athletes.json"

function Athletes() {
    return(
        <div>
            <h1>Athlete main page</h1>

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Athletes;