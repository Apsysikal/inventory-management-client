import { Link } from "react-router-dom";

import { Grid, Button } from "@mui/material";

import { Page } from "../components/templates/Page";
import { MetaDisplay } from "../components/organisms/MetaDisplay";

import Header from "../components/Header/Header";

const Home = () => {
  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MetaDisplay />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component={Link} to="checkin" fullWidth>
              Checkin
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component={Link}
              to="checkout"
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

export { Home };
