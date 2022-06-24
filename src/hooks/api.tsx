import { AxiosError } from "axios";
import { useState, useEffect } from "react";

import { getItems } from "../service/item";

import InventoryItem from "../types/InventoryItem";

function useItems() {
  const [data, setData] = useState<InventoryItem[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getItems({ limit: 1000 })
      .then(({ data }) => {
        setData(data);
      })
      .catch((error: Error | AxiosError) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, data, error };
}

export { useItems };
