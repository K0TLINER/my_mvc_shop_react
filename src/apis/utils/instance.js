import axios from "axios";

const BASE_URL = "http://127.0.0.1:8080";

const axiosApi = (url, options) => {
  const instance = axios.create({ baseURL: url, ...options });

  return instance;
};

const axiosAuthApi = (url, options) => {
  // const token = "JWT?";
  const token = null;

  const instance = axios.create({
    BASE_URL: url,
    headers: { Authorization: `Bearer ${token}` },
    ...options,
  });

  return instance;
};

export const defaultInstance = axiosApi(BASE_URL);
export const authInstance = axiosAuthApi(BASE_URL);
