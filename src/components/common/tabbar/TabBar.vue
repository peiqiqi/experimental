<template>
  <div>

  <el-container class="home-container">
    <!--    头部区域-->
    <el-header height="80px" style="z-index:4">

        <img src="@/assets/img/icon-华农白.png" alt="" >
      <el-col :span="4">
        <span >试验统计学</span>
      </el-col>


      <el-col :span="12">
        <el-menu
          :default-active="activeIndex2"
          :router="true"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#186164"
          text-color="#fff"
          active-text-color="#ffd04b">
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
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-link type="info" @click="loginDialogVisible=true">登录</el-link>
        <el-link type="info" @click="registDialogVisible=true">注册</el-link>
      </el-col>
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
      @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="100px" class="demo-ruleForm">
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
        @close="loginDialogClosed">
        <!--内容主体区域-->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" label-width="100px" class="demo-ruleForm">
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
    export default {
      name: "tabbar",
      data() {
        //验证二次密码的规则
        var checkPassword2 = (rule, value, cb) => {
          if (value === '') {
            cb(new Error('请再次输入密码'));
          } else if (value !== this.addForm.password) {
            cb(new Error('两次输入密码不一致!'));
          } else {
            return cb();
          }
        }

        //验证邮箱的规则
        var checkEmail = (rule, value, cb) => {
          //验证邮箱的正则表达式
          const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
          if(regEmail.test(value)){
            //合法的邮箱
            return cb()
          }
          cb(new Error('请输入合法的邮箱'))
        }

        //验证手机号的规则
        var checkMobile = (rule, value, cb) => {
          //验证手机号的正则表达式
          const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/
          if(regMobile.test(value)){
            //合法的手机号
            return cb()
          }
          cb(new Error('请输入合法的手机号'))
        }

        return {
          //控制导航栏高亮显示
          activeIndex2: this.$route.path,

          //控制对话框的显示与隐藏
          registDialogVisible:false,
          loginDialogVisible:false,

          //登录表单的数据绑定对象
          loginForm: {
            id: '',
            password: ''
          },
          //表单的验证规则对象
          loginFormRules: {
            id:[
              { required: true, message: '学号不能为空', trigger: 'blur' }
            ],
            password:[
              { required: true, message: '密码不能为空', trigger: 'blur' }
            ]
          },
          //注册添加用户的表单数据
          addForm: {
            id:'',
            username:'',
            password:'',
            password2:'',
            email:'',
            mobile:''
          },
          //注册表单的验证规则对象
          addFormrules:{
            id:[
              {required: true, message:'请输入学号',tigger: 'blur'},
              {min: 12,max: 12, message: '学号长度为12字符',tigger: 'blur'}
            ],
            username:[
              {required: true, message:'请输入用户名',tigger: 'blur'},
              {min: 2,max: 10, message: '用户名的长度在2~10个字符之间',tigger: 'blur'}
            ],
            password:[
              {required: true, message:'请输入密码',tigger: 'blur'},
              {min: 6,max: 15, message: '密码的长度在6~15个字符之间',tigger: 'blur'}
            ],
            password2:[
              // {required: true, message:'请输入密码',tigger: 'blur'},
              {validator:checkPassword2,tigger: 'blur'}
            ],
            email:[
              {required: true, message:'请输入邮箱',tigger: 'blur'},
              {validator:checkEmail,tigger: 'blur'}
            ],
            mobile:[
              {required: true, message:'请输入电话',tigger: 'blur'},
              {validator:checkMobile,tigger: 'blur'}
            ]
          },
               };
        },
      methods:{
        //监听用户对话框的关闭事件
        addDialogClosed(){
          this.$refs.addFormRef.resetFields()
        },
        loginDialogClosed(){
          this.$refs.loginFormRef.resetFields()
        },

        //点击按钮，注册并添加新用户
        addUser(){
          this.$refs.addFormRef.validate(async valid => {
            if (!valid) return
            //可以发起添加用户的网络请求
            const {data: res} = await this.$http.post('users',this.addForm)
            if (res.meta.status !== 201){
              this.$message.error('注册失败！')
            }
            this.$message.success('注册成功！')
            //隐藏添加用户的对话框
            this.addDialogVisible = false
          })
        },
        login() {
          this.$refs.loginFormRef.validate(async valid =>{
            //console.log(valid);
            if(!valid) return;
            const {data:res } = await this.$http.post("login",this.loginForm);
            if (res.meta.status !== 200) return this.$message.error('登录失败，用户名或密码错误')
            this.$message.success('登陆成功');
            //1.将登录成功之后的token，保存到客户端的sessionStorage中
            //  1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
            window.sessionStorage.setItem("token", res.data.token);
          } );
        }
      }
    }
</script>

<style lang="less" scoped>

  .home-container{
    height: 100%;
  }
  .el-link {
    margin-left: 15px;
  }

  .el-header {
    width: 100%;
    position: fixed; //不随滚动
    top:0;
    left:0;
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
  >div {
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
