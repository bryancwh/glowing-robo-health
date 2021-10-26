import DashboardLayout from "@/views/Layout/DashboardLayout.vue";

import Dashboard from "@/views/Dashboard.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      }
    ],
  },
];

export default routes;
