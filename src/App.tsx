import "./App.css";
import { Typography } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, Title } from "./components";
import { CommentGenerator } from "./pages";
import { Stack } from "@mui/system";

export const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <div
        style={{
          width: "clamp(100px, 75%, 780px)",
        }}
      >
        <Title />
        {isAuthenticated ? (
          <>
            <CommentGenerator />
          </>
        ) : (
          <Stack direction="column" alignItems="center" justifyContent="center">
            <Typography gutterBottom>
              Log in to begin generating your report card comments!
            </Typography>
            <LoginButton />
          </Stack>
        )}
      </div>
    </div>
  );
};
