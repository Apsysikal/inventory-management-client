/**
 * This is copied and modified from https://blog.galmalachi.com/react-and-jwt-authentication-the-right-way
 */

import { useState, useEffect, useRef } from "react";

function useTokenExpiration(onTokenRefreshRequired: Function) {
  const timeoutReference = useRef<number>();
  const [tokenExpiration, setTokenExpiration] = useState<Date>();

  useEffect(() => {
    /**
     * Calculate the time until expiration and
     * register the callback to be called once the
     * time is reached
     */
    if (tokenExpiration instanceof Date && !isNaN(tokenExpiration.valueOf())) {
      // Token expiration is set
      const now = new Date();
      const timeUntilExpiration = tokenExpiration.getTime() - now.getTime();

      timeoutReference.current = window.setTimeout(() => {
        onTokenRefreshRequired();
      }, timeUntilExpiration);
    }
  }, [tokenExpiration, onTokenRefreshRequired]);

  const clearAutomaticRefresh = () => {
    window.clearTimeout(timeoutReference.current);
    setTokenExpiration(undefined);
  };

  return {
    setTokenExpiration,
    clearAutomaticRefresh,
  };
}

export { useTokenExpiration };
