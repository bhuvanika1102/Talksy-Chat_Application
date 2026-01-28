import { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const TextInput = ({ label, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      type={isPassword && showPassword ? "text" : type}
      InputProps={
        isPassword
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          : undefined
      }
      {...props}
    />
  );
};

export default TextInput;
