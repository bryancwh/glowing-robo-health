import Appointment from "@/views/Appointment.vue";
import ClinicStockpile from "@/views/ClinicStockpile.vue";
import { createRouter, createWebHistory } from 'vue-router'



const routes = [

  {
    path: "/",
    name: "Appointment",
    component: Appointment,
  },
  {
    path: "/ClinicStockpile",
    name: "ClinicStockpile",
    component: "ClinicStockpile",
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default routes;
