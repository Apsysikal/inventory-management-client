import { useState, MouseEventHandler, ChangeEventHandler } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import InventoryItem from "../../types/InventoryItem";

const ConfirmButton: React.FC<{
  disabled: boolean;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ disabled, handleClick }) => {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={handleClick}
      fullWidth
    >
      Confirm
    </Button>
  );
};

const CancelButton: React.FC<{
  handleClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ handleClick }) => {
  return (
    <Button variant="outlined" onClick={handleClick} fullWidth>
      Cancel
    </Button>
  );
};

const CommentTextField: React.FC<{
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ value, handleChange }) => {
  return (
    <TextField
      id="comment"
      label="Comment"
      value={value}
      onChange={handleChange}
      required
      fullWidth
      margin="normal"
    />
  );
};

const InventoryItemList: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  return (
    <List component={Paper}>
      {items.map((item) => {
        return <InventoryItemListItem item={item} />;
      })}
    </List>
  );
};

const InventoryItemListItem: React.FC<{ item: InventoryItem }> = ({ item }) => {
  const { description, serial, count } = item;

  return (
    <ListItem>
      <ListItemText primary={description} secondary={serial} />
      <Typography>{count}</Typography>
    </ListItem>
  );
};

const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Typography variant="h4" textAlign="center">
      {text}
    </Typography>
  );
};

const Subtitle: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Typography variant="subtitle1" textAlign="center">
      {text}
    </Typography>
  );
};

type ConfirmItemsProps = {
  text: {
    title: string;
    subtitle: string;
  };
  items: InventoryItem[];
  onConfirm: Function;
  onCancel: Function;
};

export default function ConfirmItems({
  text,
  items,
  onConfirm,
  onCancel,
}: ConfirmItemsProps) {
  const [comment, setComment] = useState("");
  const confirmDisabled = comment.trim() === "";

  const { title, subtitle } = text;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Title text={title} />
        <Subtitle text={subtitle} />
      </Grid>
      <Grid item xs={12}>
        <InventoryItemList items={items} />
      </Grid>
      <Grid item xs={12}>
        <CommentTextField
          value={comment}
          handleChange={(event) => setComment(event.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ConfirmButton
          disabled={confirmDisabled}
          handleClick={() => onConfirm(comment)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CancelButton handleClick={() => onCancel()} />
      </Grid>
    </Grid>
  );
}
