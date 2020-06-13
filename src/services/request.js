import axios from "axios";
import { stringify } from "qs";
import _ from "lodash";
import { Message } from "element-ui";

const default_option = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`
  }
};
// 统一处理响应
const responseHandler = response => {
  //   console.log(response);
  const { data, status } = response;
  if (status >= 200 && status < 400) {
    return Promise.resolve(data.data);
  }
  const { error, msg } = data;
  // TODO 把错误提示弹出
  Message.error(error);
  // 401 是操作无权限，让用户去登录
  if (status === 401) {
    // TODO 让用户去登录
  }
  return Promise.reject(data);
};
/**
 *
 * @param {*} url string
 * @param {*} param object|null
 * @param {*} query object|null
 */
export const get = ({ url = "", param = null, query = null }) => {
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
  //   let newOption = {};
  //   if (options) {
  //     newOption = _.merge({}, default_option, ...options);
  //   } else {
  //     newOption = default_option;
  //   }
  return axios.get(url, default_option).then(responseHandler);
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
  console.log(Object.prototype.toString.call(options));

  // let newOption = {};
  // if (options) {
  //   newOption = _.merge({}, default_option, ...options);
  // } else {
  //   newOption = default_option;
  // }
  const newOption = default_option;
  return axios.post(url, body, newOption).then(responseHandler);
};
// 修改
export const put = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
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
  // console.log(Object.prototype.toString.call(options));
  // let newOption = {};
  // if (options) {
  //   newOption = _.merge({}, default_option, ...options);
  // } else {
  //   newOption = default_option;
  // }
  const newOption = default_option;

  return axios.put(url, body, newOption).then(responseHandler);
};
// 删除
export const del = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
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
  // let newOption = {};
  // if (options) {
  //   newOption = _.merge({}, default_option, ...options);
  // } else {
  //   newOption = default_option;
  // }
  const newOption = default_option;

  return axios.delete(url, body, newOption).then(responseHandler);
};

// form表单提交，主要是上传文件会用到
export const postForm = ({
  url = "",
  param = null,
  query = null,
  body = null,
  ...options
}) => {
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
  const formData = new FormData();
  if (body) {
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });
  }
  return axios.post(url, formData).then(responseHandler);
};
