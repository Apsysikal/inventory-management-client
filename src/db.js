import * as axios from "axios";

if (!process.env.REACT_APP_DB_URI) {
  throw new Error("REACT_APP_DB_URI environment variable not set");
}

const uri = String(process.env.REACT_APP_DB_URI);

const endpoint = `${uri}`;

export async function get(collection) {
  return axios.get(`${endpoint}${collection}`);
}

export async function create(collection, item) {
  return axios.post(`${endpoint}${collection}`, {
    serial: item.serial,
    description: item.description,
    count: item.count,
  });
}

export async function modify(collection, item) {
  return axios.put(`${endpoint}${collection}/${item._id}`, {
    serial: item.serial,
    description: item.description,
    count: item.count,
  });
}
