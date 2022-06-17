import { Page } from "./Page";

import { Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Page>
      <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </Page>
  );
};

export { Loading };
