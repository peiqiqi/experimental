<template>
  <el-container>
    <el-aside width="300px" >
      <el-menu
        text-color="black"
        :router="true"
        active-text-color="#ffd04b"
        :default-active="active()" > <!--激活菜单颜色-->
        <leftNav
         :list="list"
         ></leftNav>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  import leftNav from 'content/leftNav'
  export default {
    name: "PList",
    data() {
      return {
        list: [{
          index: '1',
          icon: 'takeaway-box',
          title: '理论课程',
          children: [{
            index: '2',
            icon: 'data-analysis',
            title: '第二章 资料的整理与描述',
          },{
            index: '3',
            icon: 'data-analysis',
            title: '第三章 常用概率分布',
          },{
            index: '4',
            icon: 'notebook-1',
            title: '第四章 统计假设测验',
            children: [{
              index: '41',
              icon: 'data-analysis',
              title: '统计的假设测验（1）',
            },{
              index: '42',
              icon: 'data-analysis',
              title: '统计的假设测验（2）',
            }]
          },{
            index: '5',
            icon: 'notebook-1',
            title: '第五章 方差分析',
            children: [{
              index: '51',
              title: '方差分析(1)',
            },{
              index: '52',
              title: '方差分析(2)',
            },{
              index: '53',
              title: '方差分析(3)',
            },{
              index: '54',
              title: '方差分析(4)',
            },]
          },{
            index: '6',
            icon: 'data-analysis',
            title: '第六章 卡方测验',
          },{
            index: '7',
            icon: 'data-analysis',
            title: '第七章 直线回归与相关分析',
          },{
            index: '10',
            icon: 'data-analysis',
            title: '第十章 章 试验资料的方差分析',
          }]
        },{
          index: '11',
          icon: 'menu',
          title: '试验课',
          children: [{
            index: '111',
            icon: 'el-icon-magic-stick',
            title: '实验1 统计分析软件SAS的应用',
          },{
            index: '222',
            icon: 'el-icon-magic-stick',
            title: '实验2 R语言及其应用',
          },{
            index: '333',
            icon: 'el-icon-magic-stick',
            title: '实验3 R语言及其应用（2）',
          },{
            index: '444',
            icon: 'el-icon-magic-stick',
            title: '实验4 统计分析软件SAS的应用(2)',
          }]
        }]
      }
    },
    components: {
      leftNav
    },
    methods: {
      active() {
        if (this.$route.params.id) {
          return this.$route.params.id.toString()
        } else {
          return '2'
        }
      }
    },
    created() {
      this.$router.push({
        name: 'content',
        params: {
          id: this.active()
        },
      }).catch(err => {err})
    }
  }
</script>

<style lang="less" scoped>
  el-container{
    height: 100%;
  }
  .el-aside{
    margin-left: -20px;
    background-color: #ffffff;
  .el-menu {
    border-right: none;

  }
  }
</style>
