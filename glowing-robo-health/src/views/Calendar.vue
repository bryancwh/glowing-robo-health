<template>
  <div id="app">
    <h1>Calendar</h1>
    <div class="container">
      <div class="calendar-controls">
        <div class="box">
          <div class="field-period">
            <label class="label-period">Period</label>
            <div class="control">
              <div class="select">
                <select v-model="displayPeriodUom">
                  <option> month </option>
                  <option>week</option>
                  <option>year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="box">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input v-model="newItemTitle" class="input" type="text" />
            </div>
          </div>

          <div class="field">
            <label class="label">Start date</label>
            <div class="control">
              <input v-model="newItemStartDate" class="input" type="date" />
            </div>
          </div>

          <div class="field">
            <label class="label">End date</label>
            <div class="control">
              <input v-model="newItemEndDate" class="input" type="date" />
            </div>
          </div>
          <br />
          <button class="button is-info" @click="clickTestAddItem">
            Add Item
          </button>
        </div>
      </div>
      <div class="calendar-parent">
        <calendar-view
          :items="items"
          :show-date="showDate"
          :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
          :enable-drag-drop="true"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :show-times="true"
          :date-classes="myDateClasses"
          :display-period-uom="displayPeriodUom"
          :period-changed-callback="periodChanged"
          @date-selection-start="setSelection"
          @date-selection="setSelection"
          @date-selection-finish="finishSelection"
          @click-date="onClickDay"
          @click-item="onClickItem"
          currentPeriodLabel="Today"
        >
          <template #header="{ headerProps }">
            <calendar-view-header
              :header-props="headerProps"
              @input="setShowDate"
            />
          </template>
        </calendar-view>
      </div>
    </div>
  </div>
