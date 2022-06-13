import React from "react";

import { IconButton } from "@mui/material";

import AddIcon from "@mui/icons-material/AddCircleOutline";

const AddIconButton: React.FC<{
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ disabled, onClick }) => {
  return (
    <IconButton disabled={disabled} onClick={onClick}>
      <AddIcon />
    </IconButton>
  );
};

export { AddIconButton };
