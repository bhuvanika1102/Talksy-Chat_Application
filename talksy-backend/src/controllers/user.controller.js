const db = require("../config/db");

exports.setupProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { displayName, bio } = req.body;

    // build avatar URL only if file uploaded
    const avatarUrl = req.file
      ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}`
      : null;

    await db.query(
      `
      UPDATE users
      SET display_name = $1,
          bio = $2,
          avatar_url = COALESCE($3, avatar_url),
          profile_completed = true
      WHERE id = $4
      `,
      [displayName, bio, avatarUrl, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Profile update failed" });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `
      SELECT id, email, display_name AS "displayName",
             bio, avatar_url AS "avatarUrl"
      FROM users
      WHERE id = $1
      `,
      [userId]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};
