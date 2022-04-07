import axios from "axios";
import InventoryItem from "./types/InventoryItem";

if (!process.env.REACT_APP_DB_URI) {
  throw new Error("REACT_APP_DB_URI environment variable not set");
}

const uri = String(process.env.REACT_APP_DB_URI);

export async function get(endpoint: string) {
  return axios.get(`${uri}${endpoint}`);
}

export async function create(endpoint: string, item: InventoryItem) {
  return axios.post(`${uri}${endpoint}`, {
    serial: item.serial,
    description: item.description,
    count: item.count,
  });
}

export async function modify(endpoint: string, item: InventoryItem) {
  return axios.put(`${uri}${endpoint}/${item._id}`, {
    serial: item.serial,
    description: item.description,
    count: item.count,
  });
}
