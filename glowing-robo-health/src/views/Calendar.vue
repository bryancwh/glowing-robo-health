<template>
  <div class="outer">
    <h1>Calendar</h1>
    <div class="container">
      <div class="vue-root">
        <smart-scheduler id="scheduler"></smart-scheduler>
      </div>
    </div>
  </div>
</template>

<script>
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.scheduler.js";
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "Calendar",
  data() {
    return {
      events: [],
      // doctors: [],
    };
  },
  methods: {
    async getEvents() {
      console.log(this.events);
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

        this.events.push({
          label: description,
          doctorId: doctor_id,
          // patientId: patient_id,
          dateStart: start_time,
          dateEnd: end_time,
        });
      });
      console.log("all events", this.events);
    },
  },
  async mounted() {
    await this.getEvents();
    console.log("in on mounted");
    const data = this.events;
    window.Smart(
      "#scheduler",
      class {
        get properties() {
          return {
            //Properties
            view: "month",
            dataSource: data,
            views: ["week", "month", "day"],
            hideAllDay: true,
            hourStart: 3,
            hourEnd: 18,
            nonworkingDays: [0, 6],
            nonworkingHours: [
              [0, 5],
              [14, 18],
            ],
            hideNonworkingWeekdays: false,
            firstDayOfWeek: 1,
            viewSelectorType: "auto",
            // groups: ["doctorId"],
            timelineDayScale: "halfHour",
            timelineHeaderFormatFunction: (
              date,
              orientation,
              isHeaderDetails,
              dateValue
            ) => {
              if (orientation === "horizontal") {
                const segments = dateValue.split(" ");
                if (segments.length === 2) {
                  return `<div>${segments[1]}</div><div class="header-day-number">${segments[0]}</div>`;
                }
              }
              return dateValue;
            },
            resources: [
              {
                label: "Doctors",
                value: "doctorId",
                dataSource: [
                  {
                    label: "Andrew Johnson",
                    id: 1,
                    speciality: "Anesthesiology",
                    image: "./../../../demos/images/phonebook/andrew.png",
                    backgroundColor: "#28a745",
                  },
                  {
                    label: "Steven Mcilroy",
                    id: 2,
                    speciality: "Dermatology",
                    image: "./../../../demos/images/phonebook/steven.png",
                    backgroundColor: "#8f73af",
                  },
                  {
                    label: "Michael Dawson",
                    id: 3,
                    speciality: "Neurology",
                    image: "./../../../demos/images/phonebook/michael.png",
                    backgroundColor: "#BF8F00",
                  },
                ],
              },
            ],
          };
        }
      }
    );

    window.onload = function() {
      const template = document.createElement("template");

      template.id = "groupTemplate";
      template.innerHTML = `
          <div class="custom-group-content">
            <img src="{{image}}"></img>
            <div class="details">
                <div class="name">{{label}}</div>
                <div class="speciality">{{speciality}}</div>
            </div>
          </div>
          `;

      document.body.appendChild(template);
      document.querySelector("smart-scheduler").groupTemplate = template.id;
    };
  },
};
</script>

<style>
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
  left: 320px;
  top: 130px;
}

.outer {
  width: 100%;
  height: 100%;
}

.container {
  width: 75%;
  height: 67%;
  /* border: 5px outset white; */
  border-radius: 25px;
  border: 2px solid white;
  padding: 20px;
  background: white;
  position: relative;
  left: 320px;
  top: 150px;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

#app,
.vue-root {
  width: 100%;
  height: 100%;
  background-color: #dbe9f1;
}

.smart-scheduler {
  width: 100%;
  height: 100%;
  --smart-scheduler-timeline-header-horizontal-group-size: 100px;
  --smart-scheduler-timeline-header-horizontal-cells-size: 50px;
  --smart-scheduler-timeline-cell-height: 40px;
  --smart-primary: black;
  --smart-surface: white;
  --smart-ui-state-hover: rgb(236, 236, 236);
  --smart-ui-state-active: rgb(248, 202, 202);
  --smart-font-size: 11;
  --smart-font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  --smart-scheduler-timeline-weekend-color: rgb(228, 228, 228);
  --smart-scheduler-event-label-font-weight: 5;
}

.smart-scheduler .custom-group-content {
  display: flex;
  align-items: center;
  grid-column-gap: 10px;
}

.smart-scheduler .custom-group-content .details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  grid-row-gap: 5px;
}

.smart-scheduler .custom-group-content .details .name {
  font-size: 18px;
}

.smart-scheduler .header-day-number {
  font-size: 18px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>
