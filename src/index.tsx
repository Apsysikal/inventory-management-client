import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { theme } from "./config/theme";
import { AuthenticationProvider } from "./contexts/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <AuthenticationProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthenticationProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
