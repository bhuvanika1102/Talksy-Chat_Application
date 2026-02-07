import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const CreatePostModal = ({ onClose }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      onClose();
    } catch (err) {
      alert("Failed to upload post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="post-modal-backdrop">
      <Box className="post-modal">
        <Typography variant="h6">Create new post</Typography>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <TextField
          placeholder="Write a caption..."
          multiline
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handlePost}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </Button>

        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default CreatePostModal;
