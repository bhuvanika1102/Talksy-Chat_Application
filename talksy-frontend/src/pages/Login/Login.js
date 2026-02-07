import { useState } from "react";
import { Button, Typography } from "@mui/material";
import TextInput from "../../components/TextInput";
import { loginUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await loginUser(form);
      navigate("/profile");
    } catch (err) {
      toast.error("Login failed! Check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Typography variant="h4" className="login-title">
          Talksy
        </Typography>
        <Typography variant="subtitle1" className="login-subtitle">
          Welcome back! Please login to continue
        </Typography>

        <TextInput label="Email" name="email" onChange={handleChange} />
        <TextInput
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          className="login-button"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography className="login-footer">
          <a href="/forgot-password">Forgot password?</a>
        </Typography>

        <Typography variant="body2" className="login-footer">
          Don't have an account? <a href="/register">Register</a>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
