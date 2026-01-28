import { useState } from "react";
import { Button, Typography, Avatar } from "@mui/material";
import TextInput from "../../components/TextInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./ProfileSetup.css";
import { setupUserProfile } from "../../services/user.service";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    displayName: "",
    bio: "",
    avatar: null,
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setProfile({ ...profile, avatar: e.target.files[0] });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("displayName", profile.displayName);
      formData.append("bio", profile.bio);
      if (profile.avatar) {
        formData.append("avatar", profile.avatar);
      }

      await setupUserProfile(formData);

      toast.success("Profile updated!");
      navigate("/profile");
    } catch (err) {
      toast.error("Profile update failed");
    }
  };
  return (
    <div className="profile-setup-container">
      <div className="profile-setup-card">
        <Typography variant="h4" className="profile-setup-title">
          Set up your profile
        </Typography>
        <Typography variant="subtitle1" className="profile-setup-subtitle">
          Add a display name, bio, and profile picture
        </Typography>

        <div className="avatar-upload">
          <Avatar
            src={profile.avatar ? URL.createObjectURL(profile.avatar) : ""}
            sx={{ width: 80, height: 80, margin: "0 auto" }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            id="avatar-upload"
            className="avatar-input"
          />
          <label htmlFor="avatar-upload" className="avatar-label">
            Upload Profile Picture
          </label>
        </div>

        <TextInput
          label="Display Name"
          name="displayName"
          onChange={handleChange}
        />
        <TextInput
          label="Bio"
          name="bio"
          onChange={handleChange}
          multiline
          rows={3}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          className="profile-setup-button"
          onClick={handleSubmit}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
};

export default ProfileSetup;
