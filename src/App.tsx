import * as React from "react";

import { ThemeProvider } from "@mui/material";

import { Breakpoint } from "@mui/material";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";

import CssBaseline from "@mui/material/CssBaseline";

import theme from "./components/Theme";
import Header from "./components/Header/Header";
import CheckOutDialog from "./components/CheckOutDialog";
import CheckInDialog from "./components/CheckInDialog/CheckInDialog";
import ItemTable from "./components/ItemTable";

import { get, modify } from "./db";
import InventoryItem from "./types/InventoryItem";

const rows: Array<InventoryItem> = [];

export default function App() {
  const [listItems, setListItems] = React.useState(rows);
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    get("/item")
      .then((response) => {
        // @ts-nocheck
        setListItems([...response.data]);
      })
      .catch(console.debug);
  }, []);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setSearchText(event.target.value);
  };

  const handleCheckInDialog = (items: Array<InventoryItem>) => {
    const updatedListItems = listItems;

    items.forEach((item: InventoryItem) => {
      const index = updatedListItems.findIndex((listItem) => {
        return listItem.serial === item.serial;
      });

      updatedListItems[index].count += item.count;

      modify("/item", updatedListItems[index])
        .then(console.debug)
        .catch(console.debug);
    });

    setListItems([...updatedListItems]);
  };

  const handleCheckOutDialog = (items: Array<InventoryItem>) => {
    const updatedListItems = listItems;

    items.forEach((item: InventoryItem) => {
      const index = updatedListItems.findIndex((listItem) => {
        return listItem.serial === item.serial;
      });

      updatedListItems[index].count -= item.count;

      modify("/item", updatedListItems[index])
        .then(console.debug)
        .catch(console.debug);
    });

    setListItems([...updatedListItems]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        sx={{ mb: 2 }}
        maxWidth={"md" as Breakpoint}
        titleText="Inventar"
      />
      <Container maxWidth="md">
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <CheckInDialog
                listItems={listItems}
                callback={handleCheckInDialog}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CheckOutDialog
                listItems={listItems}
                callback={handleCheckOutDialog}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="standard"
                fullWidth
                label="Suchbegriff"
                onChange={handleSearchChange}
                value={searchText}
              ></TextField>
            </Grid>
          </Grid>
          <ItemTable listItems={listItems} searchText={searchText} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
