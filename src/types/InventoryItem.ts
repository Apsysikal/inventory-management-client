export default interface InventoryItem {
  _id: string;
  serial: string;
  description: string;
  count: number;
  checked?: boolean;
  maxCount?: number;
}
