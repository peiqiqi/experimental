/**
 *这里存储用户的数据或公共数据等
 */
export default {
  //状态值
  state: {
    // 用户信息
    userInfo: sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null, //
    // 用户是否已登录的标示 bool
    loginFlag: ![undefined, null, ""].includes(
      sessionStorage.getItem("userInfo")
    )
  },
  // 状态值的改变方法,操作状态值 提交mutations是更改Vuex状态的唯一方法
  mutations: {
    getUserInfo(state, { data, loginFlag }) {
      // console.log(data, loginFlag);
      state.userInfo = data;
      state.loginFlag = loginFlag;
      if (data) {
        sessionStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
      }
    }
  },
  // 要改变状态值只能通过提交mutations来完成
  actions: {
    changeUserInfo({ commit }, { data, loginFlag = true }) {
      commit("getUserInfo", { data, loginFlag });
    }
  }
};
