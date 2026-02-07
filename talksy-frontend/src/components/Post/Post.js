// src/components/Post/Post.js
import {
    Avatar,
    Typography,
    IconButton
  } from "@mui/material";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
  import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
  import "./Post.css";
  
  const Post = ({ post }) => {
    if (!post) return null; 
  
    return (
      <div className="post-card">
        <div className="post-header">
          <Avatar
            src={post.avatarUrl || ""}
            alt={post.username || "user"}
          />
          <Typography className="post-username">
            {post.username || "user"}
          </Typography>
        </div>
  
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt="post"
            className="post-image"
          />
        )}
  
        <div className="post-actions">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineIcon />
          </IconButton>
          <IconButton>
            <SendOutlinedIcon />
          </IconButton>
        </div>
  
        {post.caption && (
          <Typography className="post-caption">
            <strong>{post.username}</strong> {post.caption}
          </Typography>
        )}
      </div>
    );
  };
  
  export default Post;
  