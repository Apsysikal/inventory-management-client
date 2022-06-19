import { useState } from "react";

import { Grid, TextField, Button } from "@mui/material";

const CreateItem: React.FC<{
  handleCancel: Function;
  handleConfirm: Function;
}> = ({ handleCancel, handleConfirm }) => {
  const [serial, setSerial] = useState("");
  const [description, setDescription] = useState("");
  const [count, setCount] = useState(0);

  const disableCreate = () => {
    return !(serial.trim().length > 1 && description.trim().length > 1);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          autoFocus
          label="Serial"
          placeholder="5070102"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          label="Description"
          placeholder="Priva Blue ID S-Line DOR8m"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          type="number"
          label="Count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
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
          Cancel
        </Button>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Button
          fullWidth
          disabled={disableCreate()}
          variant="contained"
          onClick={() => {
            handleConfirm({
              serial,
              description,
              count,
            });
          }}
        >
          Create
        </Button>
      </Grid>
    </Grid>
  );
};

export { CreateItem };
