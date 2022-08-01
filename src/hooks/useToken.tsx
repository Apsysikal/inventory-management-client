/**
 * This is copied and modified from https://blog.galmalachi.com/react-and-jwt-authentication-the-right-way
 */

import { useEffect, useRef, useCallback } from "react";
import axios from "axios";

import { useTokenExpiration } from "./useTokenExpiration";

export interface TokenResponse {
  expirationDate: Date;
  token: string;
}

function useToken(onTokenInvalid: Function, onTokenRefreshRequired: Function) {
  const accessToken = useRef<string>();
  const { setTokenExpiration, clearAutomaticRefresh } = useTokenExpiration(
    onTokenRefreshRequired
  );

  const setToken = useCallback(
    ({ expirationDate, token }: TokenResponse) => {
      accessToken.current = token;
      setTokenExpiration(new Date(expirationDate));
    },
    [setTokenExpiration]
  );

  const isAuthenticated = useCallback(() => {
    return accessToken.current ? true : false;
  }, []);

  const clearToken = useCallback(() => {
    accessToken.current = undefined;
    clearAutomaticRefresh();
  }, [clearAutomaticRefresh]);

  return {
    setToken,
    isAuthenticated,
    clearToken,
  };
}

export { useToken };
