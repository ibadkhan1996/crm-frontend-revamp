import axios from "axios";
import { SERVER_URL } from "src/constants/SERVER_URL";
import { store } from "src/redux/store";

const api = axios.create({
  baseURL: `${SERVER_URL}api`,
});

const setAuthorizationHeader = (config) => {
  const authToken = store.getState().auth.token;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken.accessToken}`;
  }

  return config;
};

api.interceptors.request.use(
  (config) => setAuthorizationHeader(config),
  (error) => Promise.reject(error)
);

export default api;
