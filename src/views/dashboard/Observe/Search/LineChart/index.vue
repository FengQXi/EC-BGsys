<template>
    <div>
        <div class="search-chart-header">
            <span>搜索用户数</span>
            <svg-icon class="svg-icon" icon-class="info"></svg-icon>
        </div>
        <div class="search-chart-main">
            <span>12321</span>
            <span>17.1</span>
            <i class="el-icon-caret-top"></i>
            <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="search-chart-footer">
            <div class="search-chart">
                <line-chart0></line-chart0>
            </div>
        </div>
    </div>
</template>

<script>
import LineChart0 from "@/views/dashboard/Cards/LineChart"
export default {
    name: "LineChart",
    components: {
        LineChart0
    },
    
}
</script>

<style scoped>
.search-chart-header span {
    margin-right: 20px;
    color: #d9d9d9;
    font-size: 14px;
}

.search-chart-main {
    margin: 10px 0;
}

.search-chart-main span {
    margin-right: 20px;
    font-size: 14px;
}

.search-chart {
    width: 100%;
    height: 50px;
}

.el-icon-caret-top {
    color: red
}

.el-icon-caret-bottom {
    color: green
}
</style>