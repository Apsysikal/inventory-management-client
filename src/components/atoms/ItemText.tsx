import React from "react";

import { ListItemText } from "@mui/material";

import InventoryItem from "../../types/InventoryItem";

const ItemText: React.FC<{
  item: InventoryItem;
}> = ({ item }) => {
  return <ListItemText primary={item.description} secondary={item.serial} />;
};

export { ItemText };
