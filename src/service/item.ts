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
};

export type ItemResponse = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  serial: string;
  description: string;
  count: number;
};

export type FilterParams = {
  limit?: number;
  skip?: number;
  query?: string;
};

function getItems(params?: FilterParams) {
  if (params) return api.get<ItemResponse[]>({ params });

  return api.get<ItemResponse[]>();
}

function getItemById(id: string) {
  const config: AxiosRequestConfig = {
    url: `${api.getEndpoint()}/${id}`,
  };

  return api.get<ItemResponse[]>(config);
}

function createItem(data: ItemRequest) {
  return api.post<ItemResponse>(data);
}

function createItems(data: ItemRequest[]) {
  return api.post<ItemResponse[]>(data);
}

function updateItem(id: string, data: ItemRequest) {
  const config: AxiosRequestConfig = {
    url: `${api.getEndpoint()}/${id}`,
  };

  return api.put<ItemResponse>(data, config);
}

export { getItems, getItemById, createItem, createItems, updateItem };
