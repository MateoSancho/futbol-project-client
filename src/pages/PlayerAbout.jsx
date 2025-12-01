import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PlayerAbout() {
    
  const [player, setPlayer] = useState(null);
  const [position, setPosition] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [nation, setNation] = useState("");
  const [positionId, setPositionId] = useState("");
  const [goals, setGoals] = useState(0);
  const [assist, setAssist] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [teamTrophies, setTeamTrophies] = useState([]);
  const [individualAwards, setIndividualAwards] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/players/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setPlayer(response.data);
        setName(response.data.name);
        setNation(response.data.nation);
        setPositionId(response.data.position);
        setGoals(response.data.goals || 0);
        setAssist(response.data.assist || 0);
        setBirthDate(response.data["birth date"]);
        setDescription(response.data.description || "");
        setTeamTrophies(response.data["team trophies"] || []);
        setIndividualAwards(response.data["individual awards"] || []);

        // Load position data using the position ID from player
        if (response.data.position) {
          axios
            .get(
              `${import.meta.env.VITE_SERVER_URL}/api/positions/${
                response.data.position
              }`
            )
            .then((positionResponse) => {
              setPosition(positionResponse.data);
            })
            .catch((error) => {
              console.error("Error loading position:", error);
              navigate("/error");
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);

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
      setPlayer(updatedPlayer);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const calculateAge = (birthDate) => {
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

  if (!player) {
    return <h3>Loading player details...</h3>;
  }

  if (isEditing) {
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
              onClick={() => setIsEditing(false)}
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
            <strong>Position:</strong> {position ? position.name : "Loading..."}
          </p>
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
