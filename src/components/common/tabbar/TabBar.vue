<template>
  <div>
    <el-container class="home-container">
      <!--    头部区域-->
      <el-header height="80px" style="z-index:4">
        <img src="@/assets/img/icon-华农白.png" alt="" />
        <el-col :span="4">
          <span>试验统计学</span>
        </el-col>
        <el-col :span="12">
          <el-menu
            :default-active="activeIndex2"
            :router="true"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#186164"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/homepage">首页</el-menu-item>
            <el-menu-item index="/announce">课程简介</el-menu-item>
            <el-menu-item index="/teacher">授课教师</el-menu-item>
            <el-menu-item index="/outline">课程大纲</el-menu-item>
            <el-menu-item index="/plist">课件</el-menu-item>
            <el-menu-item index="/testlist">测试与作业</el-menu-item>
            <el-menu-item index="/forum">讨论</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <span @click.stop="changeAvatar">
            <el-avatar :src="(userInfo && userInfo.avatar) || defaultAvatar" />
          </span>
          <span>
            <span style="padding-left:20px" v-if="loginFlag">
              <span> {{ userInfo.user_name }} </span>
              <el-link type="info" @click="logout">登出</el-link>
            </span>

            <span v-else>
              <el-link type="info" @click="loginDialogVisible = true"
                >登录</el-link
              >
              <el-link type="info" @click="registDialogVisible = true"
                >注册</el-link
              >
            </span>
          </span>
        </el-col>
        <input id="avatar_upload" type="file" hidden />
      </el-header>
      <!--    页面主体区域-->
      <el-main style="margin-top: 60px">
        <router-view></router-view>
      </el-main>
      <!--注册的对话框-->
      <el-dialog
        title="注册"
        :visible.sync="registDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!--内容主体区域-->
        <el-form
          :model="addForm"
          :rules="addFormrules"
          ref="addFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="学号" prop="id">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input v-model="addForm.password2" show-password></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="registDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!--登录的对话框-->
      <el-dialog
        title="登录"
        :visible.sync="loginDialogVisible"
        width="30%"
        @close="loginDialogClosed"
      >
        <!--内容主体区域-->
        <el-form
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="学号" prop="id">
            <el-input v-model="loginForm.id"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <!--底部按钮区域-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="loginDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="login">确 定</el-button>
        </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import { post, postForm, put } from "@/services/request";
