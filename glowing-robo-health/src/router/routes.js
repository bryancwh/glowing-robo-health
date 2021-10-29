import Appointment from "@/views/Appointment.vue";

import Resource from "@/views/ResourceView.vue";

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
    name: "Appointment",
    component: Appointment,
  },
  {
    path: "/resource",
    name: "Resource",
    component: Resource,
  },

];

export default routes;
