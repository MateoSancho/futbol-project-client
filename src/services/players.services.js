import axios from "axios";

class PlayersService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/players`
    });
  }

  // Insert token into headers
  setToken() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  getAll() {
    this.setToken();
    return this.api.get("/");
  }

  getOne(id) {
    this.setToken();
    return this.api.get(`/${id}`);
  }

  create(data) {
    this.setToken();
    return this.api.post("/", data);
  }

  update(id, data) {
    this.setToken();
    return this.api.put(`/${id}`, data);
  }

  delete(id) {
    this.setToken();
    return this.api.delete(`/${id}`);
  }
}

const playersService = new PlayersService();
export default playersService;
