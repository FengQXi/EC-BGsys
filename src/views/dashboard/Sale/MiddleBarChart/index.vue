<template>
    <el-row :gutter="10">
        <el-col :span="18">
            <div class="chart" ref="chart"></div>
        </el-col>
        <el-col :span="6">
            <h3>门店销售额排名</h3>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </el-col>
    </el-row>
</template>

<script>
import * as echarts from "echarts"

export default {
    name: "MiddleBarChart",
    props: ["barData", "barTitle"],
    data() {
        return {
            myCharts: null,
        }
    },
    mounted() {
        // 初始化实例到vc上
        this.myCharts = echarts.init(this.$refs.chart)
        this.myCharts.setOption({
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
.el-col {
    height: 300px;
}
.chart {
    width: 100%;
    height: 100%;
}
</style>