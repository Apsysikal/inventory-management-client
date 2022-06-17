import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";

import { RecoilRoot } from "recoil";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import instance from "./config/msal";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <StrictMode>
    <RecoilRoot>
      <MsalProvider instance={instance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MsalProvider>
    </RecoilRoot>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
