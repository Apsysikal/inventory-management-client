export default interface InventoryItem {
  _id: string;
  serial: string;
  description: string;
  count: number;
  list: string;
  checked?: boolean;
  maxCount?: number;
}
