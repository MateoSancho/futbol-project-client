import axios from "axios";

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/auth`
    });
  }

  signup(data) {
    return this.api.post("/signup", data);
  }

  login(data) {
    return this.api.post("/login", data);
  }

  verify() {
    const token = localStorage.getItem("authToken");
    return this.api.get("/verify", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

const authService = new AuthService();
export default authService;
