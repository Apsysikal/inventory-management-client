import { AxiosError } from "axios";
import { useState, useEffect } from "react";

import { getItems, FilterParams } from "../service/item";

import InventoryItem from "../types/InventoryItem";

function useItems(params?: FilterParams) {
  const [data, setData] = useState<InventoryItem[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getItems(params)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error: Error | AxiosError) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data, error };
}

export { useItems };
