import { useState } from "react";
import { Button, Typography } from "@mui/material";
import TextInput from "../../components/TextInput";
import { registerUser } from "../../services/auth.service";
import { toast } from "react-toastify";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await registerUser(form);
      navigate("/profile-setup");
    } catch (err) {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <Typography variant="h4" className="register-title">
          Talksy
        </Typography>
        <Typography variant="subtitle1" className="register-subtitle">
          Create a new account
        </Typography>

        <TextInput label="Username" name="username" onChange={handleChange} />
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
          className="register-button"
          onClick={handleSubmit}
        >
          Register
        </Button>

        <Typography variant="body2" className="register-footer">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
