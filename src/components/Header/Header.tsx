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

import UserInformation from "../UserInformation/UserInformation";

interface HeaderProps {
  sx?: object;
  maxWidth: Breakpoint;
  titleText: string;
}

export default function Header(props: HeaderProps) {
  const { instance, accounts } = useMsal();

  const handleLogin = async () => {
    const result = await instance.loginPopup();
    console.log(result);
  };

  return (
    <>
      <AppBar position="static" sx={props.sx}>
        <Container maxWidth={props.maxWidth}>
          <Toolbar style={{ maxWidth: props.maxWidth }}>
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
              {props.titleText}
            </Typography>
            <AuthenticatedTemplate>
              <UserInformation accountInfo={accounts[0]} />
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
