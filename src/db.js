import * as axios from "axios";

const id = "36829d701ab35548816a";
const endpoint = `http://localhost:3001/${id}`;

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
