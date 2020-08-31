<template>
  <div id="app">
    <h2>主讲教师</h2>
    <Card>
      <CardItem v-for="item in mainTeacherList" :key="item.ID">
        <img slot="item-picture" :src="item.avatar" />
        <div slot="item-text">{{ item.name }}</div>
        <div slot="item-button">
          <el-button type="text" class="button" @click="open(item.link)"
            >更多资料</el-button
          >
        </div>
      </CardItem>
    </Card>
    <h2>辅助教师</h2>
    <Card>
      <CardItem style="overflow: hidden"> </CardItem>
      <CardItem v-for="item in subTeacherList" :key="item.ID">
        <img slot="item-picture" :src="item.avatar" />
        <div slot="item-text">{{ item.name }}</div>
        <div slot="item-button">
          <el-button type="text" class="button" @click="open(item.link)"
            >更多资料</el-button
          >
        </div>
      </CardItem>

      <CardItem style="overflow: hidden"> </CardItem>
    </Card>
  </div>
</template>

<script>
import Card from "../common/card/Card";
import CardItem from "../common/card/CardItem";
import { get, post, postForm, put } from "@/services/request";
import urls from "@/services/urls";
export default {
  components: {
    Card,
    CardItem
  },
  async mounted() {
    const res = await get({
      url: urls.teacher
    });
    if (!res) {
      return;
    }
    const { list } = res;
    this.mainTeacherList = list.filter(item => item.is_main === 1);
    this.subTeacherList = list.filter(item => item.is_main === 0);
  },
  data() {
    return {
      mainTeacherList: [],
      subTeacherList: []
    };
  },
  methods: {
    open(link) {
      window.open(link);
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  text-align: center;
}
h2 {
  font-size: 30px;
  letter-spacing: 4px;
}
</style>
