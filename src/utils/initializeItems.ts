import InventoryItem from "../types/InventoryItem";

function initializeCheckinItems(items: InventoryItem[]) {
  const modifiedItems = items.map((item) => {
    return {
      ...item,
      checked: false,
      count: 0,
    };
  });

  return modifiedItems;
}

function initializeCheckoutItems(items: InventoryItem[]) {
  const modifiedItems = items.map((item) => {
    return {
      ...item,
      checked: false,
      maxCount: item.count,
      count: 0,
    };
  });

  return modifiedItems;
}

export { initializeCheckinItems, initializeCheckoutItems };
