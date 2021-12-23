import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/orderConfirm",
    component: () => import("../views/OrderConfirm.vue"),
  },
  {
    path: "/",
    component: () => import("../views/Top.vue"),
  },
  {
    path: "/registerUser",
    component: () => import("../views/registerUser.vue"),
  },
  {
    path: "/loginUser",
    component: () => import("../views/loginUser.vue"),
  },
  {
    path: "/logoutUser",
    component: () => import("../views/logoutUser.vue"),
  },
  {
    path: "/itemList",
    component: () => import("../views/itemList.vue"),
  },
  {
    path: "/cartList",
    component: () => import("../views/cartList.vue"),
  },
  {
    path: "/itemDtail/:id",
    component: () => import("../views/itemDetail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
