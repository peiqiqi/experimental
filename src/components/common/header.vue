<template>
  <el-menu
    :default-active="activeIndex2"
    :router="true"
    class="h"
    background-color="#186164"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/homepage">首页</el-menu-item>
    <el-menu-item index="/announce">课程简介</el-menu-item>
    <el-menu-item index="/teacher">授课教师</el-menu-item>
    <el-menu-item index="/outline">课程大纲</el-menu-item>
    <el-menu-item index="/plist">课件</el-menu-item>
    <el-menu-item index="/material">教学资料</el-menu-item>

    <el-menu-item index="/testlist">测试与作业</el-menu-item>
    <el-menu-item index="/forum">讨论</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      //控制导航栏高亮显示
      activeIndex2: this.$route.path
    };
  }
};
</script>

<style scoped>
.h {
  width: 200px;
  /* height: calc(100vh - 80px); */
}
</style>
