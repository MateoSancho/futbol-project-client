import { Link } from "react-router-dom";

function PositionCard (props) {

    const { position } = props;
    
    return(
        <div>
            <h3>{position.name}</h3>

            <Link to={`/positions/:id.$oid}`}>
                <button>View Details</button>
            </Link>
        </div>
    )
}

export default PositionCard;