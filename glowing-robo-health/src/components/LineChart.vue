<template>
  <div>
    <canvas id="order-chart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'LineChart',
  data() {
    return {
      orderChartData: {
        type: "line",
        data: {
          labels: ["2021-07-01", "2021-07-02", "2021-07-03", "2021-07-04", "2021-07-05", "2021-07-06", "2021-07-07", "2021-07-08"],
          datasets: [
            {
              label: "Number of orders",
              data: [2, 5, 7, 1, 23, 12, 10, 5],
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
    const ctx = document.getElementById('order-chart');
    new Chart(ctx, this.orderChartData);
  }
}
</script>