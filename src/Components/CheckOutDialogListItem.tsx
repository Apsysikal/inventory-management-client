import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import InventoryItem from "../types/InventoryItem";

interface CheckOutDialogListItemProps {
  item: InventoryItem;
  onItemChangeCallback: Function;
}

export default function CheckOutDialogListItem(
  props: CheckOutDialogListItemProps
) {
  const onItemChangeCallback = props.onItemChangeCallback;

  const [item, setItem] = React.useState({
    checked: false,
    serial: props.item.serial,
    description: props.item.description,
    count: 0,
    maxCount: props.item.count,
  });

  const handleAddClick = () => {
    let updatedItem = item;

    if (updatedItem.count === updatedItem.maxCount) {
      return;
    }

    updatedItem.checked = true;
    updatedItem.count = updatedItem.count + 1;

    onItemChangeCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleRemoveClick = () => {
    let updatedItem = item;

    if (updatedItem.count === 0) {
      return;
    } else if (updatedItem.count === 1) {
      updatedItem.checked = false;
      updatedItem.count = updatedItem.count - 1;
    } else {
      updatedItem.count = updatedItem.count - 1;
    }

    onItemChangeCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleCheckboxClick = () => {
    let updatedItem = item;

    if (updatedItem.count === 0) {
      updatedItem.checked = true;
      updatedItem.count = updatedItem.count + 1;
    } else {
      updatedItem.checked = false;
      updatedItem.count = 0;
    }

    onItemChangeCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  return (
    <ListItem key={item.serial}>
      <ListItemIcon>
        <Checkbox onClick={handleCheckboxClick} checked={item.checked} />
      </ListItemIcon>
      <ListItemText
        primary={item.description}
        secondary={item.serial}
        style={{ marginRight: "1rem" }}
      />
      <IconButton
        onClick={handleRemoveClick}
        disabled={item.count === 0 ? true : false}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{item.count}</Typography>
      <IconButton
        onClick={handleAddClick}
        disabled={item.count === item.maxCount ? true : false}
      >
        <AddIcon />
      </IconButton>
    </ListItem>
  );
}
