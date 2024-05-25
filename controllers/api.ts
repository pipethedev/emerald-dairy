// "use client";

import { Lock4Icon } from "@/app/components/svgs";
import { useRedirect } from "@/hooks";
import { BASE_URL } from "@/lib/utils/constants";
import { notify } from "@/lib/utils/helpers";
import store from "@/store";
import { clearUser, redirectUser } from "@/store/slices/auth";
import axios, { AxiosError } from "axios";
// import { redirect } from "next/navigation";
// import { Router } from "next/router";

const api = axios.create({
  baseURL: `${BASE_URL}/api` || "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const AUTH_TOKEN = store.getState().auth.token;
    if (AUTH_TOKEN) config.headers.Authorization = AUTH_TOKEN;
    return config;

    // Alter defaults after instance has been created
    // api.defaults.headers.common["Authorization"] = AUTH_TOKEN;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // You can modify the response data here, e.g., handling pagination
    console.log("RES_STATUS: ", response.status);

    console.log("INTERCEPTOR_DATA: ", response.data);
    return response;
  },
  (error: AxiosError) => {
    // try {
    console.log("INTERCEPTOR_ERROR: ", error.code);
    if (error.response?.status === 401) {
      console.log("REMOVING_USER");
      store.dispatch(clearUser());
      notify({
        message: "Logged Out",
        show: true,
        type: "info",
        icon: Lock4Icon,
      });
      store.dispatch(redirectUser({ url: "/signin", action: "replace" }));
    }
    return Promise.reject(error);
    // } catch (error) {
    // console.error("INTERCEPTOR_RESPONSE", { error });
    // }
  }
);

export default api;
