import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Paper, Grid, Button } from "@mui/material";

import { ItemList } from "../components/organisms/ItemList";
import { ItemListWithControls } from "../components/organisms/ItemListWithControls";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { Page } from "../components/templates/Page";

import { useGet } from "../hooks/api";

const url = "https://krat.es";
const id = "36829d701ab35548816a";

const Checkin = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, data, error } = useGet(`${url}/${id}/items`);
  const navigate = useNavigate();

  const onCheckbox = () => {
    console.log("Checkbox");
  };

  const onRemove = () => {
    console.log("Remove");
  };

  const onAdd = () => {
    console.log("Add");
  };

  const onCancel = () => {
    setDialogOpen(false);
    console.log("Cancel");
  };

  const onConfirm = () => {
    setDialogOpen(false);
    console.log("Confirm");
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Page>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper>
            <ItemListWithControls
              items={data}
              onCheckbox={onCheckbox}
              onRemove={onRemove}
              onAdd={onAdd}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button component={Link} to="/" variant="outlined" fullWidth>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setDialogOpen(true)}
          >
            Checkin
          </Button>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={dialogOpen}
        title={"Do you want to check in these items?"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <ItemList
          items={data?.filter((item) => {
            return item.checked;
          })}
        />
      </ConfirmDialog>
    </Page>
  );
};

export { Checkin };
