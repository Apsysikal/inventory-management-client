import InventoryItem from "../types/InventoryItem";

const handleItemCheckboxClick = (item: InventoryItem) => {
  const modifiedItem = { ...item };

  if (modifiedItem.checked) {
    modifiedItem.checked = false;
    modifiedItem.count = 0;
  } else {
    modifiedItem.checked = true;
    modifiedItem.count = 1;
  }

  return modifiedItem;
};

const handleItemRemoveClick = (item: InventoryItem) => {
  const modifiedItem = { ...item };

  if (modifiedItem.count === 0) {
    return modifiedItem;
  } else if (modifiedItem.count === 1) {
    modifiedItem.checked = false;
    modifiedItem.count = 0;
  } else {
    modifiedItem.count = modifiedItem.count - 1;
  }

  return modifiedItem;
};

const handleItemAddClick = (item: InventoryItem) => {
  const modifiedItem = { ...item };

  if (modifiedItem.count === modifiedItem.maxCount) {
    return modifiedItem;
  } else {
    modifiedItem.checked = true;
    modifiedItem.count = modifiedItem.count + 1;
  }

  return modifiedItem;
};

export { handleItemCheckboxClick, handleItemRemoveClick, handleItemAddClick };
