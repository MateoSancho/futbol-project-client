import { useState, useEffect } from "react";
import axios from "axios";

function EditPlayerForm({ player, onSave, onCancel, params, navigate }) {
  const [name, setName] = useState(player.name);
  const [nation, setNation] = useState(player.nation);
  const [positionId, setPositionId] = useState(player.position?._id || player.position);
  const [goals, setGoals] = useState(player.goals || 0);
  const [assist, setAssist] = useState(player.assist || 0);
  const [birthDate, setBirthDate] = useState(player["birth date"]);
  const [description, setDescription] = useState(player.description || "");
  const [teamTrophies, setTeamTrophies] = useState((player["team trophies"] || []).join(", "));
  const [individualAwards, setIndividualAwards] = useState((player["individual awards"] || []).join(", "));
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/positions`)
      .then((res) => setPositions(res.data))
      .catch(() => navigate("/error"));
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedPlayer = {
      name,
      nation,
      position: positionId,
      goals: Number(goals),
      assist: Number(assist),
      "birth date": birthDate,
      description,
      "team trophies": teamTrophies.split(",").map((t) => t.trim()).filter(Boolean),
      "individual awards": individualAwards.split(",").map((a) => a.trim()).filter(Boolean),
    };

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/players/${params.id}`,
        updatedPlayer,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      onSave(response.data);
    } catch {
      navigate("/error");
    }
  };

  return (
    <div className="player-about">
      <h1>Edit Player</h1>

      <form onSubmit={handleFormSubmit} className="edit-form">

        <div className="form-group">
          <label>Name:</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Nationality:</label>
          <input value={nation} onChange={(e) => setNation(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Position:</label>
          <select value={positionId} onChange={(e) => setPositionId(e.target.value)} required>
            <option value="">Select position</option>
            {positions.map((pos) => (
              <option key={pos._id} value={pos._id}>
                {pos.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Goals:</label>
          <input type="number" value={goals} onChange={(e) => setGoals(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Assists:</label>
          <input type="number" value={assist} onChange={(e) => setAssist(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Birth Date:</label>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3" />
        </div>

        <div className="form-group">
          <label>Team Trophies:</label>
          <input value={teamTrophies} onChange={(e) => setTeamTrophies(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Individual Awards:</label>
          <input value={individualAwards} onChange={(e) => setIndividualAwards(e.target.value)} />
        </div>

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>

      </form>
    </div>
  );
}

export default EditPlayerForm;
