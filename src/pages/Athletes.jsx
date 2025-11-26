import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import AthleteCard from "../components/AthleteCard"
import athletesData from "../assets/data/athletes.json"

function Athletes() {

    const [athletes, setAthletes] = useState(null);
    const [filteredAthletes, setFilteredAthletes] = useState(null);

    useEffect(() => {
        setAthletes(athletesData.athletes);
        setFilteredAthletes(athletesData.athletes);
    }, [])

    if (!athletes) {
     return <h3>Searching...</h3>;
    } 

    return(
        <div>
            <h1>Athlete main page</h1>

            {filteredAthletes.map((eachAthlete, index) => {
                return <AthleteCard key={index} athlete={eachAthlete}/>;
            })}

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
}

export default Athletes;