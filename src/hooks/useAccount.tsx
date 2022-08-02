import { useState, useCallback, useEffect } from "react";
import { IAccount } from "../lib/AuthClient";

import { useAuthentication } from "./useAuth";

export const useAccount = () => {
  const { instance } = useAuthentication();
  const [account, setAccount] = useState<IAccount | undefined>(
    instance.getActiveAccount()
  );

  const updateAccount = useCallback(() => {
    const account = instance.getActiveAccount();
    if (!account) return;

    setAccount({
      ...account,
    });
  }, [instance]);

  useEffect(() => {
    updateAccount();
  }, [updateAccount]);

  return account;
};
