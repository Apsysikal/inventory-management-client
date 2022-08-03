import React from "react";
import { Avatar } from "@mui/material";
// import { Button } from "@mui/material";

const AvatarWithLogoutButton: React.FC<{ onLogout: Function }> = ({
  onLogout,
}) => {
  return (
    <>
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
