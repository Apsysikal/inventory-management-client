import { AxiosRequestConfig } from "axios";
import React, { createContext } from "react";

import { AuthenticationClient } from "../lib/AuthClient";

export interface IAuthenticationContext {
  instance: AuthenticationClient;
}

const defaultValue = new AuthenticationClient();
const AuthenticationContext = createContext<IAuthenticationContext>({
  instance: defaultValue,
});

const AuthenticationProvider: React.FC<{
  options?: AxiosRequestConfig;
  children?: React.ReactNode;
}> = ({ options, children }) => {
  return (
    <AuthenticationContext.Provider
      value={{
        instance: new AuthenticationClient(options),
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider };
export default AuthenticationContext;
