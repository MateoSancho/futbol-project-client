import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard"
import { getAllPlayers, searchPlayers } from "../services/dataService";

function Players() {

    const [players, setPlayers] = useState(null);
    const [filteredPlayers, setFilteredPlayers] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const allPlayers = getAllPlayers();
        setPlayers(allPlayers);
        setFilteredPlayers(allPlayers);

    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
    
        if (!athletes) return;

        if (term === "") {
            setFilteredAthletes(athletes);
        } else {
            const filtered = searchPlayers(term);
            setFilteredAthletes(filtered);
        }
    };

    if (!players) {
     return <h3>Searching...</h3>;
    };

    return(
        <div>
            <h1>FC Barcelona Players</h1>

            {/* Barra de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name, nationality, or position..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="search-results">
                    <p>Showing {filteredPlayers.length} of {players.length} players</p>
                </div>
            </div>

            {filteredPlayers.length === 0 ? (
                <div className="no-results">
                    <h3>No players found matching your search.</h3>
                </div>
            ) : (
                <div className="players-grid">
                    {filteredPlayers.map((eachPlayer) => {
                        return <PlayerCard key={eachPlayer._id.$oid} player={eachPlayer}/>;
                    })}
                </div>
            )}

            <Link to="/" className="Link">← Back to Home</Link>
        </div>
    )
};

export default Players;