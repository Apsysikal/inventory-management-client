import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Paper, Grid, Button } from "@mui/material";

import { ItemList } from "../components/organisms/ItemList";
import { ItemListWithControls } from "../components/organisms/ItemListWithControls";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { Page } from "../components/templates/Page";

import { useGet } from "../hooks/api";

import InventoryItem from "../types/InventoryItem";

const url = "https://krat.es";
const id = "36829d701ab35548816a";

const Checkout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, data, error } = useGet(`${url}/${id}/items`);
  const [items, setItems] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    const initializedItems = data.map((item) => {
      return {
        ...item,
        checked: false,
        count: 0,
      };
    });
    setItems([...initializedItems]);
  }, [data]);

  const onCheckbox = (item: InventoryItem) => {
    const modifiedItems = [...items];
    const modifiedItem = { ...item };
    const index = modifiedItems.findIndex((item) => {
      return item._id === modifiedItem._id;
    });
    console.log(index);

    if (modifiedItem.checked) {
      modifiedItem.checked = false;
      modifiedItem.count = 0;
    } else {
      modifiedItem.checked = true;
      modifiedItem.count = 1;
    }

    modifiedItems[index] = modifiedItem;
    console.log(modifiedItems);
    setItems([...modifiedItems]);
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
              items={items}
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
            Checkout
          </Button>
        </Grid>
      </Grid>
      <ConfirmDialog
        open={dialogOpen}
        title={"Do you want to check out these items?"}
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        <ItemList
          items={items?.filter((item) => {
            return item.checked;
          })}
        />
      </ConfirmDialog>
    </Page>
  );
};

export { Checkout };
