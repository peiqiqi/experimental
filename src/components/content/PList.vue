<template>
  <el-container>
    <el-aside width="300px">
      <el-menu
        text-color="black"
        :router="true"
        active-text-color="#ffd04b"
        :default-active="active"
      >
        <!--激活菜单颜色-->
        <leftNav :list="list"></leftNav>
      </el-menu>
    </el-aside>
    <div style="flex:1;padding:20px">
      <Media :pdfUrl="pdfUrl" />
    </div>
    <!-- <el-main>
      <router-view></router-view>
    </el-main> -->
  </el-container>
</template>

<script>
import leftNav from "content/leftNav";
import Media from "content/Media";

import { get, post, postForm, put } from "@/services/request";
import urls from "@/services/urls";
import event from "@/utils/event";

export default {
  name: "PList",
  data() {
    return {
      list: [],
      elicon: "el-icon-",
      pdfUrl: "",
      active: "0"
    };
  },
  components: {
    leftNav,
    Media
  },
  mounted() {
    this.courseware_tree();
  },
  methods: {
    async courseware_tree() {
      try {
        const res = await get({
          url: urls.courseware_tree
        });
        if (!res) {
          return;
        }
        var compare = function(x, y) {
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          } else {
            return 0;
          }
        };
        const digui = arr => {
          return arr
            .sort((a, b) => compare(a.ID, b.ID))
            .map(item => {
              if (item.children) {
                return digui(item.children);
              }
              return item;
            });
        };
        const list = res.filter(item => item.children.length);
        list.forEach(item => {
          if (item.children) {
            digui(item.children);
          }
        });

        this.list = list;
        const temp_children = list[0].children;
        const temp = temp_children[0].children
          ? temp_children[0].children[0]
          : temp_children[0];
        this.pdfUrl = temp.url;
        this.active = "" + temp.ID;
        this.$router
          .push({
            name: "content",
            params: {
              id: temp.ID
            }
          })
          .catch(err => {
            err;
          });
        // this.form = {
        //   title: "",
        //   desc: ""
        // };
      } catch (e) {
        console.log(e);
      }
    }
    // active() {
    //   if (this.$route.params.id) {
    //     return this.$route.params.id.toString();
    //   } else {
    //     return "4";
    //   }
    // }
  },

  created() {
    event.on("menu-change", d => {
      this.pdfUrl = d.url;
      this.active = "" + d.ID;
      this.$router
        .push({
          name: "content",
          params: {
            id: d.ID
          }
        })
        .catch(err => {
          err;
        });
    });
  }
};
</script>

<style lang="less" scoped>
el-container {
  height: 100%;
}
.el-aside {
  // margin-left: -20px;
  background-color: #ffffff;
  .el-menu {
    border-right: none;
  }
}
</style>
