import axios from "axios";

class CommentsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/comments`
    });
  }

  setToken() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  getComments(playerId) {
    return this.api.get(`/player/${playerId}`);
  }

  createComment(playerId, text) {
    this.setToken();
    return this.api.post("/", { playerId, text });
  }

  deleteComment(commentId) {
    this.setToken();
    return this.api.delete(`/${commentId}`);
  }
}

const commentsService = new CommentsService();
export default commentsService;
