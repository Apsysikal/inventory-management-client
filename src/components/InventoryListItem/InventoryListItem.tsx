import { useState } from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import Typography from "@mui/material/Typography";

import InventoryItem from "../../types/InventoryItem";

export type InventoryListItemType = "checkin" | "checkout";

export type InventoryListItemProps = {
  initialItem: InventoryItem;
  itemType: InventoryListItemType;
  callback: Function;
};

const initializeState = (
  item: InventoryItem,
  itemType: InventoryListItemType
): InventoryItem => {
  return {
    ...item,
    checked: item.checked || false,
    maxCount: itemType === "checkin" ? 0 : item.maxCount || item.count,
    count: item.count || 0,
  };
};

const InventoryListItem = ({
  initialItem,
  itemType,
  callback,
}: InventoryListItemProps) => {
  const [item, setItem] = useState(initializeState(initialItem, itemType));

  const onCheckboxClick = () => {
    const modifiedItem = item;
    const isChecked = item.checked;

    if (isChecked) {
      // Item will be deselected
      modifiedItem.checked = false;
      modifiedItem.count = 0;
    } else {
      // Itemwill be selected
      modifiedItem.checked = true;
      modifiedItem.count = 1;
    }

    setItem({ ...modifiedItem });
    callback(modifiedItem);
  };

  const onAddClick = () => {
    const modifiedItem = item;

    modifiedItem.checked = true;
    modifiedItem.count = item.count + 1;

    setItem({ ...modifiedItem });
    callback(modifiedItem);
  };

  const onRemoveClick = () => {
    const modifiedItem = item;

    if (item.count === 0) {
      // Should not be possible, as button is then disabled
      return;
    } else if (item.count === 1) {
      // Count will be 0 after the update
      modifiedItem.checked = false;
      modifiedItem.count = 0;
    } else {
      modifiedItem.count = item.count - 1;
    }

    setItem({ ...modifiedItem });
    callback(modifiedItem);
  };

  const ListItemTextProps = () => {
    return {
      primary: item.description,
      secondary: item.serial,
    };
  };

  const CheckboxProps = () => {
    return {
      checked: item.checked,
      onClick: onCheckboxClick,
    };
  };

  const AddButtonProps = () => {
    return {
      disabled: item.maxCount ? item.count === item.maxCount : false,
      onClick: onAddClick,
    };
  };

  const RemoveButtonProps = () => {
    return {
      disabled: item.count === 0,
      onClick: onRemoveClick,
    };
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox {...CheckboxProps()} />
      </ListItemIcon>
      <ListItemText {...ListItemTextProps()} />
      <IconButton aria-label="remove" {...RemoveButtonProps()}>
        <RemoveIcon />
      </IconButton>
      <Typography>{item.count}</Typography>
      <IconButton aria-label="add" {...AddButtonProps()}>
        <AddIcon />
      </IconButton>
    </ListItem>
  );
};

export default InventoryListItem;
