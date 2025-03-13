import axios from "axios";
import {BACKEND_URL, BOOKS_API, STORAGE_TOKEN_ENTRY} from "../utils/constants.jsx";
import {timedOutMessage} from "../utils/tools.jsx";

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_TOKEN_ENTRY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const wrappedHook = (request, setSuccess, setError, navigate) => {
  return request.then(e => timedOutMessage(() => setSuccess(true), () => setSuccess(false) || navigate('/')))
    .catch(e => timedOutMessage(() => setError(e.message), () => setError(null)))
}

export const usePostHook = (url, setSuccess, setError, navigate) => {
  return (data) => wrappedHook(api.post(url, data), setSuccess, setError, navigate)
}

export const usePutHook = (url, setSuccess, setError, navigate) => {
  return (data) => wrappedHook(api.put(url + '/' + data.id, data), setSuccess, setError, navigate)
}

export const useDeleteHook = (baseUrl, setSuccess, setError) => {
  return (url) => api.delete(baseUrl + "/" + url)
    .then(e => window.location.href = '/')
    .catch(e => timedOutMessage(() => setError(e.message), () => setError(null)))
}
