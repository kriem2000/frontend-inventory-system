import { createRouter, createWebHistory } from "vue-router";
import signIn from "@/components/signIn";
import home from "@/views/Home";

const routes = [
  {
    path: "/",
    name: "signIn",
    component: signIn,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/:catchAll(.*)*",
    redirect: { name: "home" },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
