import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import Appointment from "@/views/Appointment.vue";
import Dashboard from "@/views/Dashboard.vue";
import Resource from "@/views/ResourceView.vue";
import Calendar from "@/views/Calendar.vue"

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
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
  }
];

export default routes;
