import { AxiosRequestConfig } from "axios";

import { Api } from "../api/api";

import { API_URL } from "../config/api";

const url = `${API_URL}`;
const endpoint = "item";

const api = new Api(url, endpoint);

export type ItemRequest = {
  serial: string;
  description: string;
  count: number;
  list: string;
};

export type ItemResponse = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  serial: string;
  description: string;
  count: number;
  list: string;
};

export type FilterParams = {
  list: string;
  limit?: number;
  skip?: number;
  query?: string;
};

async function getItems(params?: FilterParams, config?: AxiosRequestConfig) {
  return api.get<ItemResponse[]>({
    ...config,
    params,
  });
}

function getItemById(id: string, config?: AxiosRequestConfig) {
  return api.get<ItemResponse[]>({
    ...config,
    url: `${api.getEndpoint()}/${id}`,
  });
}

function createItem(data: ItemRequest, config?: AxiosRequestConfig) {
  return api.post<ItemResponse>(data, {
    ...config,
  });
}

function createItems(data: ItemRequest[], config?: AxiosRequestConfig) {
  return api.post<ItemResponse[]>(data, {
    ...config,
  });
}

async function updateItem(
  id: string,
  data: ItemRequest,
  config?: AxiosRequestConfig
) {
  return api.put<ItemResponse>(data, {
    ...config,
    url: `${api.getEndpoint()}/${id}`,
  });
}

export { getItems, getItemById, createItem, createItems, updateItem };
