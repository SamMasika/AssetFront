<template>
<v-container fluid>
    <v-card class="rounded-xl" elevation="0">
        <v-card-text>

            <apexchart type="pie" height="412" :options="chartOptions" :series="chartSeries" />
        </v-card-text>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios'
import VueApexCharts from 'vue-apexcharts'

export default {
    name: 'PieChart',
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            chartOptions: {
                title: {
                    text: 'Asset Status',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                    },
                },
                labels: [] ,// add labels property here
                colors: [ '#1B5E20', '#00838F','#FF5722'],
            },
            chartSeries: []
        }
    },
    mounted() {
        axios.get('/status')
            .then(response => {
                const chartData = response.data;
                this.chartOptions = {
                    title: {
                        text: 'Asset Status'
                    },
                    labels: chartData.map(item => item.name)
                };
                this.chartSeries = chartData.map(item => item.count);
            })
            .catch(error => {
                console.log(error);
            });
    }

}
</script>
