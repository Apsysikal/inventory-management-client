import { useState, useEffect } from "react";

import { get } from "../db";

import InventoryItem from "../types/InventoryItem";

/**
 * Used to access the central item store.
 * These are all the items currently stored locally.
 * @returns The state [items, setItems] as an object
 * {items, setItems}
 */
const useItems = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    get("/item")
      .then(({ data }) => {
        setItems([...data]);
      })
      .catch(console.debug);
  }, []);

  return items;
};

export { useItems };
