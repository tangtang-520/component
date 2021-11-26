import Vue from "vue";
import VueRouter from "vue-router";
import List from "../views/list.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "List",
    redirect: "/list",
    component: List,
  },

  {
    path: "/inputlist",
    name: "InputList",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/inputlist.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/list.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
