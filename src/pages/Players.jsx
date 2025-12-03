import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import playersService from "../services/players.services";

function Players() {

    const [players, setPlayers] = useState(null); 
    const [filteredPlayers, setFilteredPlayers] = useState(null);  
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    useEffect(() => {
        playersService
            .getAll()
            .then((response) => {
                setPlayers(response.data);
                setFilteredPlayers(response.data);
            })
            .catch(() => navigate("/error"));
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
    
        if (!players) return;

        if (term === "") {
            setFilteredPlayers(players);
        } else {
            const filtered = players.filter(player => {
                const playerName = player.name?.toLowerCase() || "";
                const playerNation = Array.isArray(player.nation)
                    ? player.nation.join(", ").toLowerCase()
                    : (player.nation || "").toLowerCase();
                
                let playerPosition = "";
                if (player.position && typeof player.position === 'object') {
                    playerPosition = player.position.name?.toLowerCase() || "";
                } else {
                    playerPosition = String(player.position || "").toLowerCase();
                }

                return (
                    playerName.includes(term) ||
                    playerNation.includes(term) ||
                    playerPosition.includes(term)
                )
            });

            setFilteredPlayers(filtered);
        }
    };

    if (!players) {
        return <h3>Searching...</h3>;
    }

    return (
        <div>
            <h1>FC Barcelona Players</h1>

            {role === "admin" && (
                <button 
                    onClick={() => navigate("/players/new")}
                    className="add-player-btn"
                >
                    ➕ Add Player
                </button>
            )}

            <Link to="/" className="link">← Back to Home</Link>

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
                    {filteredPlayers.map((player) => (
                        <PlayerCard key={player._id} player={player} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Players;
