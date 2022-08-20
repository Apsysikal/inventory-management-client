import { createTheme, ThemeOptions } from "@mui/material";

const companyTheme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#70BD95",
      dark: "#408c67",
      light: "#a1f0c6",
      contrastText: "#000",
    },
    secondary: {
      main: "#002439",
      dark: "#002439",
      light: "#000014",
      contrastText: "#fff",
    },
  },
};

const theme = createTheme(companyTheme);

export { theme };
