import { Api } from "../api/api";

import { API_URL, KRATE_ID } from "../config/api";

const url = `${API_URL}/meta/${KRATE_ID}`;
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
