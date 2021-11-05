import { createRouter, createWebHistory } from "vue-router";

// Clinic pages
import ClinicHome from '@/views/Clinic/ClinicHome.vue'
import ClinicOrderFormPage from '@/views/Clinic/ClinicOrderFormPage.vue'
import ClinicStockView from '@/views/Clinic/ClinicStockView.vue'
import ClinicSupplierView from '@/views/Clinic/ClinicSupplierView.vue'

// Supplier pages
import SupplierHome from '@/views/Supplier/SupplierHome.vue'
import SupplierOrders from '@/views/Supplier/SupplierOrders.vue'
import SupplierStockView from '@/views/Supplier/SupplierStockView.vue'

// Authentication pages
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "LogIn",
    component: LogIn,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/clinichome",
    name: "ClinicHome",
    component: ClinicHome,
  },
  {
    path: "/clinicorderformpage",
    name: "ClinicOrderFormPage",
    component: ClinicOrderFormPage,
  },
  {
    path: "/clinicstockview",
    name: "ClinicStockView",
    component: ClinicStockView,
  },
  {
    path: "/clinicsupplierview",
    name: "ClinicSupplierView",
    component: ClinicSupplierView,
  },
  {
    path: "/supplierhome",
    name: "SupplierHome",
    component: SupplierHome,
  },
  {
    path: "/supplierorders",
    name: "SupplierOrders",
    component: SupplierOrders,
  },
  {
    path: "/supplierstockview",
    name: "SupplierStockView",
    component: SupplierStockView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

