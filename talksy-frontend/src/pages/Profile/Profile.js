import { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

import { getUserProfile } from "../../services/user.service";
import Footer from "../../pages/Footer/Footer";
import CreatePostModal from "../CreatePostModal/CreatePostModal";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPostModal, setOpenPostModal] = useState(false);

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
          <div className="profile-header">
            <Typography className="profile-username">
              {user.displayName}
            </Typography>

            <IconButton
              className="add-post-btn"
              onClick={() => setOpenPostModal(true)}
            >
              <AddBoxOutlinedIcon fontSize="large" />
            </IconButton>
          </div>

          <div className="avatar-wrapper">
            <Avatar src={user.avatarUrl} className="profile-avatar" />
            <span className="online-dot" />
          </div>

          <Typography variant="subtitle2" className="profile-email">
            {user.email}
          </Typography>

          <div className="profile-divider" />

          <Typography className="profile-bio">
            “{user.bio || "No bio added"}”
          </Typography>
        </div>
      </div>
      {openPostModal && (
        <CreatePostModal onClose={() => setOpenPostModal(false)} />
      )}

      <Footer />
    </>
  );
};

export default Profile;
