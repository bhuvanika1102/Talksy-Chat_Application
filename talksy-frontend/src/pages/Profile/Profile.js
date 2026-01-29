import { useEffect, useState } from "react";
import { Avatar, Typography, CircularProgress } from "@mui/material";
import { getUserProfile } from "../../services/user.service";
import Footer from "../../pages/Footer/Footer";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProfile()
      .then((res) => setUser(res.data.user))
      .catch(() => alert("Unauthorized"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress className="loader" />;

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <div className="avatar-wrapper">
            <Avatar src={user.avatarUrl} className="profile-avatar" />
            <span className="online-dot" />
          </div>

          <Typography variant="h5" className="profile-name">
            {user.displayName}
          </Typography>

          <Typography variant="subtitle2" className="profile-email">
            {user.email}
          </Typography>

          <div className="profile-divider" />

          <Typography className="profile-bio">
            “{user.bio || "No bio added"}”
          </Typography>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
