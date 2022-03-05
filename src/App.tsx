// @ts-nocheck

import * as React from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Paper from "@mui/material/Paper";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import IconButton from "@mui/material/IconButton";

import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";

import LogInIcon from "@mui/icons-material/LoginOutlined";
import LogOutIcon from "@mui/icons-material/LogoutOutlined";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@mui/material/TextField";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CssBaseline from "@mui/material/CssBaseline";

import MenuIcon from "@mui/icons-material/MenuOutlined";

import { get, create, modify } from "./db";

function createData(serial, description, count) {
  return { serial, description, count };
}

const rows = [];

// const rows = [
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "DOR8 Basis", 1),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "DOR8 Modul", 7),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "DI8 Basis", 2),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "DI8 Modul", 1),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "DI16 Modul", 5),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "AO4 Modul", 1),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "AO4 Basis", 0),
//   createData(
//     String(Math.floor(Math.random() * 10000000) + 1),
//     "S10 Controller",
//     0
//   ),
//   createData(
//     String(Math.floor(Math.random() * 10000000) + 1),
//     "SN3t Netzwerkmodul",
//     0
//   ),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "S Basis", 2),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "RO6MOS", 4),
//   createData(String(Math.floor(Math.random() * 10000000) + 1), "RO6MS", 3)
// ];

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#70BD95",
      dark: "#408c67",
      light: "#a1f0c6",
      contrastText: "#000",
    },
    secondary: {
      main: "#002439",
      dark: "#002439",
      light: "#000014",
      contrastText: "#fff",
    },
  },
});

