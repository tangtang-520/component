import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/index.vue"),
  },

  {
    path: "/inputlist",
    name: "InputList",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/inputlist/inputlist.vue"
      ),
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/inputlist/list.vue"),
  },
  {
    path: "/time",
    name: "Time",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/time/index.vue"),
  },
  {
    path: "/treeSelect",
    name: "TreeSelect",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/treeSelect/index.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
