import * as React from "react";
import { ThemeProvider } from "@mui/material";
import { Breakpoint } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./components/Theme/Theme";
import Header from "./components/Header/Header";
import pca from "./config/msal";
import {MsalProvider} from "@azure/msal-react"
import Home from "./pages/Home";

export default function App() {
  return (
    <MsalProvider instance={pca}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          sx={{ mb: 2 }}
          maxWidth={"md" as Breakpoint}
          titleText="Inventar"
        />
      <Home />
      </ThemeProvider>
    </MsalProvider>
  );
}
