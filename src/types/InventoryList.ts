export type InventoryList = {
  _id: string;
  title: string;
  description: string;
  owner: InventoryListAccount;
  members: InventoryListAccount[];
};

export type InventoryListAccount = {
  _id: string;
  displayName: string;
};

export type CreateInventoryList = Pick<InventoryList, "title" | "description">;
