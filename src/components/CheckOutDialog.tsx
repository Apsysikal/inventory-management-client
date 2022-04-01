import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import LogOutIcon from "@mui/icons-material/LogoutOutlined";
import CheckOutDialogListItem from "./CheckOutDialogListItem";
import InventoryItem from "../types/InventoryItem";

interface CheckOutDialogProps {
  listItems: Array<InventoryItem>;
  callback: Function;
}

function resetItemsForDialog(items: Array<InventoryItem>) {
  const modifiedItems = items.map((item) => {
    return {
      ...item,
      checked: false,
      maxCount: item.count,
      count: 0,
    };
  });

  return modifiedItems;
}

export default function CheckOutDialog(props: CheckOutDialogProps) {
  const [items, setItems] = React.useState<Array<InventoryItem>>([]);
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const onCheckOutCallback = props.callback;

  const handleOpen = () => {
    const dialogItems = resetItemsForDialog(props.listItems);
    setItems([...dialogItems]);
    setOpen(true);
  };

  const handleClose = () => {
    setItems([]);
    setOpen(false);
  };

  const handleItemChange = (changedItem: InventoryItem) => {
    const updatedItems = items;

    const index = updatedItems.findIndex((item) => {
      return item._id === changedItem._id;
    });

    updatedItems[index] = changedItem;
    setItems([...updatedItems]);
  };

  const handleAccept = () => {
    const selectedItems = items.filter((item) => {
      return item.checked;
    });

    onCheckOutCallback(selectedItems);
    setItems([]);
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
      (element.maxCount || 0) > 0
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
            <TextField
              onChange={handleSearchChange}
              variant="standard"
              fullWidth
              label="Suchbegriff"
              value={searchText}
            ></TextField>
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
