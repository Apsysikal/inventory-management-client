import {
  PublicClientApplication,
  Configuration,
  PopupRequest,
} from "@azure/msal-browser";

const msalConfiguration: Configuration = {
  auth: {
    clientId: String(process.env.REACT_APP_MSAL_CLIENT_ID),
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read"],
};

const pca = new PublicClientApplication(msalConfiguration);

export default pca;
