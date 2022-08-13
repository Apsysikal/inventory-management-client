import React from "react";
import { List } from "@mui/material";

import InventoryItem from "../../types/InventoryItem";
import { ItemWithControls } from "../molecules/ItemWithControls";
import { ItemSelectionActionType as Action } from "../../hooks/useItemSelection";

const ItemListWithControls: React.FC<{
  items: InventoryItem[];
  dispatch: Function;
}> = ({ items, dispatch }) => {
  const handleCheckbox = (item: InventoryItem) => {
    if (item.checked) return dispatch({ type: Action.DESELECT, payload: item });

    return dispatch({ type: Action.SELECT, payload: item });
  };

  const handleAdd = (item: InventoryItem) => {
    return dispatch({ type: Action.INCREMENT, payload: item });
  };

  const handleRemove = (item: InventoryItem) => {
    return dispatch({ type: Action.DECREMENT, payload: item });
  };

  return (
    <List>
      {items.map((item) => {
        return (
          <ItemWithControls
            key={item.serial}
            item={item}
            onCheckbox={handleCheckbox}
            onRemove={handleRemove}
            onAdd={handleAdd}
          />
        );
      })}
    </List>
  );
};

export { ItemListWithControls };
