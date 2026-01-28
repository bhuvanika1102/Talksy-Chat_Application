import { useState } from "react";
import { Button, Typography } from "@mui/material";
import TextInput from "../../components/TextInput";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/forgot-password", {
        email,
      });
      toast.success("Reset link sent to your email");
    } catch {
      toast.error("Email not found");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Typography variant="h5">Forgot Password</Typography>

        <TextInput
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button fullWidth onClick={handleSubmit}>
          Send Reset Link
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;
