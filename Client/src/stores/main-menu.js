import { defineStore } from "pinia";

export const useMainMenuStore = defineStore("mainMenu", {
  state: () => ({
    menu: [
      "START MENU",
      {
        icon: "HomeIcon",
        pageName: "dashboard",
        title: "Dashboard",
        subMenu: [
          {
            icon: "",
            pageName: "dashboard",
            title: "Overview",
          },
        ],
      },
      // "USER MANAGEMENT",
      // {
      //   icon: "",
      //   pageName: "user-list",
      //   title: "User",
      // },
      // {
      //   icon: "",
      //   pageName: "user-detail",
      //   params: {
      //     mode: "edit",
      //     id: 0,
      //   },
      //   title: "User Detail",
      // },
      "TICKET MANAGEMENT",
      // {
      //   icon: "",
      //   pageName: "ticket-list",
      //   title: "Ticket",
      // },
      // {
      //   icon: "",
      //   params: {
      //     mode: "edit",
      //     id: 0,
      //   },
      //   pageName: "ticket-detail",
      //   title: "Ticket Detail",
      // },
      {
        icon: "",
        pageName: "my-ticket",
        title: "My Ticket",
      },
      {
        icon: "",
        pageName: "ticket-buy",
        title: "Buy Ticket",
      },
      {
        icon: "",
        pageName: "my-issue",
        title: "My Issue",
      },
      "TASK",
      // {
      //   icon: "",
      //   pageName: "task",
      //   title: "Task",
      // },
      {
        icon: "",
        pageName: "task-type",
        params: { type: 'me' },
        title: "Task assign to me",
      },
      {
        icon: "",
        pageName: "task-conversation",
        params: { id: 'test' },
        title: "Task Conversation",
      },
      // "EXAMPLES",
      // {
      //   icon: "UnlockIcon",
      //   pageName: "login",
      //   title: "Login",
      // },
      // {
      //   icon: "InboxIcon",
      //   pageName: "register",
      //   title: "Register",
      // },
      // {
      //   icon: "HardDriveIcon",
      //   pageName: "error-page",
      //   title: "Error Page",
      // },
    ],
  }),
});
