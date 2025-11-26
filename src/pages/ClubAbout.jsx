import { Link } from "react-router-dom";

function ClubAbout() {
    return(
        <div>
            <h1>Club page by id</h1>

            <Link to="/clubs" className="Link">← Back to Clubs</Link>
        </div>
    )
}

export default ClubAbout;