import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import playersService from "../services/players.services";
import positionsService from "../services/positions.services";

function AddPlayer() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [social, setSocial] = useState("");
  const [image, setImage] = useState("");
  const [teamTrophies, setTeamTrophies] = useState("");
  const [individualAwards, setIndividualAwards] = useState("");
  const [nation, setNation] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState(0);
  const [assists, setAssists] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [positionId, setPositionId] = useState("");

  const [positions, setPositions] = useState([]);

  // Load positions
  useEffect(() => {
    positionsService
      .getAll()
      .then((res) => setPositions(res.data))
      .catch(() => navigate("/error"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPlayer = {
      name,
      social,
      image,
      teamTrophies: teamTrophies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      individualAwards: individualAwards
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      nation: nation.split(",").map((n) => n.trim()).filter(Boolean),
      description,
      goals: Number(goals),
      assists: Number(assists),
      birthday,
      position: positionId,
    };

    playersService
      .create(newPlayer)
      .then(() => navigate("/players"))
      .catch(() => navigate("/error"));
  };

  return (
    <div className="add-player-page">
      <h1>Add New Player</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Player Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Nationality (comma separated)"
          value={nation}
          onChange={(e) => setNation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Social Link"
          value={social}
          onChange={(e) => setSocial(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Team Trophies (comma separated)"
          value={teamTrophies}
          onChange={(e) => setTeamTrophies(e.target.value)}
        />

        <input
          type="text"
          placeholder="Individual Awards (comma separated)"
          value={individualAwards}
          onChange={(e) => setIndividualAwards(e.target.value)}
        />

        <input
          type="number"
          placeholder="Goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
        />

        <input
          type="number"
          placeholder="Assists"
          value={assists}
          onChange={(e) => setAssists(e.target.value)}
        />

        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        <select
          value={positionId}
          onChange={(e) => setPositionId(e.target.value)}
          required
        >
          <option value="">Select Position</option>
          {positions.map((pos) => (
            <option key={pos._id} value={pos._id}>
              {pos.name}
            </option>
          ))}
        </select>

        <button type="submit">Create Player</button>
      </form>
    </div>
  );
}

export default AddPlayer;
