import { Link } from "react-router-dom";

function PositionAbout() {
    return(
        <div>
            <h1>Position page by id</h1>

            <Link to="/positions" className="Link">← Back to Positions</Link>
        </div>
    )
}

export default PositionAbout;