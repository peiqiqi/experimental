import Vue from "vue";
import VueRouter from "vue-router";
import TabBar from "../components/common/tabbar/TabBar";
import PList from "../components/content/PList";
import HomePage from "../components/content/HomePage";
import Media from "../components/content/Media";
import announce from "../components/content/announce";
import teacher from "../components/content/teacher";
import outline from "../components/content/outline";
import material from "../components/content/material";

import testlist from "../components/content/testlist";
import forum from "views/forum";
import details from "views/details";
import add from "views/add";
import login from "../components/content/login";
import register from "../components/content/register";

// import Home from '../views/Home.vue'

//1.安装VueRouter
Vue.use(VueRouter);

//2.配置路由信息
const routes = [];

//3.创建路由对象
const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: TabBar,
      redirect: "/homepage",
      children: [
        {
          path: "/plist",
          component: PList,
          children: [{ path: ":id", name: "content", component: Media }]
        },
        { path: "/homepage", component: HomePage },
        { path: "/announce", component: announce },
        { path: "/teacher", component: teacher },
        { path: "/outline", component: outline },
        { path: "/material", component: material },

        { path: "/testlist", component: testlist },
        { path: "/forum", component: forum },
        { path: "details/:pid", name: "details", component: details },
        { path: "add", component: add },
        { path: "login", component: login },
        { path: "register", component: register }
      ]
    }
  ]
});

//4.导出
export default router;
