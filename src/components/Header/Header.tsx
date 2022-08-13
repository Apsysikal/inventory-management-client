import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { Breakpoint } from "@mui/material";
import { Link } from "react-router-dom";

import { AvatarWithLogoutButton } from "../molecules/AvatarWithLogoutButton";
import { useAccount } from "../../hooks/useAccount";

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
  const account = useAccount();

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
            {account ? (
              <AvatarWithLogoutButton name={account.name} onLogout={() => {}} />
            ) : (
              <Button color="inherit" component={Link} to="/signin">
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
