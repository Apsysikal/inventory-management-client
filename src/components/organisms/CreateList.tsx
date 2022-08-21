import { useState } from "react";

import { Grid, TextField, Button } from "@mui/material";

const CreateList: React.FC<{
  disableConfirm?: boolean;
  handleCancel: Function;
  handleConfirm: Function;
}> = ({ disableConfirm, handleCancel, handleConfirm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const disableCreate = () => {
    return !(title.trim().length > 1 && description.trim().length > 1);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          autoFocus
          label="Title"
          placeholder="Hardware Tracking List"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Description"
          placeholder="List used to track hardware"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            handleCancel();
          }}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          disabled={disableConfirm || disableCreate()}
          variant="contained"
          onClick={() => {
            handleConfirm({
              title,
              description,
            });
          }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export { CreateList };
