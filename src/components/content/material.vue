<template>
  <div>
    <div style="display:flex;">
      <div style="width:200px;padding-left:10px">
        <p
          style="cursor:pointer"
          @click="toggle(item)"
          v-for="item in list"
          :key="item.ID"
        >
          <span :style="cur.ID == item.ID ? 'color:#ffd04b' : ''">{{
            item.title
          }}</span>
        </p>
      </div>
      <div style="padding:20px;flex:1;">
        <iframe
          v-if="cur.link.includes('pdf')"
          :src="cur.link"
          style="width:90%;height:auto;min-height:660px"
        ></iframe>
        <iframe
          v-if="/doc|ppt/.test(cur.link)"
          :src="viewUrl + cur.link"
          style="width:90%;height:auto;min-height:660px"
        ></iframe>
        <img
          v-if="/png|jpg|jpeg/.test(cur.link)"
          :src="cur.link"
          style="width:90%;height:auto;min-height:660px"
        />
        <el-button
          type="primary"
          v-if="/zip/.test(cur.link)"
          icon="el-icon-download"
        >
          <a style="color:#fff" :href="cur.link" @click.stop="">下载</a>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, postForm, put } from "@/services/request";
import urls from "@/services/urls";
export default {
  name: "Material",
  props: {
    pdfUrl: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      list: [],
      viewUrl: "https://view.officeapps.live.com/op/view.aspx?src=",
      cur: {}
    };
  },
  mounted() {
    this.getMaterial();
  },
  methods: {
    async getMaterial() {
      const res = await get({
        url: urls.material
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
      const { list } = res;
      list.sort((a, b) => compare(a.sort_id, b.sort_id));
      this.list = list;
      this.cur = list[0];
    },
    toggle(data) {
      this.cur = data;
    }
  }
};
</script>