import urls from "@/services/urls";
export default {
  name: "tabbar",
  data() {
    //验证二次密码的规则
    var checkPassword2 = (rule, value, cb) => {
      if (value === "") {
        cb(new Error("请再次输入密码"));
      } else if (value !== this.addForm.password) {
        cb(new Error("两次输入密码不一致!"));
      } else {
        return cb();
      }
    };
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      //验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    //验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      //验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        //合法的手机号
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      fileObj: null,
      defaultAvatar:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      //控制导航栏高亮显示
      activeIndex2: this.$route.path,
      //控制对话框的显示与隐藏
      registDialogVisible: false,
      loginDialogVisible: false,
      //登录表单的数据绑定对象
      loginForm: {
        id: "",
        password: ""
      },
      //表单的验证规则对象
      loginFormRules: {
        id: [
          {
            required: true,
            message: "学号不能为空",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      },
      //注册添加用户的表单数据
      addForm: {
        id: "",
        username: "",
        password: "",
        password2: "",
        email: "",
        mobile: ""
      },
      //注册表单的验证规则对象
      addFormrules: {
        id: [
          {
            required: true,
            message: "请输入学号",
            tigger: "blur"
          },
          {
            min: 12,
            max: 12,
            message: "学号长度为12字符",
            tigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "请输入用户名",
            tigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: "用户名的长度在2~10个字符之间",
            tigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            tigger: "blur"
          },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6~15个字符之间",
            tigger: "blur"
          }
        ],
        password2: [
          // {required: true, message:'请输入密码',tigger: 'blur'},
          {
            validator: checkPassword2,
            tigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            tigger: "blur"
          },
          {
            validator: checkEmail,
            tigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "请输入电话",
            tigger: "blur"
          },
          {
            validator: checkMobile,
            tigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    document.getElementById("avatar_upload").addEventListener("change", $ev => {
      console.log("change", $ev.target.files);
      this.fileObj = $ev.target.files[0];
      this.uploadAvatar();
    });
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    loginFlag() {
      return this.$store.state.user.loginFlag;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("changeUserInfo", {
        data: null,
        loginFlag: false
      });
    },
    //监听用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    loginDialogClosed() {
      this.$refs.loginFormRef.resetFields();
    },
    //点击按钮，注册并添加新用户
    async addUser() {
      const valid = await this.$refs.addFormRef.validate();
      console.log("valid", valid);
      if (!valid) return;
      //可以发起添加用户的网络请求
      // const { data: res } = await this.$http.post("users", this.addForm);
      // if (res.meta.status !== 201) {
      //   this.$message.error("注册失败！");
      // }
      // this.$message.success("注册成功！");
      // } catch (e) {
      //   console.log("err", e);
      // }
      const { id, username, password, password2, email, mobile } = this.addForm;
      const body = {
        user_name: username,
        password,
        password_confirm: password2,
        student_id: id,
        phone: mobile,
        email
      };
      try {
        const res = await post({
          url: urls.register,
          body
        });
        if (!res) {
          return;
        }
        //隐藏添加用户的对话框
        this.registDialogVisible = false;
      } catch (e) {
        console.log(e);
      }
    },
    async login() {
      const valid = await this.$refs.loginFormRef.validate();
      //console.log(valid);
      if (!valid) return;
      // const { data: res } = await this.$http.post("login", this.loginForm);
      // if (res.meta.status !== 200)
      //   return this.$message.error("登录失败，用户名或密码错误");
      // this.$message.success("登陆成功");
      //1.将登录成功之后的token，保存到客户端的sessionStorage中
      //  1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
      const { id, password } = this.loginForm;
      const body = {
        // 该参数后端其实传学号或用户名都可以登录
        user_name: id,
        password
      };
      try {
        const res = await post({
          url: urls.login,
          body
        });
        if (!res) {
          return;
        }
        const { data, token } = res;
        this.$store.dispatch("changeUserInfo", { data: data });
        this.loginDialogVisible = false;
        window.sessionStorage.setItem("token", token);
      } catch (e) {
        console.log(e);
      }
    },
    async changeAvatar() {
      const avatar_upload = document.getElementById("avatar_upload");
      avatar_upload.click();
    },
    async uploadAvatar() {
      const body = {
        file: this.fileObj
      };
      try {
        const url = await postForm({
          url: urls.upload,
          body
        });
        if (!url) {
          return;
        }
        console.log("==", url);
        // const { url } = res;
        this.updateUser(url);
      } catch (e) {
        console.log(e);
      }
    },
    async updateUser(avatarUrl) {
      try {
        const res = await put({
          url: urls.updateUser,
          body: {
            avatar: avatarUrl
          }
        });
        if (!res) {
          return;
        }
        this.$message.success("头像已更新");
        const d = JSON.parse(JSON.stringify(this.userInfo));
        d.avatar = avatarUrl;
        console.log("d", d);
        this.$store.dispatch("changeUserInfo", { data: d });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-link {
  margin-left: 15px;
}
.el-header {
  width: 100%;
  position: fixed; //不随滚动
  top: 0;
  left: 0;
  background-color: #186164;
  /*background: -webkit-linear-gradient(top,black, rgba(0, 0, 0,0));*/
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 20px;
  img {
    margin-left: 50px;
    width: 60px;
    height: 60px;
  }
  > div {
    display: flex;
    align-items: center;
    /*span {*/
    /*  margin-left: 15px;*/
    /*}*/
  }
  .el-menu {
    height: 80px !important;
    align-items: center;
  }
  .el-menu-item {
    height: 80px !important;
    align-items: center;
    display: flex;
  }
  .wraper {
    height: 100vh;
    overflow-x: hidden;
  }
}
</style>
