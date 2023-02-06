<template>
    <div class="chart" ref="chart">

    </div>
</template>

<script>
import * as echarts from "echarts"

export default {
    name: "LineChart",
    mounted() {
        let lineChart = echarts.init(this.$refs.chart)
        lineChart.setOption({
            xAxis: {
                show: false,
                type: "category",
            },
            yAxis: {
                show: false,
            },
            series: [
                {
                    type: "line",
                    data: [10, 7, 33, 12, 88, 9],
                    smooth: true, // 曲线平滑
                    symbol: 'none', //拐点样式
                    lineStyle: {
                        color: "purple"
                    },
                    // 设置渐变
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'purple' // 0% 处的颜色
                            }, {
                                offset: 1, color: '#fff' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }
            ],
            // 左右上下无缝
            grid: {
                left: 0, top: 0, right: 0, bottom: 0,
            }
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