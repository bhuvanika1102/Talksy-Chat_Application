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
        <Avatar src={user.avatarUrl} sx={{ width: 120, height: 120 }} />

        <Typography variant="h5" className="profile-name">
          {user.displayName}
        </Typography>

        <Typography variant="subtitle1" className="profile-email">
          {user.email}
        </Typography>

        <Typography className="profile-bio">
          {user.bio || "No bio added"}
        </Typography>
      </div>
    </div>
     <Footer />
     </>
  );
};

export default Profile;
