<template>
    <div class="chart" ref="chart">

    </div>
</template>

<script>
import * as echarts from "echarts"

export default {
    name: "ProgressChart",
    mounted() {
        let progressChart = echarts.init(this.$refs.chart)
        progressChart.setOption({
            xAxis: {
                show: false,
                min: 0, // 最小值与最大值
                max: 100,
            },
            yAxis: {
                show: false,
                type: "category", // 横着的
            },
            series: [
                {
                    type: "bar",
                    data: [78],
                    color: "yellowgreen",
                    barWidth: 10,
                    showBackground: true,
                    backgroundStyle: {
                        color: "#eee"
                    }
                }
            ],
            // 左右上下无缝
            grid: {
                left: 0, top: 0, right: 0, bottom: 0,
            }
        })
        window.addEventListener('resize',function () {//执行
            progressChart.resize();
        })
    },
}
</script>

<style>
.chart {
    width: 100%;
    height: 100%;
}
</style>