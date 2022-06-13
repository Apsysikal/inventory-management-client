import { atom } from "recoil";

import InventoryItem from "../types/InventoryItem";

const checkinItemsState = atom<InventoryItem[]>({
  key: "checkinItemsState",
  default: [],
});

export { checkinItemsState };
