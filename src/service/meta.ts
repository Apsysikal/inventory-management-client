import { Api } from "../api/api";

import { API_URL } from "../config/api";

const url = `${API_URL}/meta`;
const endpoint = "";

const api = new Api(url, endpoint);

interface MetaResponse {
  krateSize: number;
  totalCollections: number;
  totalRecords: number;
  createdAt: Date;
  updatedAt: Date;
}

function getMeta() {
  return api.get<MetaResponse>();
}

export { getMeta };
