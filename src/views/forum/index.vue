<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple forum-div">
        <el-button type="primary" @click="toAdd">发表讨论</el-button>
        <li
        v-for="item of list.items"
        class="u-forumli">
          <div class="cnt">
            <router-link class="j-link" :to="{ name: 'details', params: { pid: item.pid }}">{{item.title}}</router-link>
          </div>
          <span>
            <span class="userInfo" title="">{{item.name}}</span>
            <span class="lb10">{{item.date}} 发表</span>
          </span>
          <p class="reply">回复：{{item.count}}</p>
        </li>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="list.total">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      const item = {
        title: '不同设计方差分析的比较',
        name: '张三',
        date: '2020-05-01',
        pid: 1313965788,
        count: 10
      };
      return {
        list: {
          items: Array(10).fill(item),
          total: 10
        }
      }
    },
    methods: {
      toAdd() {
        this.$router.push({
          path: 'add',
        }).catch(err => {err})
      }
    }
  };
</script>

<style scoped>
  .forum-div {
    margin-top: 10px;
  }
  .u-forumli a {
    text-decoration: none;
  }
  .u-forumli {
    position: relative;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
    list-style: none;
  }
  .u-forumli .cnt {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .u-forumli .j-link {
    margin-left: 6px;
    color: #333;
    font-family: "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica", "sans-serif";
  }
  .u-forumli .j-link:hover {
    color: #00AD4D;
    text-decoration: none;
  }
  .userInfo {
    color: #00c758;
  }
  .lb10 {
    margin-left: 6px;
    color: #999;
  }
  .reply {
    position: absolute;
    width: 75px;
    bottom: 0;
    right: 75px;
    color: #999;
  }
</style>
