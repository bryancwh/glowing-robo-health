<template> 

<router-view/>

</template>

<script>
console.log("in App")
import {
  //   ScheduleComponent,
  Day,
  Week,
  Month,
  DragAndDrop,
  Resize,
} from "@syncfusion/ej2-vue-schedule";


export default {
  name: 'App',
  provide: {
    schedule: [Day, Week, Month, DragAndDrop, Resize],
  },

}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>