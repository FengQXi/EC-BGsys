<template>
    <div>
        <el-card class="box-card" style="margin: 10px 0px;">
            <!--   @tab-click="handleClick" -->
            <el-tabs v-model="activeName">
                <el-tab-pane label="销售额" name="销售额">
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <bar-chart barTitle="销售额趋势" :barData="[10, 100, 200, 334, 390, 330, 220, 40, 325, 210, 55, 230]"></bar-chart>
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
                </el-tab-pane>
                <el-tab-pane label="访问量" name="访问量">
                    <el-row :gutter="10">
                        <el-col :span="18">
                            <bar-chart barTitle="访问量趋势" :barData="[130, 43, 55, 200, 432, 220, 89, 330, 220, 40, 325, 210]"></bar-chart>
                        </el-col>
                        <el-col :span="6">123</el-col>
                    </el-row></el-tab-pane>
            </el-tabs>
            <div class="card-right">
                <span>今日</span>
                <span>本周</span>
                <span>本月</span>
                <span>本年</span>
                <!-- v-model="value1" -->
                <el-date-picker type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                    size="mini" style="width: 200px;">
                </el-date-picker>
            </div>
        </el-card>
    </div>
</template>

<script>
import BarChart from "./BarChart"

export default {
    name: "Sale",
    components: {
        BarChart,
    },
    data() {
        return {
            activeName: "销售额",
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
    top: 26px;
}

.card-right span {
    margin: 0 10px;
    font-size: 14px;
}
</style>