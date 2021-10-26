import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import Appointment from "@/views/Appointment.vue";

import Dashboard from "@/views/Dashboard.vue";

const routes = [
  // {
  //   path: "/",
  //   component: DashboardLayout,
  //   redirect: "/dashboard",
  //   children: [
  //     {
  //       path: "dashboard",
  //       name: "Dashboard",
  //       component: Dashboard,
  //     },
  //   ],
  // },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/appointment",
    name: "Appointment",
    component: Appointment,
  },
];

export default routes;
