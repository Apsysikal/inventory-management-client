import { List } from "@mui/material";

import { Item } from "../molecules/Item";

import InventoryItem from "../../types/InventoryItem";

const ItemList: React.FC<{
  items: InventoryItem[];
}> = ({ items }) => {
  return (
    <List>
      {items.map((item) => {
        return <Item key={item.serial} item={item} />;
      })}
    </List>
  );
};

export { ItemList };
