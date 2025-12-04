import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import playersService from "../services/players.services";
import EditPlayerForm from "../components/EditPlayerForm";
import CommentSection from "../components/CommentSection";

function PlayerAbout() {
  const [player, setPlayer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  // Load player data
  useEffect(() => {
    playersService
      .getOne(params.id)
      .then((res) => setPlayer(res.data))
      .catch(() => navigate("/error"));
  }, [params.id]);

  // Delete player (admin only)
  const deletePlayer = () => {
    playersService
      .delete(params.id)
      .then(() => navigate("/players"))
      .catch(() => navigate("/error"));
  };

  // Calculate age properly from birthday
  const calculateAge = (birthday) => {
    if (!birthday) return "N/A";
    const today = new Date();
    const birth = new Date(birthday);

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

  const handleCancel = () => setIsEditing(false);

  if (!player) return <h3>Loading player details...</h3>;

  // If editing mode → show the edit form
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

      {/* HEADER */}
      <div className="player-header">
        <div className="player-image-large">
          <img 
            src={player.image || "https://via.placeholder.com/400x500/004d98/ffffff?text=No+Image"} 
            alt={player.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x500/004d98/ffffff?text=No+Image";
            }}
          />
        </div>

        <div className="player-header-info">
          <h1>{player.name}</h1>
          <div className="player-nationality">
            {Array.isArray(player.nation)
              ? player.nation.join(", ")
              : player.nation}
          </div>
        </div>
      </div>

      {/* BASIC INFO */}
      <div className="player-basic-info">
        <div className="info-row">
          <p>
            <strong>Nationality:</strong>{" "}
            {Array.isArray(player.nation)
              ? player.nation.join(", ")
              : player.nation}
          </p>
        </div>

        <div className="info-row">
          <p>
            <strong>Age:</strong> {calculateAge(player.birthday)}
          </p>
          <p>
            <strong>Born:</strong>{" "}
            {player.birthday
              ? new Date(player.birthday).toLocaleDateString()
              : "Unknown"}
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="player-stats">
        <div className="stat-card">
          <h3>Goals</h3>
          <div className="stat-number">{player.goals || 0}</div>
        </div>

        <div className="stat-card">
          <h3>Assists</h3>
          <div className="stat-number">{player.assists || 0}</div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {player.description && (
        <div className="player-description">
          <h3>Description</h3>
          <p>{player.description}</p>
        </div>
      )}

      {/* TEAM TROPHIES */}
      {player.teamTrophies && player.teamTrophies.length > 0 && (
        <div className="trophies-section">
          <h3>Team Trophies ({player.teamTrophies.length})</h3>
          <ul className="trophies-list">
            {player.teamTrophies.map((trophy, index) => (
              <li key={index}>{trophy}</li>
            ))}
          </ul>
        </div>
      )}

      {/* INDIVIDUAL AWARDS */}
      {player.individualAwards && player.individualAwards.length > 0 && (
        <div className="awards-section">
          <h3>Individual Awards ({player.individualAwards.length})</h3>
          <ul className="awards-list">
            {player.individualAwards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
        </div>
      )}

      {/* COMMENTS */}
      <div className="comments-container">
        <CommentSection playerId={params.id} />
      </div>

      {/* ACTION BUTTONS — ONLY ADMINS */}
      {role === "admin" && (
        <div className="action-buttons">
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Edit Player
          </button>

          <button onClick={deletePlayer} className="delete-btn">
            Delete Player
          </button>
        </div>
      )}

      <Link to="/players" className="link">
        ← Back to Players
      </Link>

    </div>
  );
}

export default PlayerAbout;
