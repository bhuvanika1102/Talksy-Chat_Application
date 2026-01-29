import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/user.service";
import "./Footer.css";

const Footer = () => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setAvatar(res.data.user.avatarUrl);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="footer">
      <NavLink to="/home" className="footer-icon">
        <HomeIcon />
      </NavLink>

      <NavLink to="/chats" className="footer-icon">
        <ChatBubbleOutlineIcon />
      </NavLink>

      <NavLink to="/search" className="footer-icon">
        <SearchIcon />
      </NavLink>
      <NavLink to="/profile" className="footer-avatar">
        {avatar ? (
          <Avatar
            src={avatar}
            sx={{ width: 28, height: 28 }}
          />
        ) : (
          <PersonOutlineIcon />
        )}
      </NavLink>
    </footer>
  );
};

export default Footer;
