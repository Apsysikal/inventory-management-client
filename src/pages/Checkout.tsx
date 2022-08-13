import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Paper, Grid, Button } from "@mui/material";

import { ItemList } from "../components/organisms/ItemList";
import { ItemListWithControls } from "../components/organisms/ItemListWithControls";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { Page } from "../components/templates/Page";
import { Loading } from "../components/molecules/Loading";

import Header from "../components/Header/Header";

import { useItems } from "../hooks/useItems";
import { initializeCheckoutItems } from "../utils/initializeItems";
import { getCheckedItems, updateItems } from "../utils/items";
import { useAccount } from "../hooks/useAccount";
import {
  useItemSelection,
  ItemSelectionActionType,
} from "../hooks/useItemSelection";

const Checkout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, data, error } = useItems({ limit: 1000, query: "count:>0" });
  const [items, dispatchItems] = useItemSelection([]);
  const account = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    dispatchItems({
      type: ItemSelectionActionType.INITIALIZE,
      payload: initializeCheckoutItems(data ? data : []),
    });
  }, [data, dispatchItems]);

  const onCancel = () => {
    setDialogOpen(false);
  };

  const onConfirm = async () => {
    if (!account) return;
    await updateItems(getCheckedItems(items), true);

    navigate("/");
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header titleText="Checkout" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {loading ? (
              <Loading />
            ) : (
              <Paper sx={{ maxHeight: "80vh", overflow: "auto" }}>
                <ItemListWithControls items={items} dispatch={dispatchItems} />
              </Paper>
            )}
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
              disabled={!account || getCheckedItems(items)?.length === 0}
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
