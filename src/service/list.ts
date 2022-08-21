import { AxiosRequestConfig } from "axios";

import { Api } from "../api/api";
import { API_URL } from "../config/api";
import { InventoryList, CreateInventoryList } from "../types/InventoryList";

const url = `${API_URL}`;
const endpoint = "list";

const api = new Api(url, endpoint);

function getLists(config?: AxiosRequestConfig) {
  return api.get<InventoryList[]>({
    ...config,
  });
}

function getListById(id: string, config?: AxiosRequestConfig) {
  return api.get<InventoryList[]>({
    ...config,
    url: `${api.getEndpoint()}/${id}`,
  });
}

function createList(data: CreateInventoryList, config?: AxiosRequestConfig) {
  return api.post<InventoryList>(data, {
    ...config,
  });
}

function updateList(
  id: string,
  data: CreateInventoryList,
  config?: AxiosRequestConfig
) {
  return api.put<InventoryList>(data, {
    ...config,
    url: `${api.getEndpoint()}/${id}`,
  });
}

export { getLists, getListById, createList, updateList };
