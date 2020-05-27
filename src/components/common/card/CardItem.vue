<template>
    <div class="card-item">
      <div class="box">
        <slot name="item-picture"></slot>
        <slot name="item-text"></slot>
        <slot name="item-button"></slot>
      </div>
    </div>
</template>

<script>
    export default {
        name: "CardItem"
    }
</script>

<style lang="less" scoped>
  .card-item {
    flex: 1;
    text-align: center;
    height: 300px;
    margin: 20px;
    width: 200px;
    img {
      height:200px;
      border-radius: 8%;
      margin-top: 20px;
    }
    .box {
      height: 300px;
      width: 200px;
      box-shadow: 0 0 10px rgba(100,100,100,0.15);
    }
  }

</style>
