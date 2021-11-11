import { createRouter, createWebHistory } from "vue-router";

// Clinic pages
import ClinicHome from '@/views/Clinic/ClinicHome.vue'
import ClinicOrderFormPage from '@/views/Clinic/ClinicOrderFormPage.vue'
import ClinicStockView from '@/views/Clinic/ClinicStockView.vue'
import ClinicSupplierView from '@/views/Clinic/ClinicSupplierView.vue'
import ClinicOrders from '@/views/Clinic/ClinicOrders.vue'

// Supplier pages
import SupplierHome from '@/views/Supplier/SupplierHome.vue'
import SupplierOrders from '@/views/Supplier/SupplierOrders.vue'
import SupplierStockView from '@/views/Supplier/SupplierStockView.vue'

// Authentication pages
import LogIn from "@/views/LogIn.vue";
import SignUp from "@/views/SignUp.vue";
// import LogOut from "@/components/LogOut.vue";

import Calendar from"../components/Calendar.vue";

const routes = [
  {
    path: "/calendar",
    name: "calendar",
    component: Calendar,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "LogIn",
    component: LogIn,
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: "/logout",
  //   name: "LogOut",
  //   component: LogOut,
  // },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/clinichome",
    name: "ClinicHome",
    component: ClinicHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/clinicorderformpage",
    name: "ClinicOrderFormPage",
    component: ClinicOrderFormPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/clinicstockview",
    name: "ClinicStockView",
    component: ClinicStockView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/clinicsupplierview",
    name: "ClinicSupplierView",
    component: ClinicSupplierView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/clinicorders",
    name: "ClinicOrders",
    component: ClinicOrders,
  },
  {
    path: "/supplierhome",
    name: "SupplierHome",
    component: SupplierHome,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/supplierorders",
    name: "SupplierOrders",
    component: SupplierOrders,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/supplierstockview",
    name: "SupplierStockView",
    component: SupplierStockView,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

