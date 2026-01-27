import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/user.service";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((res) => setUser(res.data.user))
      .catch(() => alert("Unauthorized"));
  }, []);

  return <div>{user && <h2>Welcome {user.email}</h2>}</div>;
};

export default Profile;
