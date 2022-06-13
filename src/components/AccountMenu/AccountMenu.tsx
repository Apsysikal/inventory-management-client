import React, { useState } from "react";

import { AccountInfo } from "@azure/msal-browser";
import { useMsal, useAccount } from "@azure/msal-react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { loginRequest } from "../../config/msal";

const AccountMenu = () => {
  const { instance, accounts } = useMsal();
  const account = useAccount();

  const [activeAccount, setActiveAccount] = useState(account);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!activeAccount) {
    instance.setActiveAccount(accounts[0]);
    return null;
  }

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event: string, payload: undefined | AccountInfo) => {
    switch (event) {
      case "select-account":
        selectAccount(payload);
        break;

      case "add-account":
        addAccount();
        break;

      case "logout":
        logout();
        break;

      default:
        break;
    }

    setAnchorEl(null);
  };

  const selectAccount = (account: undefined | AccountInfo) => {
    if (account) {
      instance.setActiveAccount(account);
      setActiveAccount(account);
    }
  };

  const addAccount = async () => {
    const result = await instance.loginPopup({
      ...loginRequest,
      prompt: "select_account",
    });
    const { account } = result;

    if (account) {
      instance.setActiveAccount(account);
      setActiveAccount(account);
    }
  };

  const logout = async () => {
    await instance.logoutPopup();
  };

  return (
    <>
      <IconButton size="large" onClick={handleMenu} color="inherit">
        {activeAccount.name ? <Typography>{`Welcome, ${activeAccount.name}`}</Typography>: null}
        <Avatar color="inherit">
          {getInitials(activeAccount.name, activeAccount.username)}
        </Avatar>
      </IconButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={(e) => {
          setAnchorEl(null);
        }}
      >
        <ActiveAccount account={activeAccount} />
        <Divider />
        <Accounts
          accounts={accounts}
          activeAccount={activeAccount}
          handleClick={handleClick}
        />
        <AddAccount handleClick={handleClick} />
        <Logout handleClick={handleClick} />
      </Menu>
    </>
  );
};

const ActiveAccount: React.FC<{ account: AccountInfo }> = ({ account }) => {
  const { name, username } = account;

  return (
    <>
      <MenuItem>
        <AccountCircle
          color="primary"
          fontSize="small"
          style={{ marginRight: "1rem" }}
        />
        <Typography>{concatenateAccountInfoText(name, username)}</Typography>
      </MenuItem>
    </>
  );
};

const Accounts: React.FC<{
  accounts: AccountInfo[];
  activeAccount: AccountInfo;
  handleClick: Function;
}> = ({ accounts, activeAccount, handleClick }) => {
  if (accounts.length <= 1) {
    return null;
  }

  const { username } = activeAccount;
  const selectableAccounts = accounts.filter((account) => {
    return !isActiveAccount(account, username);
  });

  return (
    <>
      {selectableAccounts.map((account) => {
        return <Account account={account} handleClick={handleClick} />;
      })}
      <Divider />
    </>
  );
};

const Account: React.FC<{ account: AccountInfo; handleClick: Function }> = ({
  account,
  handleClick,
}) => {
  const { name, username } = account;

  return (
    <>
      <MenuItem onClick={() => handleClick("select-account", account)}>
        <AccountCircle fontSize="small" style={{ marginRight: "1rem" }} />
        <Typography>{concatenateAccountInfoText(name, username)}</Typography>
      </MenuItem>
    </>
  );
};

const AddAccount: React.FC<{ handleClick: Function }> = ({ handleClick }) => {
  return (
    <>
      <MenuItem onClick={() => handleClick("add-account")}>
        <PersonAdd fontSize="small" style={{ marginRight: "1rem" }} />
        <Typography>Add another account</Typography>
      </MenuItem>
    </>
  );
};

const Logout: React.FC<{ handleClick: Function }> = ({ handleClick }) => {
  return (
    <>
      <MenuItem onClick={() => handleClick("logout")}>
        <LogoutIcon fontSize="small" style={{ marginRight: "1rem" }} />
        <Typography>Logout</Typography>
      </MenuItem>
    </>
  );
};

const concatenateAccountInfoText = (
  name: string | undefined,
  username: string
) => {
  if (name) {
    return `${name} (${username})`;
  } else {
    return username;
  }
};

const getInitials = (name: string | undefined, username: string) => {
  if (!name) {
    return `${username[0]}${username[1]}`;
  }

  const names = name.split(" ");

  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`;
  } else {
    return `${names[0][0]}`;
  }
};

const isActiveAccount = (
  account: AccountInfo,
  activeAccountUsername: string
) => {
  return account.username === activeAccountUsername;
};

export default AccountMenu;
