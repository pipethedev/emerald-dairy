"use client";

import { BASE_URL } from "@/lib/utils/constants";
import store from "@/store";
import axios from "axios";

const api = axios.create({
  baseURL: `${BASE_URL}/api` || "",
  headers: {
    "Content-Type": "application/json",
  },
});

console.log("OKAYYYYYY");

api.interceptors.request.use(
  (config) => {
    const AUTH_TOKEN = store.getState().auth.token;
    console.log({ AUTH_TOKEN });
    if (AUTH_TOKEN) config.headers.Authorization = AUTH_TOKEN;
    return config;

    // Alter defaults after instance has been created
    // api.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
