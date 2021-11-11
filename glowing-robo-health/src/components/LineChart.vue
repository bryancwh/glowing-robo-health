<template>
  <div>
    <canvas id="planet-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'LineChart',
  data() {
    return {
      planetChartData: {
        type: "line",
        data: {
          labels: ["2019-07-01", "2019-07-02", "2019-07-03", "2019-07-04", "2019-07-05", "2019-07-06", "2019-07-07", "2019-07-08"],
          datasets: [
            {
              label: "Number of orders",
              data: [2, 5, 7, 1, 23, 12, 10, 5],
              // data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
              backgroundColor: "#1890ff30",
              borderColor: "#1890ff",
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25
                }
              }
            ]
          }
        }
      }
    }
  },
  mounted() {
    const ctx = document.getElementById('planet-chart');
    new Chart(ctx, this.planetChartData);
  }
}
</script>