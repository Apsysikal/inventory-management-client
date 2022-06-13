import { ListItem } from "@mui/material";

import { ItemText } from "../atoms/ItemText";
import { ItemCheckbox } from "../atoms/ItemCheckbox";
import { ItemCount } from "../atoms/ItemCount";
import { AddIconButton } from "../atoms/AddIconButton";
import { RemoveIconButton } from "../atoms/RemoveIconButton";

import InventoryItem from "../../types/InventoryItem";

const ItemWithControls: React.FC<{
  item: InventoryItem;
  onCheckbox: Function;
  onRemove: Function;
  onAdd: Function;
}> = ({ item, onCheckbox, onRemove, onAdd }) => {
  const { checked, count, maxCount } = item;

  const removeDsiabled = count === 0;
  const addDisabled = maxCount ? count === maxCount : false;

  return (
    <ListItem>
      <ItemCheckbox
        checked={checked ? checked : false}
        onClick={() => onCheckbox(item)}
      />
      <ItemText item={item} />
      <RemoveIconButton
        disabled={removeDsiabled}
        onClick={() => onRemove(item)}
      />
      <ItemCount item={item} />
      <AddIconButton disabled={addDisabled} onClick={() => onAdd(item)} />
    </ListItem>
  );
};

export { ItemWithControls };