</template>
<script>
// Load CSS from the published version
import "../../node_modules/vue-simple-calendar/dist/style.css";
import "../../node_modules/vue-simple-calendar/static/css/default.css";
// import "../../node_modules/vue-simple-calendar/static/css/holidays-us.css";
// Load CSS from the local repo
//require("../../vue-simple-calendar/static/css/default.css")
//require("../../vue-simple-calendar/static/css/holidays-us.css")
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMath,
} from "vue-simple-calendar"; // published version
//} from "../../vue-simple-calendar/src/components/bundle.js" // local repo
export default {
  name: "App",
  components: {
    CalendarView,
    CalendarViewHeader,
  },
  data() {
    return {
      /* Show the current month, and give it some fake items to show */
      showDate: this.thisMonth(1),
      // message: "",
      disablePast: false,
      disableFuture: false,
      displayPeriodUom: "month",
      selectionStart: null,
      selectionEnd: null,
      newItemTitle: "",
      newItemStartDate: "",
      newItemEndDate: "",
      // useDefaultTheme: true,
      // useHolidayTheme: true,
      useTodayIcons: false,
      items: [
        {
          id: "e0",
          startDate: "2018-01-05",
        },
        {
          id: "e1",
          startDate: this.thisMonth(15, 18, 30),
        },
        {
          id: "e2",
          startDate: this.thisMonth(15),
          title: "Single-day item with a long title",
        },
        {
          id: "e3",
          startDate: this.thisMonth(7, 9, 25),
          endDate: this.thisMonth(10, 16, 30),
          title: "Multi-day item with a long title and times",
        },
        {
          id: "e4",
          startDate: this.thisMonth(20),
          title: "My Birthday!",
          classes: "birthday",
          url: "https://en.wikipedia.org/wiki/Birthday",
        },
        {
          id: "e5",
          startDate: this.thisMonth(5),
          endDate: this.thisMonth(12),
          title: "Multi-day item",
          classes: "purple",
        },
        {
          id: "foo",
          startDate: this.thisMonth(29),
          title: "Same day 1",
        },
        {
          id: "e6",
          startDate: this.thisMonth(29),
          title: "Same day 2",
          classes: "orange",
        },
        {
          id: "e7",
          startDate: this.thisMonth(29),
          title: "Same day 3",
        },
        {
          id: "e8",
          startDate: this.thisMonth(29),
          title: "Same day 4",
          classes: "orange",
        },
        {
          id: "e9",
          startDate: this.thisMonth(29),
          title: "Same day 5",
        },
        {
          id: "e10",
          startDate: this.thisMonth(29),
          title: "Same day 6",
          classes: "orange",
        },
        {
          id: "e11",
          startDate: this.thisMonth(29),
          title: "Same day 7",
        },
      ],
    };
  },
  computed: {
    userLocale() {
      return CalendarMath.getDefaultBrowserLocale;
    },
    dayNames() {
      return CalendarMath.getFormattedWeekdayNames(this.userLocale, "long", 0);
    },
    myDateClasses() {
      const o = {};
      const theFirst = this.thisMonth(1);
      const ides = [2, 4, 6, 9].includes(theFirst.getMonth()) ? 15 : 13;
      const idesDate = this.thisMonth(ides);
      o[CalendarMath.isoYearMonthDay(idesDate)] = "ides";
      o[CalendarMath.isoYearMonthDay(this.thisMonth(21))] = [
        "do-you-remember",
        "the-21st",
      ];
      return o;
    },
  },
  mounted() {
    this.newItemStartDate = CalendarMath.isoYearMonthDay(CalendarMath.today());
    this.newItemEndDate = CalendarMath.isoYearMonthDay(CalendarMath.today());
  },
  methods: {
    periodChanged() {
      // range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading items, etc.)
      //console.log(eventSource)
      //console.log(range)
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickDay(d) {
      this.selectionStart = null;
      this.selectionEnd = null;
      this.message = `You clicked: ${d.toLocaleDateString()}`;
    },
    onClickItem(e) {
      this.message = `You clicked: ${e.title}`;
      console.log("clicked!");
    },
    // onHover(e) {
    //   console.log("hover", e);
    // },
    setShowDate(d) {
      this.message = `Changing calendar view to ${d.toLocaleDateString()}`;
      this.showDate = d;
    },
    setSelection(dateRange) {
      this.selectionEnd = dateRange[1];
      this.selectionStart = dateRange[0];
    },
    finishSelection(dateRange) {
      this.setSelection(dateRange);
      this.message = `You selected: ${this.selectionStart.toLocaleDateString()} -${this.selectionEnd.toLocaleDateString()}`;
    },
    clickTestAddItem() {
      this.items.push({
        startDate: this.newItemStartDate,
        endDate: this.newItemEndDate,
        title: this.newItemTitle,
        id:
          "e" +
          Math.random()
            .toString(36)
            .substr(2, 10),
      });
      this.message = "You added a calendar item!";
    },
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
  left: 270px;
  top: 120px;
  text-align: left;
}
.container {
  width: 75%;
  height: 65%;
  /* border: 5px outset white; */
  border-radius: 25px;
  border: 2px solid white;
  padding: 20px;
  background: white;
  position: relative;
  left: 270px;
  top: 130px;
  display: flex;
  margin: 0px 0px;
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
#app {
  width: 100%;
  height: 100%;
}
.label-period {
  padding: 20px;
  font-size: 25px;
}
.field-period {
  padding: 20px;
}
.calendar-controls {
  height: 100%;
  width: 20%;
  margin-right: 1rem;
  /* min-width: 14rem;
  max-width: 14rem; */
  background-color: white;
  float: left;
}
.calendar-parent {
  height: 100%;
  width: 85%;
  float: left;
  /* display: flex; */
  /* flex-direction: column; */
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
  /* position: relative;
  left: 300px; */
}
/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
  min-height: 6rem;
}
/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
/* Add some styling for items tagged with the "birthday" class */
.theme-default .cv-item.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}
.theme-default .cv-item.birthday::before {
  content: "\1F382"; /* Birthday cake */
  margin-right: 0.5em;
}
</style>
