<template>
    <div class="chart" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
    name: "BarChart",
    props: ["barData", "barTitle"],
    data() {
        return {

        }
    },
    mounted() {
        let myCharts = echarts.init(this.$refs.chart)
        myCharts.setOption({
            title: {
                text: this.barTitle
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Direct',
                    type: 'bar',
                    barWidth: '60%',
                    data: this.barData
                }
            ]
        })
    },
}
</script>

<style scoped>
.chart {
    width: 100%;
    height: 300px;
}
</style>