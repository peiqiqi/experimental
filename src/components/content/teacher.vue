<template>
  <div id="app">
    <h2>主讲教师</h2>
    <Card>
      <CardItem>
        <img slot="item-picture"  src="@/assets/img/teacher/刘桂富.png">
        <div slot="item-text">刘桂富</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c585a18653/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture"  src="@/assets/img/teacher/冯发强.png">
        <div slot="item-text">冯发强</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c585a186343/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture"  src="@/assets/img/teacher/黄君.png">
        <div slot="item-text">黄君</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c585a64187/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture" src="@/assets/img/teacher/陈志雄.png">
        <div slot="item-text">陈志雄</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c585a18651/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture"  src="@/assets/img/teacher/杨美艳.png">
        <div slot="item-text">杨美艳</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c592a64454/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture"  src="@/assets/img/teacher/吴锦文.png">
        <div slot="item-text">吴锦文</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c592a64879/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
    </Card>
    <h2>辅助教师</h2>
    <Card>
      <CardItem style="overflow: hidden">
      </CardItem>
      <CardItem >
        <img slot="item-picture"  src="@/assets/img/teacher/宋瑞凤.jpg">
        <div slot="item-text">宋瑞凤</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c1189a18714/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture" src="@/assets/img/teacher/张秀香.jpg">
        <div slot="item-text">张秀香</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c1189a65165/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem>
        <img slot="item-picture"  src="@/assets/img/teacher/朱海涛.png">
        <div slot="item-text">朱海涛</div>
        <div slot="item-button">
          <el-button type="text" class="button" onclick= "window.open('https://nxy.scau.edu.cn/2016/1209/c1189a18645/page.htm')">更多资料</el-button>
        </div>
      </CardItem>
      <CardItem style="overflow: hidden">
      </CardItem>
    </Card>
  </div>

</template>

<script>
  import Card from "../common/card/Card";
  import CardItem from "../common/card/CardItem";
  export default {
    components:{
      Card,
      CardItem
    },
    data() {
      return {
      };

    }
  }
</script>

<style lang="less" scoped>
  #app{
    text-align: center;
  }
    h2{
      font-size: 30px;
      letter-spacing: 4px;
    }
</style>
