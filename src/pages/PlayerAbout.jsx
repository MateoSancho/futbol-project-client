import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EditPlayerForm from "../components/EditPlayerForm"; 

function PlayerAbout() {

  // All player data
  const [player, setPlayer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Initial Edit value

  const params = useParams();  // Gets URL parameters (player ID)
  const navigate = useNavigate();  // Navigation system

  useEffect(() => {
    //Get all the initial data
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/players/${params.id}`)
      .then((response) => {
        //Set all the data to respective place
        console.log(response.data);
        setPlayer(response.data);
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  }, [params.id]);

  // Delete Player
  const deletePlayer = () => {
    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/api/players/${params.id}`)
      .then(() => {
        // Redirect to players list after successful delete
        navigate("/players");
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  // Calculate age by month and year
  const calculateAge = (birthDate) => {
    //Get the actual date and birth from player
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSave = (updatedPlayer) => {
    setPlayer(updatedPlayer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Loading effect
  if (!player) {
    return <h3>Loading player details...</h3>;
  }

  if (isEditing) {
    return (
      <EditPlayerForm
        player={player}
        onSave={handleSave}
        onCancel={handleCancel}
        params={params}
        navigate={navigate}
      />
    );
  }


  return (
    <div className="player-about">
      <div className="player-header">
        <h1>{player.name}</h1>
        <div className="player-nationality">
          <span className="flag">{player.nation}</span>
        </div>
      </div>

      <div className="player-basic-info">
        <div className="info-row">
          <p>
            <strong>Nationality:</strong> {player.nation}
          </p>
        </div>
        <div className="info-row">
          <p>
            <strong>Age:</strong> {calculateAge(player["birth date"])}
          </p>
          <p>
            <strong>Born:</strong>{" "}
            {new Date(player["birth date"]).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="player-stats">
        <div className="stat-card">
          <h3>Goals</h3>
          <div className="stat-number">{player.goals || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Assists</h3>
          <div className="stat-number">{player.assist || 0}</div>
        </div>
      </div>

      {player.description && (
        <div className="player-description">
          <h3>Description</h3>
          <p>{player.description}</p>
        </div>
      )}

      {/* Show all the trophies from the team, only if it has */}
      {player["team trophies"] && player["team trophies"].length > 0 && (
        <div className="trophies-section">
          <h3>Team Trophies ({player["team trophies"].length})</h3>
          <ul className="trophies-list">
            {player["team trophies"].map((trophy, index) => (
              <li key={index}>{trophy}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Show all the individual trophies, only if it has */}
      {player["individual awards"] &&
        player["individual awards"].length > 0 && (
          <div className="awards-section">
            <h3>Individual Awards ({player["individual awards"].length})</h3>
            <ul className="awards-list">
              {player["individual awards"].map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </div>
        )}

      <div className="action-buttons">
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          Edit Player
        </button>
        <button onClick={deletePlayer} className="delete-btn">
          Delete Player
        </button>
      </div>

      <Link to="/players" className="link">
        ← Back to Players
      </Link>
    </div>
  );
}

export default PlayerAbout;