function ButtonAppBar() {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Container maxWidth="md">
        <Toolbar style={{ maxWidth: "md" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inventar
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function CheckoutDialogListElement(props) {
  const parentCallback = props.callback;

  const [item, setItem] = React.useState({
    checked: false,
    serial: props.item.serial,
    description: props.item.description,
    count: 0,
    maxCount: props.item.count,
  });

  const handleAddClick = () => {
    let updatedItem = item;

    if (updatedItem.count === updatedItem.maxCount) {
      return;
    }

    updatedItem.checked = true;
    updatedItem.count = updatedItem.count + 1;

    parentCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleRemoveClick = () => {
    let updatedItem = item;

    if (updatedItem.count === 0) {
      return;
    } else if (updatedItem.count === 1) {
      updatedItem.checked = false;
      updatedItem.count = updatedItem.count - 1;
    } else {
      updatedItem.count = updatedItem.count - 1;
    }

    parentCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleCheckboxClick = () => {
    let updatedItem = item;

    if (updatedItem.count === 0) {
      updatedItem.checked = true;
      updatedItem.count = updatedItem.count + 1;
    } else {
      updatedItem.checked = false;
      updatedItem.count = 0;
    }

    parentCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  return (
    <ListItem key={item.serial}>
      <ListItemIcon>
        <Checkbox onClick={handleCheckboxClick} checked={item.checked} />
      </ListItemIcon>
      <ListItemText
        primary={item.description}
        secondary={item.serial}
        style={{ marginRight: "1rem" }}
      />
      <IconButton
        onClick={handleRemoveClick}
        disabled={item.count === 0 ? true : false}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{item.count}</Typography>
      <IconButton
        onClick={handleAddClick}
        disabled={item.count === item.maxCount ? true : false}
      >
        <AddIcon />
      </IconButton>
    </ListItem>
  );
}

function CheckOutDialog(props) {
  const items = props.listItems;
  const checkOutItems = [];
  const parentCallback = props.callback;

  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemChange = (changedItem) => {
    const index = checkOutItems.findIndex((item) => {
      return item.serial === changedItem.serial;
    });

    if (index === -1) {
      checkOutItems.push(changedItem);
    } else {
      checkOutItems[index] = changedItem;
    }
  };

  const handleAccept = () => {
    parentCallback(checkOutItems);
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const searchPredicate = (element) => {
    const description = element.description.toLowerCase();
    const serial = element.serial.toLowerCase();

    const search = searchText.toLowerCase();

    return (
      (description.includes(search) || serial.includes(search)) &&
      element.count > 0
    );
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        fullWidth
        startIcon={<LogOutIcon />}
      >
        Material Auslagern
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Material Auslagern</DialogTitle>
        <DialogContent>
          <List>
            <ListSubheader>
              <TextField
                onChange={handleSearchChange}
                variant="standard"
                fullWidth
                label="Suchbegriff"
                value={searchText}
              ></TextField>
            </ListSubheader>
            {items.filter(searchPredicate).map((item) => (
              <CheckoutDialogListElement
                key={item.serial}
                item={item}
                callback={handleItemChange}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button onClick={handleAccept}>Auslagern</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function CheckinDialogListElement(props) {
  const parentCallback = props.callback;

  const [item, setItem] = React.useState({
    _id: props.item._id,
    checked: false,
    serial: props.item.serial,
    description: props.item.description,
    count: 0,
  });

  const handleAddClick = () => {
    let updatedItem = item;

    updatedItem.checked = true;
    updatedItem.count = updatedItem.count + 1;

    parentCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleRemoveClick = () => {
    let updatedItem = item;

    if (item.count === 0) {
      return;
    } else if (item.count === 1) {
      updatedItem.checked = false;
      updatedItem.count = item.count - 1;
    } else {
      updatedItem.count = item.count - 1;
    }

    parentCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  const handleCheckboxClick = () => {
    let updatedItem = item;

    if (item.count === 0) {
      updatedItem.checked = true;
      updatedItem.count = updatedItem.count + 1;
    } else {
      updatedItem.checked = false;
      updatedItem.count = 0;
    }

    parentCallback(updatedItem);
    setItem((item) => ({
      ...item,
      ...updatedItem,
    }));
  };

  return (
    <ListItem key={item.serial}>
      <ListItemIcon>
        <Checkbox onClick={handleCheckboxClick} checked={item.checked} />
      </ListItemIcon>
      <ListItemText
        primary={item.description}
        secondary={item.serial}
        style={{ marginRight: "1rem" }}
      />
      <IconButton
        onClick={handleRemoveClick}
        disabled={item.count === 0 ? true : false}
      >
        <RemoveIcon />
      </IconButton>
      <Typography>{item.count}</Typography>
      <IconButton onClick={handleAddClick}>
        <AddIcon />
      </IconButton>
    </ListItem>
  );
}

function CheckinDialog(props) {
  const items = props.listItems;
  const checkInItems = [];
  const parentCallback = props.callback;

  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    parentCallback(checkInItems);
    setOpen(false);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleItemChange = (changedItem) => {
    const index = checkInItems.findIndex((item) => {
      return item.serial === changedItem.serial;
    });

    if (index === -1) {
      checkInItems.push(changedItem);
    } else {
      checkInItems[index] = changedItem;
    }
  };

  const searchPredicate = (element) => {
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
            <ListSubheader>
              <TextField
                onChange={handleSearchChange}
                variant="standard"
                fullWidth
                label="Suchbegriff"
                value={searchText}
              ></TextField>
            </ListSubheader>
            {items.filter(searchPredicate).map((item) => (
              <CheckinDialogListElement
                key={item.serial}
                item={item}
                callback={handleItemChange}
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

function EnhancedTable(props) {
  const items = props.listItems;
  const searchText = props.searchText;

  const searchPredicate = (element) => {
    const description = element.description.toLowerCase();
    const serial = element.serial.toLowerCase();

    const search = searchText.toLowerCase();

    return description.includes(search) || serial.includes(search);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2, maxHeight: "60vh" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Bezeichnung</TableCell>
            <TableCell align="right">Seriennummer</TableCell>
            <TableCell align="right">Anzahl (St)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.filter(searchPredicate).map((item) => (
            <TableRow key={item.serial}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right">{item.serial}</TableCell>
              <TableCell align="right">{item.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function App() {
  const [listItems, setListItems] = React.useState(rows);
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    get("/items")
      .then((response) => {
        setListItems([...response.data]);
      })
      .catch(console.debug);
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCheckInDialog = (items) => {
    const updatedListItems = listItems;

    items.forEach((item) => {
      const index = updatedListItems.findIndex((listItem) => {
        return listItem.serial === item.serial;
      });

      updatedListItems[index].count += item.count;

      modify("/items", updatedListItems[index])
        .then(console.debug)
        .catch(console.debug);
    });

    setListItems([...updatedListItems]);
  };

  const handleCheckOutDialog = (items) => {
    const updatedListItems = listItems;

    items.forEach((item) => {
      const index = updatedListItems.findIndex((listItem) => {
        return listItem.serial === item.serial;
      });

      updatedListItems[index].count -= item.count;

      modify("/items", updatedListItems[index])
        .then(console.debug)
        .catch(console.debug);
    });

    setListItems([...updatedListItems]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ButtonAppBar />
      <Container maxWidth="md">
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
              <CheckinDialog
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
          <EnhancedTable listItems={listItems} searchText={searchText} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
