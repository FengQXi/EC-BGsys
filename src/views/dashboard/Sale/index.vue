<template>
    <div>
        <el-card class="box-card" style="margin: 10px 0px;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="销售额" name="sales">
                    <middle-bar-chart ref="sales" barTitle="销售额趋势"
                        :barData="[130, 43, 55, 200, 432, 220, 89, 330, 220, 40, 325, 210]"></middle-bar-chart>
                </el-tab-pane>
                <el-tab-pane label="访问量" name="visits">
                    <middle-bar-chart ref="visits" barTitle="访问量趋势"
                        :barData="[30, 143, 55, 200, 432, 110, 89, 56, 220, 300, 325, 110]"></middle-bar-chart>
                </el-tab-pane>
            </el-tabs>
            <div class="card-right">
                <el-button class="card-right-bt" type="text" @click="setThisDay">今日</el-button>
                <el-button class="card-right-bt" type="text" @click="setThisWeek">本周</el-button>
                <el-button class="card-right-bt" type="text" @click="setThisMonth">本月</el-button>
                <el-button class="card-right-bt" type="text" @click="setThisYear">本年</el-button>
                <el-date-picker v-model="date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"
                    size="mini" style="width: 250px;">
                </el-date-picker>
            </div>
        </el-card>
    </div>
</template>

<script>
import dayjs from "dayjs"
import MiddleBarChart from "./MiddleBarChart"

export default {
    name: "Sale",
    components: {
        MiddleBarChart,
    },
    data() {
        return {
            activeName: "sales",
            date: [], // 日历的数据
        }
    },
    methods: {
        handleClick(tab, event) {
            // tab切换前 其余tab组件是display：none状态
            this.$nextTick(() => {
                this.$refs[tab.name].myCharts.resize()
            })
        },
        setThisDay() {
            const thisDay = dayjs().format("YYYY-MM-DD")
            this.date = [thisDay, thisDay]
        },
        setThisWeek() {
            const start = dayjs().day(1).format("YYYY-MM-DD")
            const end = dayjs().day(7).format("YYYY-MM-DD")
            this.date = [start, end]
        },
        setThisMonth() {
            const star = dayjs().startOf("month").format("YYYY-MM-DD")
            const end = dayjs().endOf("month").format("YYYY-MM-DD")
            console.log(star, end);
            this.date = [star, end]
        },
        setThisYear() {
            const star = dayjs().startOf("year").format("YYYY-MM-DD")
            const end = dayjs().endOf("year").format("YYYY-MM-DD")
            console.log(star, end);
            this.date = [star, end]
        }
    },
}
</script>

<style scoped>
.box-card {
    position: relative;
}

.card-right {
    position: absolute;
    right: 20px;
    top: 20px;
}

.card-right-bt {
    margin: 0 10px;
    font-size: 14px;
}
</style>