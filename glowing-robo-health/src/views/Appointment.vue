<template>
  <div>
    <AddAppointment />
    <AppointmentTable />
  </div>
</template>

<script>
import AddAppointment from "../components/AddAppointment.vue";
import AppointmentTable from "../components/AppointmentTable.vue";

export default {
  name: "Appointment",
  components: {
    AddAppointment,
    AppointmentTable,
  },
};
</script>

<style></style>
