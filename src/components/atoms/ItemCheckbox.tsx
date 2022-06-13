import React from "react";

import { ListItemIcon, Checkbox } from "@mui/material";

const ItemCheckbox: React.FC<{
  checked: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ checked, onClick }) => {
  return (
    <ListItemIcon>
      <Checkbox checked={checked} onClick={onClick} />
    </ListItemIcon>
  );
};

export { ItemCheckbox };
