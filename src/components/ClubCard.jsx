import { Link } from "react-router-dom";

function ClubCard (props) {
    return(
        <div>
            <h3>{props.club.name}</h3>
            <p><strong>Description:</strong> {props.club.description}</p>

            <Link to={`/clubs/:id}`}>
                <button>View Details</button>
            </Link>
        </div>
    )
}

export default ClubCard;