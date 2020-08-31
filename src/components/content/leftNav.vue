<template>
  <div>
    <template v-for="d in list">
      <el-submenu v-if="d.children" :index="getCurIdx(d)" :key="getCurKey(d)">
        <template slot="title">
          <template v-if="d.icon">
            <i v-bind:class="elicon + 'takeaway-box'"></i>
          </template>
          <span>{{ d.name }}</span>
        </template>
        <leftNav :list="d.children"></leftNav>
      </el-submenu>
      <el-menu-item v-else :key="d.ID" :index="'' + d.ID" @click="routeP(d)">
        <template slot="title">
          <template v-if="d.icon">
            <i v-bind:class="elicon + 'data-analysis'"></i>
          </template>
          <span>{{ d.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import event from "@/utils/event";

export default {
  name: "leftNav",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      elicon: "el-icon-"
    };
  },

  methods: {
    getCurIdx(d) {
      return d.ID ? "" + d.ID : "" + d.cate_id;
    },
    getCurKey(d) {
      return d.ID || d.cate_id;
    },
    routeP(d) {
      // console.log("==", d);s
      event.emit("menu-change", d);

      // this.$router
      //   .push({
      //     name: "content",
      //     params: {
      //       id: ID
      //     }
      //   })
      //   .catch(err => {
      //     err;
      //   });
    }
  },
  created() {}
};
</script>
