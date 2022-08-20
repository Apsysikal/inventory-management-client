import { useReducer } from "react";

import InventoryItem from "../types/InventoryItem";
import { getItemIndex } from "../utils/items";

export enum ItemSelectionActionType {
  INITIALIZE = "INITIALIZE",
  SELECT = "SELECT",
  DESELECT = "DESELECT",
  INCREMENT = "INCREMENT",
  DECREMENT = "DECREMENT",
}

interface ItemSelectionAction {
  type: ItemSelectionActionType;
  payload: InventoryItem | InventoryItem[];
}

const initialize = (items: InventoryItem[]) => {
  return [...items];
};

const itemSelect = (item: InventoryItem) => {
  return {
    ...item,
    checked: true,
    count: 1,
  };
};

const itemDeselect = (item: InventoryItem) => {
  return {
    ...item,
    checked: false,
    count: 0,
  };
};

const itemDecrement = (item: InventoryItem) => {
  const { count } = item;

  if (count === 0) return { ...item };
  if (count === 1) return { ...item, checked: false, count: 0 };

  return { ...item, count: count - 1 };
};

const itemIncrement = (item: InventoryItem) => {
  const { count, maxCount } = item;

  if (count === maxCount) return { ...item };

  return { ...item, checked: true, count: count + 1 };
};

const reducer = (
  state: InventoryItem[],
  { type, payload }: ItemSelectionAction
) => {
  let modifiedItem;

  switch (type) {
    case ItemSelectionActionType.INITIALIZE:
      if (!Array.isArray(payload)) return state;
      return initialize(payload);

    case ItemSelectionActionType.DECREMENT:
      if (Array.isArray(payload)) return state;
      modifiedItem = itemDecrement(payload);
      break;

    case ItemSelectionActionType.INCREMENT:
      if (Array.isArray(payload)) return state;
      modifiedItem = itemIncrement(payload);
      break;

    case ItemSelectionActionType.SELECT:
      if (Array.isArray(payload)) return state;
      modifiedItem = itemSelect(payload);
      break;

    case ItemSelectionActionType.DESELECT:
      if (Array.isArray(payload)) return state;
      modifiedItem = itemDeselect(payload);
      break;

    default:
      throw new Error("You must provide a type when using dispatch");
  }

  const modifiedState = [...state];
  const index = getItemIndex(modifiedState, modifiedItem);
  modifiedState[index] = modifiedItem;
  return [...modifiedState];
};

const useItemSelection = (initialItems: InventoryItem[]) => {
  return useReducer(reducer, initialItems, initialize);
};

export { useItemSelection };
