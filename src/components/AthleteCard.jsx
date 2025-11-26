import { Link } from "react-router-dom";

function AthleteCard (props) {
    return(
        <div>
            <div>
                <h3>{props.athlete.name}</h3>
                <p><strong>Age:</strong> {props.athlete.age}</p>
                <p><strong>Description:</strong> {props.athlete.description}</p>

                <div>
                    <Link to={`/athletes/:id}`}>
                        <button>View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AthleteCard;