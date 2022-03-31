import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

import InventoryItem from "../types/InventoryItem";

interface CheckInDialogListItemProps {
  item: InventoryItem;
  onItemChangedCallback: Function;
}

export default function CheckInDialogListItem(
  props: CheckInDialogListItemProps
) {
  const onItemChangedCallback = props.onItemChangedCallback;

  const [item, setItem] = React.useState({
    _id: props.item._id,
    checked: props.item.checked || false,
    serial: props.item.serial,
    description: props.item.description,
    count: props.item.count,
  });

  const handleAddClick = () => {
    let updatedItem = item;

    updatedItem.checked = true;
    updatedItem.count = updatedItem.count + 1;

    onItemChangedCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleRemoveClick = () => {
    let updatedItem = item;

    if (item.count === 0) {
      return;
    } else if (item.count === 1) {
      updatedItem.checked = false;
      updatedItem.count = item.count - 1;
    } else {
      updatedItem.count = item.count - 1;
    }

    onItemChangedCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleCheckboxClick = () => {
    let updatedItem = item;

    if (item.count === 0) {
      updatedItem.checked = true;
      updatedItem.count = updatedItem.count + 1;
    } else {
      updatedItem.checked = false;
      updatedItem.count = 0;
    }

    onItemChangedCallback(updatedItem);
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
      <IconButton onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
    </ListItem>
  );
}
