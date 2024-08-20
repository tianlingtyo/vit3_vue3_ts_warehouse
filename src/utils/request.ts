// / <reference types="vite/client" />
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getByKey } from "@/utils/auth";

import { tansParams } from "@/utils/tools";
import { TErrorCode, TOtherCode } from "./type";
import { removeByKey } from "./auth";
import { Language } from "@/enum";

import i18n from "@/i18n";

const { t } = i18n.global;

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service: AxiosInstance = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_APP_API
      : import.meta.env.VITE_APP_BASE_URL,
  // 超时
  timeout: 30000,
});

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 设置语言
    config.headers["Accept-Language"] = getByKey("lang") || Language.Ja;
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = `${config.url}?${tansParams(config.params)}`;
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: AxiosResponse<any>) => {
    // 未设置状态码则默认成功状态
    const code: TErrorCode = res.data.code || 200;
    const otherCode: TOtherCode = res.data.code;
    // 二进制数据则直接返回
    // if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    //   return res.data;
    // }

    if (code === 401) {
      removeByKey("satoken");
      // modal.error({ detail: t('COMMON.LOG_EXPIRED_DIALOG') });
      setTimeout(() => {
        location.href = `${
          import.meta.env.VITE_APP_AUTH_URL
        }login?returnUrl=hrom`;
      }, 1000);
      return Promise.reject(res.data);
    }
    if (otherCode !== 200) {
      // modal.error({ detail: res.data.msg });
      return Promise.reject(res.data);
    }
    return Promise.resolve(res.data);
  },
  (error: AxiosError) => {
    let { message } = error;
    if (message.includes("timeout")) {
      message = t("COMMON.TIME_OUT");
    } else {
      message = t("COMMON.CONNECTED_ERROR");
    }
    // modal.error({ detail: message });
    return Promise.reject(error);
  }
);

export default service;
