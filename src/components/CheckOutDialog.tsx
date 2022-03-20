import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";

import LogOutIcon from "@mui/icons-material/LogoutOutlined";

import CheckOutDialogListItem from "./CheckOutDialogListItem";

import InventoryItem from "../types/InventoryItem";

interface CheckOutDialogProps {
  listItems: Array<InventoryItem>;
  callback: Function;
}

export default function CheckOutDialog(props: CheckOutDialogProps) {
  const items = props.listItems;
  const checkOutItems: Array<InventoryItem> = [];
  const onCheckOutCallback = props.callback;

  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemChange = (changedItem: InventoryItem) => {
    const index = checkOutItems.findIndex((item) => {
      return item.serial === changedItem.serial;
    });

    if (index === -1) {
      checkOutItems.push(changedItem);
    } else {
      checkOutItems[index] = changedItem;
    }
  };

  const handleAccept = () => {
    onCheckOutCallback(checkOutItems);
    setOpen(false);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSearchText(event.target.value);
  };

  const searchPredicate = (element: InventoryItem) => {
    const description = element.description.toLowerCase();
    const serial = element.serial.toLowerCase();

    const search = searchText.toLowerCase();

    return (
      (description.includes(search) || serial.includes(search)) &&
      element.count > 0
    );
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        fullWidth
        startIcon={<LogOutIcon />}
      >
        Material Auslagern
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Material Auslagern</DialogTitle>
        <DialogContent>
          <List>
            <ListSubheader>
              <TextField
                onChange={handleSearchChange}
                variant="standard"
                fullWidth
                label="Suchbegriff"
                value={searchText}
              ></TextField>
            </ListSubheader>
            {items.filter(searchPredicate).map((item) => (
              <CheckOutDialogListItem
                key={item.serial}
                item={item}
                onItemChangeCallback={handleItemChange}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button onClick={handleAccept}>Auslagern</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
