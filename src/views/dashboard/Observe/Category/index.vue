<template>
    <el-card>
        <div class="category-header" slot="header">
            <span>销售额占比</span>
            <el-radio-group class="radio-group" v-model="radio1" style="float: right;" size="mini">
                <el-radio-button label="全部渠道"></el-radio-button>
                <el-radio-button label="线上"></el-radio-button>
                <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
        </div>
        <div style="height: 350px;">
            <div class="chart" ref="chart"></div>
        </div>
    </el-card>
</template>

<script>
import * as echarts from "echarts"

export default {
    name: "Category",
    data() {
        return {
            radio1: "全部渠道",
        }
    },
    mounted() {
        let peiChart = echarts.init(this.$refs.chart)
        peiChart.setOption({
            title: {
                text: 'Search Engine',
                subtext: '1048',
                left: 'center',
                top: 'center',
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: true,
                        position: 'outside',
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' }
                    ]
                }
            ]
        })
        // 绑定事件
        peiChart.on("mouseover", (param) => {
            const {value, name} = param.data
            peiChart.setOption({
                title: {
                    text: name,
                    subtext: value,
                }
            })
        })
    },
}
</script>

<style scoped>
.category-header {
    position: relative;
}

.radio-group {
    position: absolute;
    top: -4px;
    right: 0px;
}

.chart {
    width: 100%;
    height: 100%;
}
</style>