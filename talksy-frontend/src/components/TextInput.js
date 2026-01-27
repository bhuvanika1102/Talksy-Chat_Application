import { TextField } from "@mui/material";

const TextInput = ({ label, ...props }) => {
  return (
    <TextField
      label={label}
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default TextInput;
