<template>
<v-container fluid>
<v-card class="rounded-xl" elevation="0"  >
    <v-card-text >
  <div id="asset-chart" ></div>
    </v-card-text>
</v-card>
</v-container>
</template>

<script>
import axios from 'axios';
import ApexCharts from 'apexcharts';

export default {
  name: 'AssetChart',
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar',
          height:"400",
        },
        title: {
          text: 'Asset Categories',
          align: 'center',
          style: {
            fontSize: '20px',
          },
        },
        colors: ['#00838F', '#FF9800', '#900C3F'],
        xaxis: {
          categories: [],
        },
        series: [{
          name: 'Assets',
          data: [],
        }],
      },
    };
  },
  // mounted() {
  //   new ApexCharts(this.$el.querySelector('div'), this.chartOptions).render()
  // },
  created() {
    axios.get('/asset-category')
      .then((response) => {
        const data = response.data;
        const categories = [];
        const assetsPerCategory = [];
        for (const category in data) {
          categories.push(category);
          assetsPerCategory.push(data[category]);
        }
        this.chartOptions.xaxis.categories = categories;
        this.chartOptions.series[0].data = assetsPerCategory;
        const chart = new ApexCharts(document.querySelector('#asset-chart'), this.chartOptions);
        chart.render();
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
