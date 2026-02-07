import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Post from "../../components/Post/Post";
import Footer from "../Footer/Footer";
import { getHomeFeed } from "../../services/post.service";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeFeed()
      .then((res) => setPosts(res.data.posts))
      .catch(() => alert("Failed to load feed"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress className="loader" />;

  return (
    <>
      <div className="home-container">
        {posts.length === 0 ? (
          <p className="empty-feed">No posts yet</p>
        ) : (
            posts.map((post) => (
                <Post key={post.id} post={post} />
              ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
