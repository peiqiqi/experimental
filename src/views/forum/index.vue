<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div class="grid-content bg-purple forum-div">
        <el-button type="primary" @click="toAdd">发表讨论</el-button>
        <div>
          <div v-if="discussions.list && discussions.list.length">
            <li
              v-for="item of discussions.list"
              :key="item.ID"
              class="u-forumli"
            >
              <div class="cnt">
                <router-link
                  class="j-link"
                  :to="{ name: 'details', params: { pid: item.ID } }"
                  >{{ item.title }}</router-link
                >
              </div>
              <span>
                <span class="userInfo" title="">{{ item.author }}</span>
                <span class="lb10">{{ item.CreatedAt }} 发表</span>
              </span>
              <p class="reply">回复：{{ item.reply_count || 0 }}</p>
            </li>
          </div>
          <div
            v-if="discussions.list && discussions.list.length === 0"
            style="display:flex;justify-content:center;align-items:center;min-height:100px"
          >
            当前还没有讨论数据哦
          </div>
        </div>
      </div>
      <div v-if="discussions.list && discussions.list.length">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="size"
          :total="discussions.total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { get, post, postForm, put } from "@/services/request";
import urls from "@/services/urls";
import { formatTime } from "@/utils/tool";
export default {
  data() {
    // const item = {
    //   title: "不同设计方差分析的比较",
    //   name: "张三",
    //   date: "2020-05-01",
    //   pid: 1313965788,
    //   count: 10
    // };
    return {
      discussions: {
        list: null,
        total: 0
      },
      curPage: 0,
      size: 10
    };
  },
  mounted() {
    this.discussion_list();
  },

  methods: {
    toAdd() {
      this.$router
        .push({
          path: "add"
        })
        .catch(err => {
          err;
        });
    },
    async discussion_list() {
      try {
        const res = await get({
          url: urls.discussion_list,
          query: {
            page: this.curPage,
            page_size: this.size
          }
        });
        if (!res) {
          return;
        }
        res.list.forEach(item => {
          item.CreatedAt = formatTime(new Date(item.CreatedAt));
        });
        this.discussions = res;
        this.page = res.page;
      } catch (e) {
        console.log(e);
      }
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.discussion_list();
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
  font-family: "Microsoft YaHei", \5fae\8f6f\96c5\9ed1, "Helvetica",
    "sans-serif";
}
.u-forumli .j-link:hover {
  color: #1890ff;
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
