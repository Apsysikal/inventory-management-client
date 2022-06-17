import { useState, useEffect } from "react";
import axios from "axios";

function useGet<Type>(endpoint: string) {
  const [data, setData] = useState<Type>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEndpoint = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Type>(endpoint);
        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getEndpoint();
  }, [endpoint]);

  return { loading, data, error };
}

export { useGet };
