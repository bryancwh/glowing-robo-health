<template>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <AddAppointment/>
  <AppointmentTable/>
  <!-- <AppointmentTable2/> -->
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AppointmentTable from '@/components/AppointmentTable.vue'
// import AppointmentTable2 from '@/components/AppointmentTable2.vue'
import AddAppointment from '@/components/AddAppointment.vue'

export default {
  name: 'App',
  components: {
    AppointmentTable,
    AddAppointment,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>