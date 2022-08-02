import { useEffect, useCallback, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { decodeJwt } from "jose";

import { IAccount } from "../lib/AuthClient";
import AuthenticationContext from "../contexts/AuthContext";

const EMPTY_HASH = "#";

function decodeTokensToAccount(accessToken: string, refreshToken: string) {
  const { id, displayName: name, scopes } = decodeJwt(accessToken);
  const account: IAccount = {
    id: id as string,
    name: name as string,
    scopes: scopes as string[],
    tokens: {
      accessToken,
      refreshToken,
    },
  };

  return account;
}

const useAuthentication = () => {
  const { instance } = useContext(AuthenticationContext);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  const parseTokensFromHash = useCallback(
    (hash: string) => {
      if (!hash || hash === EMPTY_HASH) return;

      const [accessToken, refreshToken] = hash.slice(4).split("&rt=");
      if (!accessToken || !refreshToken) return;

      const account = decodeTokensToAccount(accessToken, refreshToken);
      instance.addAccount(account);

      // Navigate to the index page and clear the hash from the url
      navigate("/", { replace: true });
    },
    [instance, navigate]
  );

  useEffect(() => {
    if (pathname !== "/") return;

    parseTokensFromHash(hash);
  }, [pathname, hash, parseTokensFromHash]);

  return { instance };
};

export { useAuthentication };
