import { Link } from "react-router-dom";

function AthleteAbout() {
    return(
        <div>
            <h1>Athlete page by id</h1>

            <Link to="/athletes" className="Link">← Back to Athletes</Link>
        </div>
    )
}

export default AthleteAbout;