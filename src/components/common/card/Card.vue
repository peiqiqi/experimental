<template>
  <div id="card">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "Card"
    }
</script>

<style lang="less" scoped>

  #card{
    display: flex;
    margin: 30px;
  }

  .card-item{
    flex: 1;
    text-align: center;
    height: 250px;

    img {
      height:200px;
      border-radius: 8%;
    }
  }
</style>
