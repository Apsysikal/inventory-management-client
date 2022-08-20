import { ListItem } from "@mui/material";

import { ItemText } from "../atoms/ItemText";
import { ItemCount } from "../atoms/ItemCount";

import InventoryItem from "../../types/InventoryItem";

const Item: React.FC<{
  item: InventoryItem;
}> = ({ item }) => {
  return (
    <ListItem>
      <ItemText item={item} />
      <ItemCount item={item} />
    </ListItem>
  );
};

export { Item };
