import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  SilentRequest,
} from "@azure/msal-browser";

import { loginRequest } from "../config/msal";

function useToken() {
  const { instance } = useMsal();
  const account = useAccount();
  const [token, setToken] = useState("");

  useEffect(() => {
    if (!account) {
      return;
    }

    const request: SilentRequest = {
      ...loginRequest,
      account,
    };

    const fetchToken = async () => {
      try {
        const { accessToken } = await instance.acquireTokenSilent(request);
        setToken(accessToken);
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          // Try again with popup
          const { accessToken } = await instance.acquireTokenPopup(request);
          setToken(accessToken);
        }
      }
    };

    fetchToken();
  }, [instance, account]);

  const refetch = async () => {
    if (!account) {
      return;
    }

    const request: SilentRequest = {
      ...loginRequest,
      account,
    };

    try {
      const { accessToken } = await instance.acquireTokenSilent(request);
      setToken(accessToken);
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // Try again with popup
        const { accessToken } = await instance.acquireTokenPopup(request);
        setToken(accessToken);
      }
    }
  };

  return [token, refetch];
}

export { useToken };
