import { PublicClientApplication, Configuration } from "@azure/msal-browser";

const msalConfiguration: Configuration = {
  auth: {
    clientId: String(process.env.REACT_APP_MSAL_CLIENT_ID),
  },
};

const pca = new PublicClientApplication(msalConfiguration);

export default pca;
