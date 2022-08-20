import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export { Loading };
