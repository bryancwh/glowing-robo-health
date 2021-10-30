import Appointment from "@/views/Appointment.vue";
import { createRouter, createWebHistory } from 'vue-router'



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

];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default routes;
