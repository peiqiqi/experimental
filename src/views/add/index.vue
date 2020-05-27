<template>
  <el-row :gutter="20" style="margin-top: 10px;">
    <el-col :span="12" :offset="6">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title" required>
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="desc" required>
          <el-input
            type="textarea"
            :rows="5"
            v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(form)">立即发表</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          desc: ''
        },
        rules: {
          title: {
            required: true,
            message: '请输入标题'
          },
          desc: {
            required: true,
            message: '请输入内容'
          }
        }
      }
    },
    methods: {
      onSubmit(form) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            alert('发表成功!');
          } else {
            console.log('输入有误!!');
            return false;
          }
        });
      }
    }
  }
</script>