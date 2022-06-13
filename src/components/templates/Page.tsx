import React from "react";

import { Container } from "@mui/material";

const Page: React.FC<{ children?: React.ReactElement | React.ReactElement[] }> =
  ({ children }) => {
    return <Container maxWidth="md">{children}</Container>;
  };

export { Page };
