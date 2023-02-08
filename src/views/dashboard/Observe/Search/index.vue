<template>
    <div>
        <el-card>
            <div class="search-header" slot="header">
                <span>线上热门搜索</span>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-circle-check">蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div>
                <el-row :gutter="10">
                    <el-col :span="12">
                        <line-chart></line-chart>
                    </el-col>
                    <el-col :span="12">
                        <line-chart></line-chart>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column label="排名" width="80" type="index">
                </el-table-column>
                <el-table-column label="搜索关键字">
                </el-table-column>
                <el-table-column label="用户数" sortable>
                </el-table-column>
                <el-table-column label="周涨幅" sortable>
                </el-table-column>
            </el-table>
            <el-pagination class="search-pagination" layout="prev, pager, next" :total="1000">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import LineChart from "./LineChart"

export default {
    name: "Search",
    components: {
        LineChart,
    },
    data() {
        return {
            tableData: [{}]
        }
    },
}
</script>

<style scoped>
.search-header {
    display: flex;
    justify-content: space-between;
}

.search-pagination {
    text-align: right;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}
</style>