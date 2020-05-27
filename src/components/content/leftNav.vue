<template>
  <div>
    <template v-for="d in list">
      <el-submenu v-if="d.children" :index="d.index">
        <template slot="title">
          <template v-if="d.icon">
            <i v-bind:class="elicon+d.icon"></i>
          </template>
          <span>{{d.title}}</span>
        </template>
      <leftNav :list="d.children"></leftNav>
      </el-submenu>
      <el-menu-item
       v-else
       :index="d.index"
       @click="routeP(d.index)">
        <template slot="title">
          <template v-if="d.icon">
            <i v-bind:class="elicon+d.icon"></i>
          </template>
          <span>{{d.title}}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        elicon: 'el-icon-'
      }
    },
    methods: {
      routeP(index) {
        this.$router.push({
          name: 'content',
          params: {
            id: index
          },
        }).catch(err => {err})
      }
    },
    created() {
    }
  }
</script>