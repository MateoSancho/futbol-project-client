import { Link } from "react-router-dom";

function PlayerCard ({player}) {

    // Calculate age from birth date
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
    
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // Get optimized Cloudinary image URL (thumbnail)
    const getPlayerImage = () => {
        if (!player.image) {
            return "https://res.cloudinary.com/demo/image/upload/w_300,h_300,c_fill/v1586187664/sample.jpg"; // Placeholder
        }
        
        // If it's already a Cloudinary URL, optimize it for card display
        if (player.image.includes('cloudinary.com')) {
            // Add Cloudinary transformations for thumbnail
            return player.image.replace('/upload/', '/upload/w_300,h_300,c_fill,g_face/');
        }
        
        return player.image;
    };

    return(
        <div className="player-card">
            {/* PLAYER IMAGE */}
            <div className="player-image-container">
                <img 
                    src={getPlayerImage()} 
                    alt={player.name}
                    className="player-card-image"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x400/004d98/ffffff?text=No+Image";
                    }}
                />
            </div>
            
            <div className="card-header">
                <h3>{player.name}</h3>
                <span className="nationality">{(player.nation) ? player.nation.join(", ") : player.nation}</span>
            </div>

            <div className="card-body">
                <p><strong>Position:</strong> {player.position?.name || "No position"}</p>
                <p><strong>Age:</strong> {calculateAge(player.birthday)}</p>
                <p><strong>Born:</strong> {player.birthday ? new Date(player.birthday).toLocaleDateString() : "Unknown"}</p>
        
                <div className="stats">
                    <div className="stat">
                        <span className="stat-number">{player.goals || 0}</span>
                        <span className="stat-label">Goals</span>
                    </div>
                    <div className="stat">
                        <span className="stat-number">{player.assist || 0}</span>
                        <span className="stat-label">Assists</span>
                    </div>
                </div>

                {player["team trophies"] && player["team trophies"].length > 0 && (
                    <div className="trophies">
                        {player["team trophies"].length} Team Trophies
                    </div>
                )}
            </div>

            <div className="card-footer">
                <Link to={`/players/${player._id}`}>
                    <button>View Details</button>
                </Link>
            </div>
        </div>
    )
}

export default PlayerCard;