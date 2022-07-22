import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/Main.vue";
import DashboardOverview1 from "../views/dashboard-overview-1/Main.vue";
import CrudDataList from "../views/crud-data-list/Main.vue";
import CrudForm from "../views/crud-form/Main.vue";
import Login from "../views/login/Main.vue";
import Register from "../views/register/Main.vue";
import ErrorPage from "../views/error-page/Main.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "dashboard-overview-1",
        component: DashboardOverview1,
      },
      {
        path: "crud-data-list",
        name: "crud-data-list",
        component: CrudDataList,
      },
      {
        path: "crud-form",
        name: "crud-form",
        component: CrudForm,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/error-page",
    name: "error-page",
    component: ErrorPage,
  },
  {
    path: "/:pathMatch(.*)*",
    component: ErrorPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
