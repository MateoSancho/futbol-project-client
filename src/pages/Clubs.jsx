import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import ClubCard from "../components/ClubCard"
import clubData from "../assets/data/athletes.json"

function Clubs() {

    const [clubs, setClubs] = useState(null);
    const [filteredClubs, setFilteredClubs] = useState(null);
        
    useEffect(() => {
        setClubs(clubData.clubs);
        setFilteredClubs(clubData.clubs);
    }, [])

    if (!clubs) {
     return <h3>Searching...</h3>;
    } 

    return(
        <div>
            <h1>Clubs main page</h1>

            {filteredClubs.map((eachClub, index) => {
                return <ClubCard key={index} club={eachClub}/>;
            })}

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Clubs;