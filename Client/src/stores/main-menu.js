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
            pageName: "dashboard-overview-1",
            title: "Overview 1",
          },
        ],
      },
      "USER MANAGEMENT",
      {
        icon: "",
        pageName: "user-list",
        title: "User",
      },
      {
        icon: "",
        pageName: "user-form",
        title: "User Detail",
      },
      "TICKET MANAGEMENT",
      {
        icon: "",
        pageName: "ticket-list",
        title: "Ticket",
      },
      {
        icon: "",
        params: { id: 'test' },
        pageName: "ticket-detail",
        title: "Ticket Detail",
      },
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
      {
        icon: "",
        params: { id: 'test' },
        pageName: "issue-detail",
        title: "Issue Detail",
      },
      "TASK",
      {
        icon: "",
        pageName: "task",
        title: "Task",
      },
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
      "EXAMPLES",
      {
        icon: "EditIcon",
        pageName: "crud",
        title: "Crud",
        subMenu: [
          {
            icon: "",
            pageName: "crud-data-list",
            title: "Data List",
          },
          {
            icon: "",
            pageName: "crud-form",
            title: "Form",
          },
        ],
      },
      {
        icon: "UnlockIcon",
        pageName: "login",
        title: "Login",
      },
      {
        icon: "InboxIcon",
        pageName: "register",
        title: "Register",
      },
      {
        icon: "HardDriveIcon",
        pageName: "error-page",
        title: "Error Page",
      },
    ],
  }),
});
