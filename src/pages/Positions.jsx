import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import PositionCard from "../components/PositionCard"
import { getAllPositions } from "../services/dataService"

function Positions() {

    const [positions, setPositions] = useState(null);
    const [filteredPositions, setFilteredPositions] = useState(null);
        
    useEffect(() => {

        const allPositions = getAllPositions();
        setPositions(allPositions);
        setFilteredPositions(allPositions);

    }, [])

    if (!positions) {
     return <h3>Searching...</h3>;
    } 

    return(
        <div>
            <h1>Football Positions</h1>

            {filteredPositions.map((eachPosition) => {
                return <PositionCard key={eachPosition._id.$oid} position={eachPosition}/>;
            })}

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Positions;