import { useState } from "react";
import { LogoutButton } from "../components";

export const CommentGenerator = () => {
  const [response, setResponse] = useState<object | undefined>();
  return (
    <>
      <h2>Comment Generator</h2>
      <LogoutButton />

      <button
        onClick={async () => {
          const response = await fetch(
            "/.netlify/functions/makeCommentGenerationCall"
          );
          const json = await response.json();
          setResponse(json);
        }}
      >
        Call API
      </button>
      <pre>{JSON.stringify(response, null, 4)}</pre>
      <p>secret</p>
    </>
  );
};
