import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function PositionAbout() {

  const [position, setPosition] = useState(null);
  const [players, setPlayers] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    // Load position details
      axios.get(`${import.meta.env.VITE_SERVER_URL}/api/positions/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setPosition(response.data);

        // Load players for this position
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/players`)
        .then((playersResponse) => {
            const playersInPosition = playersResponse.data.filter(
              (player) =>
                player.position === params.id ||
                (player.position && player.position._id === params.id)
            );
            setPlayers(playersInPosition);
          })
          .catch((error) => {
            console.error(error);
            navigate("/error");
          });
      })
      .catch((error) => {
        console.error(error);
        navigate("/error");
      });
  }, [params.id]);

  if (!position) {
    return <h3>Loading position details...</h3>;
  }

  return (
    <div className="position-about">

      <div className="position-header">
        <h1>{position.name}</h1>
      </div>

      {/*  */}
      {players.length > 0 && (
        <div className="players-in-position">

          <h3>Players in this Position ({players.length})</h3>

          <div className="players-grid">
            {players.slice(0, 6).map((player) => (

              <div key={player._id} className="player-mini-card">

                <h4>{player.name}</h4>
                <p>{player.nation}</p>

                <Link to={`/players/${player.id}`} className="mini-link">View Player</Link>

              </div>
            ))}
          </div>

          {players.length > 6 && (
            <p className="more-players">
              ... and {players.length - 6} more players
            </p>
          )}

        </div>
      )}

      <Link to="/positions" className="link">
        ← Back to Positions
      </Link>
    </div>
  );
}

export default PositionAbout;
