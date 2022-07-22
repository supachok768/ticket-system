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
