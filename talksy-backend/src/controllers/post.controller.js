const db = require("../config/db");

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;

    const result = await db.query(
      `
      INSERT INTO posts (user_id, image_url, caption)
      VALUES ($1, $2, $3)
      RETURNING id, image_url AS "imageUrl", caption, created_at AS "createdAt"
      `,
      [userId, imageUrl, caption]
    );

    res.status(201).json({
      success: true,
      post: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const result = await db.query(
      `
      SELECT 
        p.id,
        p.caption,
        p.image_url AS "imageUrl",
        p.created_at AS "createdAt",
        u.username,
        u.avatar_url AS "avatarUrl"
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
      `
    );

    res.status(200).json({
      success: true,
      posts: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feed",
    });
  }
};
