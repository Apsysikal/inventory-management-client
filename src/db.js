import * as axios from "axios";

if (!process.env.REACT_APP_DB_URI) {
  throw new Error("REACT_APP_DB_URI environment variable not set");
}

if (!process.env.REACT_APP_DB_ID) {
  throw new Error("REACT_APP_DB_ID environment variable not set");
}

const uri = String(process.env.REACT_APP_DB_URI);
const id = String(process.env.REACT_APP_DB_ID);

const endpoint = `${uri}/${id}`;

export async function get(collection) {
  return axios.get(`${endpoint}${collection}?limit=1000`);
}

export async function create(collection, item) {
  return axios.post(`${endpoint}${collection}`, {
    serial: item.serial,
    description: item.description,
    count: item.count,
  });
}

export async function modify(collection, item) {
  return axios.put(`${endpoint}/${item._id}`, {
    serial: item.serial,
    description: item.description,
    count: item.count,
  });
}
