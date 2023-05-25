import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./components";
import { CommentGenerator } from "./pages";

export const App = () => {
  const { user, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <>
      <CommentGenerator />
    </>
  ) : (
    <>
      <h2>App</h2>
      <LoginButton />
    </>
  );
};
