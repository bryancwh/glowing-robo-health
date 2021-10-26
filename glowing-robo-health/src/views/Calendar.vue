<template>
  <div id="app">
    <h1>Calendar</h1>
    <div class="container">
      <ejs-schedule
        height="550px"
        width="100%"
        :selectedDate="selectedDate"
        :eventSettings="eventSettings"
        currentView="Month"
      >
        <e-views>
          <e-view option="Day"></e-view>
          <e-view option="Week" startHour="07:00" endHour="24:00"></e-view>
          <e-view option="Month" showWeekend="false"></e-view>
        </e-views>
        <e-resources>
          <e-resource
            field="OwnerId"
            title="Owner"
            name="Owners"
            :dataSource="ownerDataSource"
            textField="OwnerText"
            idField="Id"
            colorField="OwnerColor"
          >
          </e-resource>
        </e-resources>
      </ejs-schedule>
    </div>
  </div>
</template>
<script>
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
} from "@syncfusion/ej2-vue-schedule";
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
const db = getFirestore(firebaseApp);

export default {
  name: "Calendar",
  // Declaring component and its directives
  components: {
    "ejs-schedule": ScheduleComponent,
    "e-views": ViewsDirective,
    "e-view": ViewDirective,
    "e-resources": ResourcesDirective,
    "e-resource": ResourceDirective,
  },
  // Bound properties declaration
  data() {
    return {
      selectedDate: new Date(),
      allowMultiple: true,
      ownerDataSource: [
        { OwnerText: "Doctor1", Id: 1, OwnerColor: "#ffaa00" },
        { OwnerText: "Doctor2", Id: 2, OwnerColor: "#f8a398" },
        { OwnerText: "Doctor3", Id: 3, OwnerColor: "#7499e1" },
      ],
      eventSettings: {
        dataSource: [
          {
            Id: 1,
            Subject: "Surgery - Andrew",
            StartTime: new Date(2021, 9, 10, 9, 0),
            EndTime: new Date(2021, 9, 10, 10, 0),
            OwnerId: 2,
          },
          {
            Id: 2,
            Subject: "Consulting - John",
            StartTime: new Date(2021, 9, 11, 10, 0),
            EndTime: new Date(2021, 9, 11, 11, 30),
            OwnerId: 3,
          },
          {
            Id: 3,
            Subject: "Therapy - Robert",
            StartTime: new Date(2021, 9, 12, 11, 30),
            EndTime: new Date(2021, 9, 13, 12, 30),
            OwnerId: 1,
          },
        ],
      },
    };
  },
  methods: {
    async getEvents() {
      console.log(this.eventSettings.dataSource);
      console.log("in getData");
      let z = await getDocs(collection(db, "schedules"));
      console.log("done getting data");
      console.log("before retrieval", this.events);
      z.forEach((doc) => {
        console.log(doc.data());
        let schedule = doc.data();
        let doctor_id = schedule.doctor_id;
        //   let patient_id = schedule.patient_id;
        let start_time = schedule.appointment_start_time.toDate();
        let end_time = schedule.appointment_end_time.toDate();
        let description = schedule.label;
        this.eventSettings.dataSource.push({
          Id: doctor_id,
          Subject: description,
          StartTime: start_time,
          EndTime: end_time,
          OwnerId: 1,
          // patientId: patient_id,
        });
      });
      console.log(this.eventSettings.dataSource);
    },
  },
  async mounted() {
    await this.getEvents();
    // let events = this.eventSettings.dataSource;
    console.log(this.eventSettings.dataSource, "in on mounted");
  },
};
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
html,
body {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  background-color: #f7fcff;
  overflow-x: hidden;
  overflow-y: hidden;
}
h1 {
  display: block;
  font-size: 40px;
  font-weight: initial;
  margin-block-start: 0em;
  margin-block-end: 0em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  position: relative;
  left: 270px;
  top: 50px;
  text-align: left;
}
.container {
  width: 75%;
  height: 75%;
  /* border: 5px outset white; */
  border-radius: 25px;
  border: 2px solid white;
  padding: 20px;
  background: white;
  position: relative;
  left: 270px;
  top: 60px;
  display: flex;
  margin: 0px 0px;
}
</style>
