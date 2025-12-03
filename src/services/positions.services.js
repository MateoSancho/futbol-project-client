import axios from "axios";

class PositionsService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/positions`
    });
  }

  getAll() {
    return this.api.get("/");
  }

  getOne(id) {
    return this.api.get(`/${id}`);
  }
}

const positionsService = new PositionsService();
export default positionsService;
