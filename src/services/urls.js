import { server } from "./config";
const front = `${server}/front`;

export default {
  // 上传
  upload: `${server}/upload`,
  // 注册
  register: `${front}/user/register`,
  // 登录
  login: `${front}/user/login`,
  // 修改用户
  updateUser: `${front}/user/`,
  // 添加讨论
  discussion_add: `${front}/discussion/add`,
  // 讨论列表
  discussion_list: `${front}/discussion/list`,
  // 讨论详情
  discussion_detail: `${front}/discussion/detail/:id`,
  // 讨论的回复
  discussion_reply: `${front}/discussion/reply`
};
