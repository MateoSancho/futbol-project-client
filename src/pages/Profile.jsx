import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { uploadToCloudinary } from "../services/cloudinary.services";
import profileService from "../services/profile.services";
import axios from "axios";
import "../App.css";

function Profile() {
  const { user, authenticateUser } = useContext(AuthContext);

  // Profile states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // Password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Upload states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Message states
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setProfileImage(user.profileImage || "");
    }
  }, [user]);

  // Get placeholder image
  const getPlaceholderImage = (name = "User") => {
    const initial = name.charAt(0).toUpperCase();
    const color = "004d98"; // Barça blue

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=${color}&color=fff&size=200&bold=true`;
  };

  // Handle profile image upload to Cloudinary
  const handleFileUpload = async (event) => {
    if (!event.target.files[0]) return;

    setIsUploading(true);
    setUploadError("");

    const file = event.target.files[0];

    const result = await uploadToCloudinary(file);

    if (result.success) {
      // Update profile image immediately
      setProfileImage(result.imageUrl);

      // Save to backend
      try {
        await profileService.updateProfile({
          username: user.username,
          email: user.email,
          profileImage: result.imageUrl,
        });
        setProfileMessage("Profile image updated!");
        authenticateUser();
      } catch (saveError) {
        console.error("Save error:", saveError);
        setUploadError("Image uploaded but save failed");
      }
    } else {
      setUploadError(result.error);
    }

    setIsUploading(false);
  };

  // Handle profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMessage("");
    setIsSaving(true);

    try {
      await profileService.updateProfile({
        username,
        email,
        profileImage,
      });

      setProfileMessage("Profile updated successfully!");
      authenticateUser(); // Force refresh of user data
    } catch (error) {
      console.error("Profile update error:", error);
      setProfileMessage(
        `${error.response?.data?.message || "Failed to update profile"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordMessage("");

    if (newPassword !== confirmPassword) {
      setPasswordMessage("New passwords don't match");
      return;
    }

    try {
      await profileService.updatePassword(currentPassword, newPassword);

      setPasswordMessage("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password update error:", error);
      setPasswordMessage(
        `${error.response?.data?.message || "Failed to update password"}`
      );
    }
  };

  if (!user) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-container">
        {/* Left Column - Profile Info */}
        <div className="profile-info">
          <div className="profile-image-section">
            <div className="current-image">
              <img
                src={profileImage || getPlaceholderImage(username)}
                alt="Profile"
                className="profile-avatar"
                onError={(e) => {
                  e.target.src = getPlaceholderImage(username);
                }}
              />
            </div>

            <div className="image-upload">
              <label className="upload-btn">
                {isUploading ? "Uploading..." : "Change Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  style={{ display: "none" }}
                />
              </label>

              {uploadError && <p className="error-text">{uploadError}</p>}

              {/* Quick Save Button for Image */}
              {profileImage !== user.profileImage && (
                <button
                  onClick={() =>
                    handleProfileUpdate({ preventDefault: () => {} })
                  }
                  className="save-image-btn"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Image"}
                </button>
              )}
            </div>
          </div>

          <div className="user-details">
            <h3>Account Details</h3>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              <span className="role-badge">{user.role}</span>
            </p>
            <p>
              <strong>Member since:</strong>{" "}
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="profile-forms">
          {/* Update Profile Form */}
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <h2>Update Profile</h2>

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="update-btn" disabled={isSaving}>
              {isSaving ? "Saving..." : "Update Profile"}
            </button>

            {profileMessage && (
              <p
                className={`message ${
                  profileMessage.includes() ? "success" : "error"
                }`}
              >
                {profileMessage}
              </p>
            )}
          </form>

          {/* Update Password Form */}
          <form onSubmit={handlePasswordUpdate} className="password-form">
            <h2>Change Password</h2>

            <div className="form-group">
              <label>Current Password:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength="8"
              />
              <small>
                At least 8 characters with uppercase, lowercase, and number
              </small>
            </div>

            <div className="form-group">
              <label>Confirm New Password:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
              />
            </div>

            <button type="submit" className="update-btn">
              Change Password
            </button>

            {passwordMessage && (
              <p
                className={`message ${
                  passwordMessage.includes() ? "success" : "error"
                }`}
              >
                {passwordMessage}
              </p>
            )}
          </form>
        </div>
      </div>

      <Link to="/" className="back-link">
        ← Back to Home
      </Link>
    </div>
  );
}

export default Profile;
