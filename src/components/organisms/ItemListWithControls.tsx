import React from "react";

import { List } from "@mui/material";

import { ItemWithControls } from "../molecules/ItemWithControls";

import InventoryItem from "../../types/InventoryItem";

const ItemListWithControls: React.FC<{
  items: InventoryItem[];
  onCheckbox: Function;
  onRemove: Function;
  onAdd: Function;
}> = ({ items, onCheckbox, onRemove, onAdd }) => {
  return (
    <List>
      {items.map((item) => {
        return (
          <ItemWithControls
            key={item.serial}
            item={item}
            onCheckbox={onCheckbox}
            onRemove={onRemove}
            onAdd={onAdd}
          />
        );
      })}
    </List>
  );
};

export { ItemListWithControls };
