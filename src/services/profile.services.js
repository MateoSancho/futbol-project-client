import axios from "axios";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${import.meta.env.VITE_SERVER_URL}/api/users`
    });
  }

  setToken() {
    const token = localStorage.getItem("authToken");
    if (token) {
      this.api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  // Get current user profile
  getProfile() {
    this.setToken();
    return this.api.get("/me");
  }

  // Update profile (name, email, profileImage)
  updateProfile(data) {
    this.setToken();
    return this.api.patch("/me", data);
  }

  // Update password
  updatePassword(currentPassword, newPassword) {
    this.setToken();
    return this.api.patch("/me/password", { currentPassword, newPassword });
  }
}

const profileService = new ProfileService();
export default profileService;