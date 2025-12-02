import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function EditPlayerForm({ player, onSave, onCancel, params, navigate }) {
  const [name, setName] = useState(player.name);
  const [nation, setNation] = useState(player.nation);
  const [positionId, setPositionId] = useState(player.position);
  const [goals, setGoals] = useState(player.goals || 0);
  const [assist, setAssist] = useState(player.assist || 0);
  const [birthDate, setBirthDate] = useState(player["birth date"]);
  const [description, setDescription] = useState(player.description || "");
  const [teamTrophies, setTeamTrophies] = useState(player["team trophies"] || []);
  const [individualAwards, setIndividualAwards] = useState(player["individual awards"] || []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedPlayer = {
      name,
      nation,
      position: positionId,
      goals: parseInt(goals),
      assist: parseInt(assist),
      "birth date": birthDate,
      description,
      "team trophies": teamTrophies,
      "individual awards": individualAwards,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/players/${params.id}`,
        updatedPlayer
      );
      onSave(updatedPlayer);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div className="player-about">
      <h1>Edit Player</h1>

      <form onSubmit={handleFormSubmit} className="edit-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Nationality:</label>
          <input
            type="text"
            name="nation"
            value={nation}
            onChange={(e) => setNation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Position ID:</label>
          <input
            type="text"
            name="positionId"
            value={positionId}
            onChange={(e) => setPositionId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Goals:</label>
          <input
            type="number"
            name="goals"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Assists:</label>
          <input
            type="number"
            name="assist"
            value={assist}
            onChange={(e) => setAssist(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Birth Date:</label>
          <input
            type="date"
            name="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>

      <Link to="/players" className="link">
        ← Back to Players
      </Link>
    </div>
  );
}

export default EditPlayerForm;