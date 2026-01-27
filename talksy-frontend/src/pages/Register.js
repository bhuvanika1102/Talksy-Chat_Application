import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import TextInput from "../components/TextInput";
import { registerUser } from "../services/auth.service";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await registerUser(form);
    alert("Registration successful");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Register</Typography>

      <TextInput label="Username" name="username" onChange={handleChange} />
      <TextInput label="Email" name="email" onChange={handleChange} />
      <TextInput
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
      />

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
