import { useState, useEffect } from "react";
import axios from "axios";

import InventoryItem from "../types/InventoryItem";

const useGet = (endpoint: string) => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEndpoint = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(endpoint);
        setData([...data]);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getEndpoint();
  }, [endpoint]);

  return { loading, data, error };
};

export { useGet };
