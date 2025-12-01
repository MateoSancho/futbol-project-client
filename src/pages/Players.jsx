import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import axios from "axios";

function Players() {

    const [players, setPlayers] = useState(null);
    const [filteredPlayers, setFilteredPlayers] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/players`)
        .then ((response) => {
            console.log(response.data);
            setPlayers(response.data);
            setFilteredPlayers(response.data);
        })
        .catch((error) => {
            console.log(error);
            navigate("/error");
        })
    }, []);

    // Buscar segun nombre, nacionalidad o pisicion
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
    
        if (!players) return;

        if (term === "") {
            setFilteredPlayers(players);
        } else {
            const filtered = players.filter(player => 
                player.name.toLowerCase().includes(term) ||
                player.nation.toLowerCase().includes(term) ||
                player.position.toLowerCase().includes(term)
            );
            setFilteredPlayers(filtered);
        }
    };

    if (!players) {
     return <h3>Searching...</h3>;
    };

    return(
        <div>
            <h1>FC Barcelona Players</h1>

            <Link to="/" className="link">← Back to Home</Link>

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

            {/* Todos los jugadores */}
            {filteredPlayers.length === 0 ? (
                <div className="no-results">
                    <h3>No players found matching your search.</h3>
                </div>
            ) : (
                <div className="players-grid">
                    {filteredPlayers.map((eachPlayer) => {
                        return <PlayerCard key={eachPlayer._id} player={eachPlayer}/>;
                    })}
                </div>
            )}
        </div>
    )
};

export default Players;