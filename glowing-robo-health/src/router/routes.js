import Appointment from "@/views/Appointment.vue";
import ClinicStockpile from "@/views/ClinicStockpile.vue";
import SupplierStockpile from "@/views/SupplierStockpile.vue";
import { createRouter, createWebHistory } from "vue-router";
import SupplierOrders from "@/views/SupplierOrders.vue";
import OrderFormTemp from "@/views/OrderFormTemp.vue";
import ViewSupplier from "@/views/ViewSupplier.vue";
import SupplierStockFull from "@/components/SupplierStockFull.vue";
import Auth from "@/components/auth.vue";
import Signup from "@/components/signup.vue";

const routes = [
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
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
  {
    path: "/ViewSupplier",
    name: "ViewSupplier",
    component: ViewSupplier,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

