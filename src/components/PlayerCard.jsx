import { Link } from "react-router-dom";

function PlayerCard (props) {

    const { player } = props;

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

    return(
        <div className="player-card">
            <div className="card-header">
                <h3>{player.name}</h3>
                <span className="nationality">{player.nation}</span>
            </div>

            <div className="card-body">
                <p><strong>Position:</strong> {player.position}</p>
                <p><strong>Age:</strong> {calculateAge(player["birth date"])}</p>
                <p><strong>Born:</strong> {new Date(player["birth date"]).toLocaleDateString()}</p>
        
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
                <Link to={`/players/${player.id}`}>
                    <button>View Details</button>
                </Link>
            </div>
        </div>
    )
}

export default PlayerCard;