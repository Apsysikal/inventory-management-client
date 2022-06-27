if (!process.env.REACT_APP_KRATE_ID) {
  throw new Error("REACT_APP_KRATE_ID environment variable not set");
}

export const API_URL = "https://krat.es";
export const KRATE_ID = String(process.env.REACT_APP_KRATE_ID);
