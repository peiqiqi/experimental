<template>
  <el-container>
    <img src="@/assets/img/课程简介1.png" alt="" />
    <el-main>
      <div id="textDiv">
        <P>
          《试验统计学》是数理统计的原理和方法在生物科学研究中的应用，是动、植物生产类各专业的一门重要的专业基础课。本课程包括田间试验与统计分析两大部分。田间试验部分有制定试验方案，田间试验设计的原则与常用方法，分析误差来源及提高试验效率的途径等内容；统计部分含描述统计与统计推断，介绍总体与样本的关系，统计假设测验，方差分析，χ2测验，常用试验设计的统计分析，两类变数的直线回归与相关等。
        </P>
        <p>
          通过该课程的教学，使学生掌握试验统计的基本概念、基本方法、了解基本原理；培养学生科学地进行试验设计，合理地整理、分析所收集的资料，从中获得符合生物学规律的信息；并为后续专业课程的学习打下坚实的统计学基础。
        </p>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "Announce"
};
</script>

<style lang="less" scoped>
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
  margin-top: -40px;
}
#textDiv {
  width: 800px;
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  text-indent: 2em;
  line-height: 40px;
  font-size: 20px;

  position: absolute;
  right: 15%;
  top: 30%;
}
</style>
