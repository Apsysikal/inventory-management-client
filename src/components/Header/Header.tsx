import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { Breakpoint } from "@mui/material";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import AccountMenu from "../AccountMenu/AccountMenu";
import { loginRequest } from "../../config/msal";

interface HeaderProps {
  sx?: object;
  maxWidth?: Breakpoint;
  titleText: string;
}

export default function Header({
  sx = { mb: 2 },
  maxWidth = "md" as Breakpoint,
  titleText,
}: HeaderProps) {
  const { instance } = useMsal();

  const handleLogin = async () => {
    const result = await instance.loginPopup(loginRequest);

    const { account } = result;

    if (account) {
      instance.setActiveAccount(account);
    }
  };

  return (
    <>
      <AppBar position="static" sx={sx}>
        <Container maxWidth={maxWidth}>
          <Toolbar style={{ maxWidth: maxWidth }}>
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
              {titleText}
            </Typography>
            <AuthenticatedTemplate>
              <AccountMenu />
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            </UnauthenticatedTemplate>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
