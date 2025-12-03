import { useState, useEffect } from "react";

import playersService from "../services/players.services";
import positionsService from "../services/positions.services";

function EditPlayerForm({ player, onSave, onCancel, params, navigate }) {
  const [name, setName] = useState(player.name);
  const [nation, setNation] = useState(player.nation.join(", "));
  const [positionId, setPositionId] = useState(player.position?._id || player.position);

  const [goals, setGoals] = useState(player.goals || 0);
  const [assists, setAssists] = useState(player.assists || 0);

  const [birthday, setBirthday] = useState(player.birthday?.slice(0, 10));
  const [description, setDescription] = useState(player.description || "");

  const [teamTrophies, setTeamTrophies] = useState(
    (player.teamTrophies || []).join(", ")
  );

  const [individualAwards, setIndividualAwards] = useState(
    (player.individualAwards || []).join(", ")
  );

  const [positions, setPositions] = useState([]);

  // GET Positions
  useEffect(() => {
    positionsService
      .getAll()
      .then((res) => setPositions(res.data))
      .catch(() => navigate("/error"));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const updatedPlayer = {
      name,
      nation: nation.split(",").map((n) => n.trim()).filter(Boolean),
      position: positionId,
      goals: Number(goals),
      assists: Number(assists),
      birthday,
      description,
      teamTrophies: teamTrophies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      individualAwards: individualAwards
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
    };

    playersService
      .update(params.id, updatedPlayer)
      .then((response) => onSave(response.data))
      .catch(() => navigate("/error"));
  };

  return (
    <div className="player-about">
      <h1>Edit Player</h1>

      <form onSubmit={handleFormSubmit} className="edit-form">

        {/* NAME */}
        <div className="form-group">
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* NATION */}
        <div className="form-group">
          <label>Nationality:</label>
          <input
            value={nation}
            onChange={(e) => setNation(e.target.value)}
            required
          />
        </div>

        {/* POSITION */}
        <div className="form-group">
          <label>Position:</label>
          <select
            value={positionId}
            onChange={(e) => setPositionId(e.target.value)}
            required
          >
            <option value="">Select position</option>
            {positions.map((pos) => (
              <option key={pos._id} value={pos._id}>
                {pos.name}
              </option>
            ))}
          </select>
        </div>

        {/* GOALS */}
        <div className="form-group">
          <label>Goals:</label>
          <input
            type="number"
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
          />
        </div>

        {/* ASSISTS */}
        <div className="form-group">
          <label>Assists:</label>
          <input
            type="number"
            value={assists}
            onChange={(e) => setAssists(e.target.value)}
          />
        </div>

        {/* BIRTHDAY */}
        <div className="form-group">
          <label>Birthday:</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>

        {/* TEAM TROPHIES */}
        <div className="form-group">
          <label>Team Trophies:</label>
          <input
            value={teamTrophies}
            onChange={(e) => setTeamTrophies(e.target.value)}
          />
        </div>

        {/* INDIVIDUAL AWARDS */}
        <div className="form-group">
          <label>Individual Awards:</label>
          <input
            value={individualAwards}
            onChange={(e) => setIndividualAwards(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditPlayerForm;
