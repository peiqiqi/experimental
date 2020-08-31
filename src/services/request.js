import axios from "axios";
import { stringify } from "qs";
import _ from "lodash";
import { Message } from "element-ui";
import event from "@/utils/event";

const instance = axios.create({
  timeout: 10000 // 设置请求超时连接时间
});
instance.interceptors.request.use(
  config => {
    // Do something before request is sent

    config.headers.Authorization = `Bearer ${sessionStorage.getItem("token")}`; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改

    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
instance.interceptors.response.use(
  response => {
    // console.log("======", response);
    const { data, status } = response;
    if (status >= 200 && status < 400) {
      return Promise.resolve(data.data);
    } else {
      return Promise.reject("error");
    }
  },
  error => {
    const { status, data } = error.response;
    Message.error(data.msg);
    if (status === 401) {
      // 登录
      event.emit("show-login");
    }

    return Promise.reject(data);
  }
);

const preHandler = ({ url, param, query }) => {
  // 将类似 `xxx/:id`=> `xxx/1`
  if (param) {
    Object.keys(param).forEach(key => {
      const reg = new RegExp(`:${key}`, "g");
      const flag = reg.test(url);
      if (flag) {
        url = url.replace(`:${key}`, param[key]);
      }
    });
  }
  if (query) {
    url = `${url}?${stringify(query)}`;
  }
  return url;
};
/**
 *
 * @param {*} url string
 * @param {*} param object|null
 * @param {*} query object|null
 */
export const get = ({ url = "", param = null, query = null }) => {
  url = preHandler({ url, param, query });
  return instance.get(url);
};
// 新增
/**
 *
 * @param {*} url string
 * @param {*} param object|null
 * @param {*} query object|null
 */
export const post = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
  url = preHandler({ url, param, query });
  return instance.post(url, body);
};
// 修改
export const put = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
  url = preHandler({ url, param, query });

  return instance.put(url, body);
};
// 删除
export const del = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
  url = preHandler({ url, param, query });

  return instance.delete(url, body);
};

// form表单提交，主要是上传文件会用到
export const postForm = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
  url = preHandler({ url, param, query });
  const formData = new FormData();
  if (body) {
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });
  }
  return instance.post(url, formData);
};
