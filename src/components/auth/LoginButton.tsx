import { useAuth0 } from "@auth0/auth0-react";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";

interface LoginButtonProps {
  startEdge?: boolean;
}

const LoginButton = ({ startEdge }: LoginButtonProps) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <IconButton
      edge={startEdge ? "start" : "end"}
      color="inherit"
      aria-label="Login button"
      onClick={() => loginWithRedirect()}
    >
      <LoginIcon fontSize="large" />
    </IconButton>
  );
};

export default LoginButton;
