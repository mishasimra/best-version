import axios from "axios";

export const storageKey = "best-version-auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    const parsed = JSON.parse(stored);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }
  return config;
});

export async function fetcher(url, config = {}) {
  const response = await api(url, config);
  return response.data.data;
}
