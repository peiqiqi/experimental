<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div class="wrap">
        <div class="detail-wrap">
          <h3 class="title">{{ discussion.title }}</h3>
          <div class="content">
            <p>{{ discussion.content }}</p>
          </div>
          <div class="infobar">
            <div class="infoBox">
              <span class="name">‭{{ discussion.author }}</span>
              <span class="time">{{ discussion.CreatedAt }}</span>
            </div>
          </div>
        </div>
        <div class="reply-wrap">
          <div class="reply-info">
            <h4>共 {{ replyList.total }} 个回复</h4>
          </div>
          <div class="reply-list">
            <div
              class="reply-detail"
              v-for="(item, idx) of replyList.list"
              :key="idx"
            >
              <div class="content">
                <p>{{ item.content }}<br /></p>
              </div>
              <div class="replybar">
                <span class="name" title="">{{ item.author }}</span>
                <span class="time">
                  {{ item.CreatedAt }}
                </span>
              </div>
            </div>
          </div>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"
            :total="replyList.total"
          >
          </el-pagination>
        </div>
        <div class="reply-form" style="margin-top: 10px;">
          <el-form :model="form" label-width="80px">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.reply"
              size=""
            >
            </el-input>
            <div style="margin-top: 10px; float: right;">
              <el-button type="primary" @click="discussion_reply_add"
                >发表回复</el-button
              >
            </div>
          </el-form>
        </div>
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
    const item = {
      author: "张三",
      content: "测试",
      CreatedAt: "2020年5月1日 21:28"
    };
    return {
      pid: 0,
      replyList: {
        list: Array(10).fill(item),
        total: 0
      },
      discussion: {
        // title: "不同设计方差分析的比较",
        // content:
        //   "按照上课所学，分别从线性模型、df、SS描述完全随机、随机区组以及拉丁方的区别",
        // author: "张三",
        // CreatedAt: "2020年5月1日 21:15"
      },
      form: {
        reply: ""
      }
    };
  },
  created() {
    this.pid = this.$route.params.pid;
  },
  mounted() {
    this.discussion_detail();
    this.discussion_reply();
  },
  methods: {
    async discussion_detail() {
      try {
        const res = await get({
          url: urls.discussion_detail,
          param: {
            id: this.pid
          }
        });
        if (!res) {
          return;
        }
        res.CreatedAt = formatTime(new Date(res.CreatedAt));

        this.discussion = res;
      } catch (e) {
        console.log(e);
      }
    },
    async discussion_reply() {
      try {
        const res = await get({
          url: urls.discussion_reply,
          query: {
            dis_id: this.pid
          }
        });
        if (!res) {
          return;
        }
        res.list.forEach(item => {
          item.CreatedAt = formatTime(new Date(item.CreatedAt));
        });
        this.replyList = res;
      } catch (e) {
        console.log(e);
      }
    },
    async discussion_reply_add() {
      try {
        const res = await post({
          url: urls.discussion_reply,
          body: {
            discussion_id: this.pid - 0,
            content: this.form.reply
          }
        });
        if (!res) {
          return;
        }
        this.form.reply = "";
        this.discussion_reply();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  margin-bottom: 200px;
}
.detail-wrap {
  background-color: #f8f8f8;
  padding: 10px 20px;
}
.title {
  max-width: 68%;
  word-break: break-word;
  position: relative;
  line-height: 1.5;
  font-weight: normal;
}
h3 {
  font-size: 1.33em;
}
.detail-wrap .content {
  padding-top: 10px;
  text-align: left;
  color: #666;
}
.infobar {
  padding: 20px 0;
}
.infobar div {
  float: left;
}
.reply-info {
  border-bottom: 1px solid #eee;
}
.reply-detail {
  border-bottom: 1px solid #eee;
  width: 100%;
  padding-top: 15px;
  position: relative;
}
.replybar {
  padding: 10px 0;
}
.content {
  color: #666;
}
.name {
  color: #00c758;
}
.time {
  padding: 0 10px;
}
</style>
