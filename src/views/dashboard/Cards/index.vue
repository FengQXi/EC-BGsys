<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="6">
                <detail title="总销售额" count="￥126560">
                    <template slot="charts">
                        <span>周同比&nbsp;56.67%</span>
                        <i class="el-icon-caret-top"></i>
                        &nbsp;
                        <span>日同比&nbsp;19.96%</span>
                        <i class="el-icon-caret-bottom"></i>
                    </template>
                    <template slot="footer">
                        日销售额&nbsp;￥12423
                    </template>
                </detail>
            </el-col>
            <el-col :span="6">
                <detail title="访问量" count="88460">
                    <template slot="charts">
                        <line-chart/>
                    </template>
                    <template slot="footer">
                        日访问量&nbsp;1234
                    </template>
                </detail>
            </el-col>
            <el-col :span="6">
                <detail title="支付笔数" count="88460">
                    <template slot="charts">
                        <bar-chart/>
                    </template>
                    <template slot="footer">
                        转化率&nbsp;65%
                    </template>
                </detail>
            </el-col>
            <el-col :span="6">
                <detail title="运营活动效果" count="78%">
                    <template slot="charts">
                        <process-chart/>
                    </template>
                    <template slot="footer">
                        <span>周同比&nbsp;56.67%</span>
                        <i class="el-icon-caret-top"></i>
                        &nbsp;
                        <span>日同比&nbsp;19.96%</span>
                        <i class="el-icon-caret-bottom"></i>
                    </template>
                </detail>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Detail from "./Detail"
import LineChart from "./LineChart"
import BarChart from "./BarChart"
import ProcessChart from "./ProgressChart"

export default {
    name: "Cards",
    components: {
        Detail, LineChart, BarChart, ProcessChart
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
    .el-icon-caret-top {
        color: red
    }
    .el-icon-caret-bottom {
        color: green
    }
</style>