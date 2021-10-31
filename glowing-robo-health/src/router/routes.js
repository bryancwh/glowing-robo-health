import Appointment from "@/views/Appointment.vue";
import ClinicStockpile from "@/views/ClinicStockpile.vue";
import SupplierStockpile from "@/views/SupplierStockpile.vue";
import { createRouter, createWebHistory } from "vue-router";
import SupplierOrders from "@/views/SupplierOrders.vue";
import OrderFormTemp from "@/views/OrderFormTemp.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "Appointment",
  //   component: Appointment,
  // },
  {
    path: "/ClinicStockpile",
    name: "ClinicStockpile",
    component: ClinicStockpile,
  },
  {
    path: "/SupplierOrders",
    name: "SupplierOrders",
    component: SupplierOrders,
  },
  {
    path: "/SupplierStockpile",
    name: "SupplierStockpile",
    component: SupplierStockpile,
  },
  {
    path: "/OrderFormTemp",
    name: "OrderFormTemp",
    component: OrderFormTemp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
