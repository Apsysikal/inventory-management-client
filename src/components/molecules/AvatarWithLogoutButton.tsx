import React from "react";
import { Avatar, Typography } from "@mui/material";
// import { Button } from "@mui/material";

const AvatarWithLogoutButton: React.FC<{
  name?: string;
  onLogout: Function;
}> = ({ name, onLogout }) => {
  return (
    <>
      <Typography>{name}</Typography>
      {/* <Button color="inherit" onClick={() => onLogout()}>
        Logout
      </Button> */}
      <Avatar
        sx={{
          backgroundColor: "secondary.main",
          ml: 1,
          width: "1.5em",
          height: "1.5em",
        }}
      />
    </>
  );
};

export { AvatarWithLogoutButton };
