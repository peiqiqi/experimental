<template>
  <el-row :gutter="20" style="margin-top: 10px;">
    <el-col :span="12" :offset="6">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="desc" required>
          <el-input type="textarea" :rows="15" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">立即发表</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { get, post, postForm, put } from "@/services/request";
import urls from "@/services/urls";
export default {
  data() {
    return {
      form: {
        title: "",
        desc: ""
      },
      rules: {
        title: {
          required: true,
          message: "请输入标题"
        },
        desc: {
          required: true,
          message: "请输入内容"
        }
      }
    };
  },
  methods: {
    async discussion_add() {
      try {
        const res = await post({
          url: urls.discussion_add,
          body: {
            title: this.form.title,
            content: this.form.desc
          }
        });
        if (!res) {
          return;
        }
        this.$message.success("发表成功!");
        // this.form = {
        //   title: "",
        //   desc: ""
        // };
      } catch (e) {
        console.log(e);
      }
    },
    onSubmit(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.discussion_add();
        } else {
          console.log("输入有误!!");
          return false;
        }
      });
    }
  }
};
</script>
