import React from "react";

import { Typography } from "@mui/material";

import InventoryItem from "../../types/InventoryItem";

const ItemCount: React.FC<{
  item: InventoryItem;
}> = ({ item }) => {
  return <Typography>{item.count}</Typography>;
};

export { ItemCount };
