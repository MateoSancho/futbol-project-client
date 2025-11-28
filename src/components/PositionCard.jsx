import { Link } from "react-router-dom";

function PositionCard (props) {

    const { position } = props;
    
    return(
        <div className="position-card">
            <h3>{position.name}</h3>
            
            <Link to={`/positions/:${position.id}`}>
                <button>View Details</button>
            </Link>
        </div>
    )
}

export default PositionCard;