import React from "react";
import { FiPlusSquare } from "react-icons/fi";

const ProfileHeader = ({ onAddPost }) => {
  return (
    <div className="profile-header">
      <h2>queen_bhuva</h2>
      <FiPlusSquare
        size={26}
        className="add-post-icon"
        onClick={onAddPost}
      />
    </div>
  );
};

export default ProfileHeader;
