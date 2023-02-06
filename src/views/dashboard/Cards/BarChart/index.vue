<template>
    <div class="chart" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts"

export default {
    name: "BarChart",
    mounted() {
        let lineChart = echarts.init(this.$refs.chart)
        lineChart.setOption({
            xAxis: {
                show: false,
                type: "category",
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            },
            yAxis: {
                show: false,
            },
            series: [
                {
                    type: "bar",
                    data: [10, 7, 33, 12, 88, 9, 34, 31, 12, 8, 66, 3],
                }
            ],
            // 左右上下无缝
            grid: {
                left: 0, top: 0, right: 0, bottom: 0,
            },
            // 提示详情
            tooltip: {

            }
        })
    },
}
</script>

<style scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>