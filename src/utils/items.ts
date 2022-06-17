import InventoryItem from "../types/InventoryItem";

function getItemIndex(items: InventoryItem[], item: InventoryItem) {
  const index = items.findIndex((arrayItem) => {
    return arrayItem._id === item._id;
  });

  return index;
}

function getCheckedItems(items: InventoryItem[]) {
  return items.filter((item) => {
    return item.checked;
  });
}

export { getItemIndex, getCheckedItems };
