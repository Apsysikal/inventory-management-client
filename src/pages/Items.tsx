import { Link } from "react-router-dom";

import { Grid, Button, Paper } from "@mui/material";

import { Page } from "../components/templates/Page";
import { Loading } from "../components/molecules/Loading";
import { ItemList } from "../components/organisms/ItemList";

import { useItems } from "../hooks/api";

import Header from "../components/Header/Header";

const Items = () => {
  const { loading, data } = useItems({ limit: 1000 });

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {loading ? (
              <Loading />
            ) : (
              <Paper sx={{ maxHeight: "75vh", overflow: "auto" }}>
                <ItemList items={data || []} />
              </Paper>
            )}
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component={Link} to="checkin" fullWidth>
              Checkin
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              component={Link}
              to="checkout"
              fullWidth
            >
              Checkout
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              component={Link}
              to={-1 as any}
              fullWidth
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

export { Items };
