import { Grid, Button } from "@mui/material";
import { Google, Login } from "@mui/icons-material";

import { Page } from "../components/templates/Page";
import Header from "../components/organisms/Header";
import { useAuthentication } from "../hooks/useAuth";

const SignIn = () => {
  const { instance } = useAuthentication();

  const handleLogin = (provider: string) => {
    return instance.login(provider);
  };

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Google />}
              onClick={() => handleLogin("google")}
            >
              Google
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Login />}
              onClick={() => handleLogin("azure")}
            >
              Microsoft
            </Button>
          </Grid>
        </Grid>
      </Page>
    </>
  );
};

export { SignIn };
