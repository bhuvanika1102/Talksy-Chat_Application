import { useState } from "react";
import { Button, Typography } from "@mui/material";
import TextInput from "../../components/TextInput";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const token = new URLSearchParams(window.location.search).get("token");

  const handleReset = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        token,
        password,
      });
      toast.success("Password reset successful");
    } catch {
      toast.error("Reset failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Typography variant="h5">Set New Password</Typography>

        <TextInput
          label="New Password"
          type="password"
          showToggle
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button fullWidth onClick={handleReset}>
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ResetPassword;
