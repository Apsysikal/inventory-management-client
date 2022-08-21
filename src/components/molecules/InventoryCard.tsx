import React from "react";

import { IconButton, Paper, Typography, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

type Inventory = {
  id: string;
  title: string;
  description: string;
};

const InventoryCard: React.FC<{
  inventory: Inventory;
  onClick: Function;
}> = ({ inventory, onClick }) => {
  const { id, title, description } = inventory;

  return (
    <>
      <Paper>
        <Box display="flex" alignItems="center" p={1}>
          <Box flexGrow={1}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                onClick(id);
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export { InventoryCard };
