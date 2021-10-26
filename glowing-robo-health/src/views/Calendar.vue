<template>
  <div id="app">
    <ejs-schedule
      height="550px"
      width="100%"
      :selectedDate="selectedDate"
      :eventSettings="eventSettings"
    >
      <e-views>
        <e-view option="Day"></e-view>
        <e-view option="Week" startHour="07:00" endHour="15:00"></e-view>
        <e-view option="WorkWeek" startHour="10:00" endHour="18:00"></e-view>
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
      selectedDate: new Date(2021, 7, 12),
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
};
</script>
