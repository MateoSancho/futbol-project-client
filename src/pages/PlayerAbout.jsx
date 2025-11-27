import { Link } from "react-router-dom";

function AthleteAbout() {
    return(
        <div>
            <h1>Athlete page by id</h1>

            <Link to="/players" className="Link">← Back to Players</Link>
        </div>
    )
}

export default AthleteAbout;