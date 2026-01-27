import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import TextInput from "../components/TextInput";
import { loginUser } from "../services/auth.service";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await loginUser(form); // token already saved
      alert("Login successful");
    } catch (err) {
      alert("Login failed");
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Login</Typography>

      <TextInput label="Email" name="email" onChange={handleChange} />
      <TextInput
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
      />

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
