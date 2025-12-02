import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import PositionCard from "../components/PositionCard"
import axios from "axios";

function Positions() {

    const [positions, setPositions] = useState(null);
    const [filteredPositions, setFilteredPositions] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
        
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/positions`)
        .then((response) => {
            console.log(response.data);
            setPositions(response.data);
            setFilteredPositions(response.data);
        })
        .catch((error) => {
            console.log(error);
            navigate("/error");
        });
    }, [])

    // Función para manejar la búsqueda
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
    
        if (!positions) return;

        if (term === "") {
            setFilteredPositions(positions);
        } else {
            const filtered = positions.filter(position => 
            position.name.toLowerCase().includes(term)
            );
            setFilteredPositions(filtered);
        }
    };

    if (!positions) {
     return <h3>Searching...</h3>;
    } 

    return(
        <div>
            <h1>Football Positions</h1>

            <Link to="/" className="link">← Back to Home</Link>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by position"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="search-results">
                    <p>Showing {filteredPositions.length} of {positions.length} positions</p>
                </div>
            </div>

            {filteredPositions.length === 0 ? (
                <div className="no-results">
                    <h3>No positions found matching your search.</h3>
                </div>
            ) : (
                <div className="positions-grid">
                {filteredPositions.map((eachPosition) => {
                    return <PositionCard key={eachPosition._id} position={eachPosition} />;
                })}
</div>

            )}
        </div>
    )
}

export default Positions;