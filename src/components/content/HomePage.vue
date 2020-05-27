<template>
  <div>
    <span class="top" ><a href="#" class="topa">Top</a></span>
  <!--走马灯-->
  <el-carousel :height="bannerHeight + 'px'" interval="5000" :width="bannerWidth + 'px'">
    <el-carousel-item v-for="item in imgList" :key="item">
      <img :src="item.idView" alt="">
    </el-carousel-item>
  </el-carousel>

  <!--平滑跳转到指定位置-->
  <h5 @click="jump">更多</h5>

  <div style="height: 90px;" id="box"></div>

  <h1>课程简介</h1>
  <div class="box1">
    <div class="text">
      <p>
        《试验统计学》是数理统计的原理和方法在生物科学研究中的应用，是动、植物生产类各专业的一门重要的专业基础课。本课程包括田间试验与统计分析两大部分。田间试验部分有制定试验方案，田间试验设计的原则与常用方法，分析误差来源及提高试验效率的途径等内容；统计部分含描述统计与统计推断，介绍总体与样本的关系，统计假设测验，方差分析，χ2测验，常用试验设计的统计分析，两类变数的直线回归与相关等。
      </p>
    </div>
  </div>

  <h1>课程</h1>
  <el-row>
    <el-col class="ParentCard">
      <el-card v-show="isshow" :body-style="{ padding: '0px'}" shadow="hover"  class="KCard" :class="[isshow?'leftMove':'']">
      <div class="avatar_box">
        <img src="@/assets/img/KCard.png" class="image">
      </div>
    </el-card>
      <div v-show="isshow" class="right" :class="[isshow?'leftMove':'']">
        <h2 index="plist">理论课程</h2>
        <h4 >more</h4>
      </div>
      <el-card v-show="isshow" :body-style="{ padding: '0px'}" shadow="hover"  class="SCard" :class="[isshow?'rightMove':'']">
        <div class="avatar_box">
          <img src="@/assets/img/SCard.png" class="image">
        </div>
      </el-card>
      <div v-show="isshow" class="left" :class="[isshow?'rightMove':'']">
        <h2 >试验课程</h2>
        <h4 >more</h4>
      </div>
    </el-col>
  </el-row>

    <el-footer class="footer">
      <div  class="footrest">
        <span>雨纷纷</span>
        <el-divider direction="vertical"></el-divider>
        <span>旧故里</span>
        <el-divider direction="vertical"></el-divider>
        <span>草木深</span>
      </div>
    </el-footer>
  </div>
</template>

<script>
    export default {
      name: "HomePage",
      data(){
        return{
          isshow: false,
          scrollTop: document.documentElement.scrollTop, //获取当前页面的滚动条纵坐标位置
          isDown: false,
          isDown2: true,
          // 图片地址数组
          imgList:[
            {id: 0, idView:require('@/assets/img/首页1.jpg')},
            {id: 0, idView:require('@/assets/img/首页2.jpg')},
          ],
          // 图片父容器高度
          bannerHeight :630,
          // 浏览器宽度
          screenWidth :0,
        }
      },
      mounted() {
        let that = this
        window.addEventListener('scroll', function(event){
          let nowTop = document.documentElement.scrollTop
          // 向下滚动
          if (nowTop < 613) {
            that.isDown2 = true
            if (that.scrollTop < nowTop) {
              that.isDown = true
            }
          }
          if (nowTop > 613) {
            that.isDown2 = false
            that.isDown = false
          }
          if (nowTop > 750) {
            that.isshow = true
          }
          that.scrollTop = nowTop
        })
      },
      watch: {
        isDown: function(val) {
          let that = this
          if (val == true && that.isDown2 == true) {
            window.scrollTo({
              top: 750,
              behavior: "smooth"
            });

          }
        }
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        jump(id) {
          document.getElementById("box").scrollIntoView({
            behavior: "smooth", // 平滑过渡
            block: "start" // 上边框与视窗顶部平齐。默认值
          });
        },
        //保存链接的激活状态
        saveNavState(activePath) {
          window.sessionStorage.setItem('activePath', activePath)
          this.activePath = activePath
        }
      }
    }
</script>

<style lang="less" scoped>
  @-webkit-keyframes leftAnime {
    from, 60%, to {animation-timing-function: cubic-bezier(0, 0, 0, 0);}
    0% {opacity: 0;transform: translate3d(0, 100px, 0);}
    60% {opacity: 0.5;transform: translate3d(0, 0, 0);}
    100% {opacity: 1;transform: none;}
  }

  @-webkit-keyframes rightAnime {
    from, 60%, to {animation-timing-function: cubic-bezier(0, 0, 0, 0);}
    0% {opacity: 0;transform: translate3d(0, -100px, 0);}
    60% {opacity: 0.5;transform: translate3d(0, 0, 0);}
    100% {opacity: 1;transform: none;}
  }

  .top {
    margin: 5px;
    height: 40px;
    width: 40px;
    background-color: #186164;
    position: fixed; //不随滚动
    bottom: 0;
    right: 0;
    border-radius: 8%;
    text-align: center;
    font-size: 18px;
    overflow: hidden;

    .topa {
      color: white;
      position: absolute;
      left: 3px;
      top: 20%;
      text-decoration: none; //去除下划线
    }
  }

  .leftMove {
    animation: leftAnime 2s;
  }

  .rightMove {
    animation: rightAnime 2s;
  }

  h5{
    text-align:center;
    color: silver;
    margin-top: 10px;
  }

  .el-carousel {
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    img{
      height: 105%;
    }
  }
  img{
    /*设置图片宽度和浏览器宽度一致*/
    width: 100%;
    height: inherit;
  }

  h1{
    text-align:center;
    font-size: 40px;
    font-family: "微软雅黑 Light";
    letter-spacing: 5px;
  }
  .box1 {
    height: auto;
    background-color: rgba(211, 211, 211, 0.17);
    border-radius: 4px;
    margin: 50px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    .text{
      margin: 30px;
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
      text-indent: 2em;
      line-height: 40px;
      font-size:20px;
      letter-spacing: 2px;
    }
  }
  .box-card {
    height: 300px;
    background-color: #ff7b74;
    margin: 20px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .ParentCard{
    position: relative;
    height: 600px;
    font-family: "微软雅黑";

    .SCard{
      position: absolute;
      width: 700px;
      height: 400px;
      margin:20px;
    }

    .KCard {
      position: absolute;
      right: 0;
      top:25%;
      width: 700px;
      height: 400px;
      margin:20px;
    }
    h2{
      line-height: 5px;
      letter-spacing: 5px;
    }
    h4{
      color: silver;
      font-family:"等线 Light"
    }
    .right {
      position: absolute;
      top:7%;
      right: 23%;
      text-align: center;
    }
    .left {
      position: absolute;
      top:80%;
      left: 20%;
      text-align: center;
    }
  }

  .footer{
    margin-left: -20px;
    margin-right: -20px;
    margin-top: 40px;
    background-color: black;
    color: white;
    text-align: center;
    .footrest{
      margin-top: 15px;
    }
  }

</style>
