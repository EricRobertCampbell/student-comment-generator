import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const Title = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  console.log({ sm });
  return (
    <>
      {sm ? (
        <Typography gutterBottom variant="h4" component="h1" textAlign="center">
          Student Comment Generator
        </Typography>
      ) : (
        <Typography gutterBottom variant="h1" textAlign="center">
          Student Comment Generator
        </Typography>
      )}
    </>
  );
};
