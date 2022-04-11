import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { Breakpoint } from "@mui/material";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";

interface HeaderProps {
  sx?: object;
  maxWidth: Breakpoint;
  titleText: string;
}

export default function Header(props: HeaderProps) {
  const {instance} = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = async () => {
    const result = await instance.loginPopup();
    console.log(result);
  }

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
            {isAuthenticated ? "Logged in" : "Nope"}
            <Button
              color="inherit"
              onClick={handleLogin}
            >
              Login
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
