import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Paper, Grid, Button } from "@mui/material";

import { ItemList } from "../components/organisms/ItemList";
import { ItemListWithControls } from "../components/organisms/ItemListWithControls";
import { ConfirmDialog } from "../components/molecules/ConfirmDialog";
import { Page } from "../components/templates/Page";
import { Loading } from "../components/molecules/Loading";

import Header from "../components/Header/Header";

import { useItems } from "../hooks/useItems";
import { getItems, updateItem } from "../service/item";
import { initializeCheckinItems } from "../utils/initializeItems";
import { getItemIndex, getCheckedItems } from "../utils/items";
import {
  handleItemCheckboxClick,
  handleItemRemoveClick,
  handleItemAddClick,
} from "../utils/handleItemClick";
import { useAccount } from "../hooks/useAccount";

import InventoryItem from "../types/InventoryItem";

const Checkin = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, data, error } = useItems({ limit: 1000 });
  const [items, setItems] = useState<InventoryItem[]>([]);
  const account = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    const initializedItems = initializeCheckinItems(data ? data : []);

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
    if (!account) return; // Return when no user is signed in
    const selectedItems = getCheckedItems(items);

    await Promise.all(
      selectedItems.map(async (item) => {
        const { _id: id, serial, description, count } = item;

        getItems({ query: `serial:${serial}` }).then(({ data }) => {
          if (data.length <= 0) throw new Error("Item does not exist in db");

          const modifiedCount = data[0].count + count;
          return updateItem(
            id,
            { serial, description, count: modifiedCount },
            {
              headers: {
                Authorization: `Bearer ${account.tokens.accessToken}`,
              },
            }
          );
        });
      })
    );

    navigate("/");
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header titleText="Checkin" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {loading ? (
              <Loading />
            ) : (
              <Paper sx={{ maxHeight: "80vh", overflow: "auto" }}>
                <ItemListWithControls
                  items={items}
                  onCheckbox={onCheckbox}
                  onRemove={onRemove}
                  onAdd={onAdd}
                />
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
            items={items?.filter((item) => {
              return item.checked;
            })}
          />
        </ConfirmDialog>
      </Page>
    </>
  );
};

export { Checkin };
