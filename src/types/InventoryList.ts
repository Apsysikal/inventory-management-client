export type InventoryList = {
  id: string;
  title: string;
  description: string;
  owner: InventoryListAccount;
  members: InventoryListAccount[];
};

export type InventoryListAccount = {
  id: string;
  name: string;
};

export type CreateInventoryList = Pick<InventoryList, "title" | "description">;
