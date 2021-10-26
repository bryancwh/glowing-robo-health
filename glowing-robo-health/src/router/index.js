import Appointment from "@/views/Appointment.vue";
import Resource from "@/resourceView.vue";
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
  {
    path: "/resource",
    name: "Resource",
    component: Resource,
  }
];

export default routes;