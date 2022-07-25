import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/Main.vue";
import DashboardOverview1 from "../views/dashboard-overview-1/Main.vue";

//TicketManagement
import MyTicket from "../views/ticket-management/MyTicket.vue"
import MyIssue from "../views/ticket-management/MyIssue.vue"
import TicketBuy from "../views/ticket-management/TicketBuy.vue"
import TicketList from "../views/ticket-management/TicketList.vue"
import TicketDetail from "../views/ticket-management/TicketDetail.vue"

//UserManagement
import UserList from "../views/user-management/UserList.vue"
import UserDetail from "../views/user-management/UserDetail.vue"

//Task
import Task from "../views/task/Task.vue"
import Conversation from "../views/task/TaskConversation.vue"



//Example View
import Login from "../views/auth/login/Main.vue";
import Register from "../views/auth/register/Main.vue";
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
    ],
  },
  {
    path: "/users",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "user-list",
        component: UserList,
      },
      {
        path: ":mode/:id?",
        name: "user-detail",
        component: UserDetail,
      },
    ],
  },
  {
    path: "/ticket",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "my-ticket",
        component: MyTicket,
      },
      {
        path: "issue",
        name: "my-issue",
        component: MyIssue,
      },
      {
        path: "buy",
        name: "ticket-buy",
        component: TicketBuy,
      },
      {
        path: "list",
        name: "ticket-list",
        component: TicketList,
      },
      {
        path: ":mode/:id?",
        name: "ticket-detail",
        component: TicketDetail,
      },
    ],
  },
  {
    path: "/task",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "task",
        component: Task,
      },
      {
        path: ":type",
        name: "task-type",
        component: Task,
      },
      {
        path: "conversation/:id",
        name: "task-conversation",
        component: Conversation,
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
