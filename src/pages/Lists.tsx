import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";

import { Page } from "../components/templates/Page";
import { InventoryCard } from "../components/molecules/InventoryCard";

import Header from "../components/organisms/Header";
import { useAccount } from "../hooks/useAccount";
import { getLists } from "../service/list";
import { InventoryList } from "../types/InventoryList";

const Lists = () => {
  const account = useAccount();
  const navigate = useNavigate();
  const [lists, setLists] = useState<InventoryList[]>([]);

  useEffect(() => {
    if (!account) return;
    const { tokens } = account;

    getLists({
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }).then(({ data }) => {
      setLists(data);
    });
  }, [account]);

  const handleItemClick = (id: string) => {
    return navigate(`/list/${id}`);
  };

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <Grid container spacing={1}>
          {account && (
            <>
              {lists.map((list) => {
                return (
                  <Grid item xs={12}>
                    <InventoryCard
                      inventory={{
                        id: list._id,
                        title: list.title,
                        description: list.description,
                      }}
                      onClick={handleItemClick}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="create-list"
                >
                  Create List
                </Button>
              </Grid>
            </>
          )}
          {!account && (
            <>
              <Grid item xs={12}>
                <Typography textAlign="center" style={{ margin: "1em" }}>
                  Sign in to see available lists.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="/signin"
                >
                  Sign In.
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Page>
    </>
  );
};

export { Lists };
