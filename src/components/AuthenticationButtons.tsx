import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      type="button"
      variant="contained"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      type="button"
      variant="contained"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};
