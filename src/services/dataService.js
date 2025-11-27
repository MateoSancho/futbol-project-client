// Import your JSON data
import playersData from '../assets/data/football-database.player copia.json';
import positionsData from '../assets/data/football-database.position copia.json';
import commentsData from '../assets/data/football-database.comment copia.json';
import usersData from '../assets/data/football-database.user copia.json';

// Player functions
export const getAllPlayers = () => {
  return playersData;
};

export const getPlayerById = (id) => {
  return playersData.find(player => player._id.$oid === id);
};

export const getPlayersByPosition = (positionId) => {
  return playersData.filter(player => player.position === positionId);
};

// Position functions
export const getAllPositions = () => {
  return positionsData;
};

export const getPositionById = (id) => {
  return positionsData.find(position => position._id.$oid === id);
};

// Comment functions
export const getCommentsByPlayerId = (playerId) => {
  return commentsData.filter(comment => comment.playerId === playerId);
};

// Search functions
export const searchPlayers = (searchTerm) => {
  const term = searchTerm.toLowerCase();
  return playersData.filter(player => 
    player.name.toLowerCase().includes(term) ||
    player.nation.toLowerCase().includes(term) ||
    player.position.toLowerCase().includes(term)
  );
};

// Helper function to get position name by ID
export const getPositionName = (positionId) => {
  const position = positionsData.find(pos => pos._id.$oid === positionId);
  return position ? position.name : 'Unknown Position';
};