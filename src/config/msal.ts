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
  scopes: ["api://02a7dd50-9321-4d59-87c3-5b81e339057d/Items.Access"],
};

const pca = new PublicClientApplication(msalConfiguration);

export default pca;
