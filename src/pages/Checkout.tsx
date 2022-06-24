import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Paper, Grid, Button } from "@mui/material";

import { ItemList } from "../components/organisms/ItemList";
import { ItemListWithControls } from "../components/organisms/ItemListWithControls";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { Page } from "../components/templates/Page";
import { Loading } from "../components/templates/Loading";

import Header from "../components/Header/Header";

import { useItems } from "../hooks/api";
import { getItems, updateItem } from "../service/item";
import { initializeCheckoutItems } from "../utils/initializeItems";
import { getItemIndex, getCheckedItems } from "../utils/items";
import {
  handleItemCheckboxClick,
  handleItemRemoveClick,
  handleItemAddClick,
} from "../utils/handleItemClick";

import InventoryItem from "../types/InventoryItem";

const Checkout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, data, error } = useItems({ limit: 1000, query: "count:>0" });
  const [items, setItems] = useState<InventoryItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const initializedItems = initializeCheckoutItems(data ? data : []);

    setItems([...initializedItems]);
  }, [data]);

  const onCheckbox = (item: InventoryItem) => {
    const modifiedItems = [...items];
    const modifiedItem = handleItemCheckboxClick(item);
    const index = getItemIndex(modifiedItems, modifiedItem);

    modifiedItems[index] = modifiedItem;
    setItems([...modifiedItems]);
  };

  const onRemove = (item: InventoryItem) => {
    const modifiedItems = [...items];
    const modifiedItem = handleItemRemoveClick(item);
    const index = getItemIndex(modifiedItems, modifiedItem);

    modifiedItems[index] = modifiedItem;
    setItems([...modifiedItems]);
  };

  const onAdd = (item: InventoryItem) => {
    const modifiedItems = [...items];
    const modifiedItem = handleItemAddClick(item);
    const index = getItemIndex(modifiedItems, modifiedItem);

    modifiedItems[index] = modifiedItem;
    setItems([...modifiedItems]);
  };

  const onCancel = () => {
    setDialogOpen(false);
  };

  const onConfirm = async () => {
    const selectedItems = getCheckedItems(items);

    await Promise.all(
      selectedItems.map(async (item) => {
        const { _id: id, serial, description, count } = item;

        getItems({ query: `serial:${serial}` }).then(({ data }) => {
          if (data.length <= 0) throw new Error("Item does not exist in db");

          const modifiedCount = data[0].count - count;
          return updateItem(id, { serial, description, count: modifiedCount });
        });
      })
    );

    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header titleText="Checkout" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper sx={{ maxHeight: "80vh", overflow: "auto" }}>
              <ItemListWithControls
                items={items}
                onCheckbox={onCheckbox}
                onRemove={onRemove}
                onAdd={onAdd}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component={Link}
              to={-1 as any}
              variant="outlined"
              fullWidth
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              fullWidth
              disabled={getCheckedItems(items)?.length === 0}
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
    </>
  );
};

export { Checkout };
