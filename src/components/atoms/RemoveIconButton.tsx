import React from "react";

import { IconButton } from "@mui/material";

import RemoveIcon from "@mui/icons-material/RemoveCircleOutline";

const RemoveIconButton: React.FC<{
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ disabled, onClick }) => {
  return (
    <IconButton disabled={disabled} onClick={onClick}>
      <RemoveIcon />
    </IconButton>
  );
};

export { RemoveIconButton };
