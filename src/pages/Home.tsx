import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

import { Page } from "../components/templates/Page";

import Header from "../components/organisms/Header";
import { useAccount } from "../hooks/useAccount";

const Home = () => {
  const account = useAccount();

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography>
              Welcome to the Inventory Management System. <br />
              Manage your Items by navigating to the Items page via the button
              below. <br />
              If the item you want to manage does not exist, you can add it via
              the create Item dialog.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component={Link} to="items" fullWidth>
              Items
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component={Link}
              to="items/Create"
              fullWidth
              disabled={!account}
            >
              Create Item
            </Button>
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

export { Home };
