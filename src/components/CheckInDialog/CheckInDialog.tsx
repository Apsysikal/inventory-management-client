import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import LogInIcon from "@mui/icons-material/LoginOutlined";
import InventoryItem from "../../types/InventoryItem";
import CheckInDialogListItem from "../CheckInDialogListItem/CheckInDialogListItem";

interface CheckInDialogProps {
  listItems: Array<InventoryItem>;
  callback: Function;
}

function resetItemsForDialog(items: Array<InventoryItem>) {
  const modifiedItems = items.map((item) => {
    return {
      ...item,
      checked: false,
      count: 0,
    };
  });

  return modifiedItems;
}

export default function CheckInDialog(props: CheckInDialogProps) {
  const [items, setItems] = React.useState<Array<InventoryItem>>([]);
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const parentCallback = props.callback;

  const handleClickOpen = () => {
    const dialogItems = resetItemsForDialog(props.listItems);
    setItems([...dialogItems]);
    setOpen(true);
  };

  const handleCancel = () => {
    setItems([]);
    setOpen(false);
  };

  const handleAccept = () => {
    const selectedItems = items.filter((item) => {
      return item.checked;
    });

    parentCallback(selectedItems);
    setItems([]);
    setOpen(false);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleItemChange = (changedItem: InventoryItem) => {
    const updatedItems = items;

    const index = updatedItems.findIndex((item) => {
      return item._id === changedItem._id;
    });

    updatedItems[index] = changedItem;
    setItems([...updatedItems]);
  };

  const searchPredicate = (element: InventoryItem) => {
    const description = element.description.toLowerCase();
    const serial = element.serial.toLowerCase();

    const search = searchText.toLowerCase();

    return description.includes(search) || serial.includes(search);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        fullWidth
        startIcon={<LogInIcon />}
      >
        Material Einlagern
      </Button>
      <Dialog open={open} onClose={handleCancel} fullWidth>
        <DialogTitle>Material Einlagern</DialogTitle>
        <DialogContent>
          <List>
            <TextField
              onChange={handleSearchChange}
              variant="standard"
              fullWidth
              label="Suchbegriff"
              value={searchText}
            ></TextField>
            {items.filter(searchPredicate).map((item: InventoryItem) => (
              <CheckInDialogListItem
                key={item.serial}
                item={item}
                onItemChangedCallback={handleItemChange}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleCancel}>
            Abbrechen
          </Button>
          <Button onClick={handleAccept}>Einlagern</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
