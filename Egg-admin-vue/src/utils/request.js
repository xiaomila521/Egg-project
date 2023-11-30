import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken, removeToken } from "@/utils/auth";
import router from "@/router/index";
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers["Token"] = getToken("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // if the custom code is not 20000, it is judged as an error.
    if (res.status >= 300 || res.status < 200) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          "You have been logged out, you can cancel to stay on this page, or log in again",
          "Confirm logout",
          {
            confirmButtonText: "Re-Login",
            cancelButtonText: "Cancel",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(response);
    } else {
      return res;
    }
  },
  (error) => {
    if (error.response.status === 403) {
      Message({
        message: error.response.data.error || error.response.data.message,
        type: "error",
      });
      removeToken("token");
      router.push("/login");
    } else {
      Message({
        message: error.response.data.error || error.response.data.message,
        type: "error",
      });
      return Promise.reject(error);
    }
  }
);

export default service;
