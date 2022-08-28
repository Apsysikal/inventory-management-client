import { Link, useParams } from "react-router-dom";

import { Grid, Button, Paper } from "@mui/material";

import { Page } from "../components/templates/Page";
import { Loading } from "../components/molecules/Loading";
import { ItemList } from "../components/organisms/ItemList";

import { useItems } from "../hooks/useItems";
import { useAccount } from "../hooks/useAccount";

import Header from "../components/organisms/Header";

const List = () => {
  const account = useAccount();
  const { listId } = useParams();
  const { loading, data } = useItems(
    { list: listId || "", limit: 1000 },
    {
      headers: {
        Authorization: `Bearer ${account?.tokens.accessToken}`,
      },
    }
  );

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
            <Button
              variant="contained"
              component={Link}
              to="checkin"
              fullWidth
              disabled={!account}
            >
              Checkin
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              component={Link}
              to="checkout"
              fullWidth
              disabled={!account}
            >
              Checkout
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component={Link}
              to="create"
              fullWidth
              disabled={!account}
            >
              Create Item
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

export { List };
