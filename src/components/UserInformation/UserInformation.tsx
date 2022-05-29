import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

import { AccountInfo } from "@azure/msal-browser";

export type UserInformationProps = {
  accountInfo: AccountInfo | null;
};

const UserInformation = ({ accountInfo }: UserInformationProps) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorElement);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElement(null);
  };

  if (!accountInfo) return <></>;

  const { username, name } = accountInfo;

  const getInitials = (name: string | undefined, username: string) => {
    let names: string[];

    if (name) {
      names = name.split(" ");
    } else {
      names = username.split(" ");
    }

    if (names.length > 1) {
      return `${names[0][0]}${names[1][0]}`;
    } else {
      return `${names[0][0]}`;
    }
  };

  return (
    <>
      <Typography>{name}</Typography>
      <IconButton onClick={handleClick}>
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          {getInitials(name, username)}
        </Avatar>
      </IconButton>
      <Menu open={open} anchorEl={anchorElement} onClose={handleClose}>
        <MenuItem>
          <Avatar sx={{ mr: "1rem" }} /> {username}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserInformation;
