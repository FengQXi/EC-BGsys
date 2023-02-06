<template>
    <div>
        <el-card>
            <div class="cards-header">
                <span>{{ title }}</span>
                <svg-icon class="svg-icon" icon-class="info" ></svg-icon>
            </div>
            <div class="cards-content">{{ count }}</div>
            <div class="cards-charts">
                <slot name="charts"></slot>
            </div>
            <div class="cards-footer">
                <slot name="footer"></slot>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Detail",
    props: ['title', 'count']
}
</script>

<style scoped>
    .cards-header {
        display: flex;
        justify-content: space-between;
        color: #d9d9d9
    }
    .svg-icon {
        /* 图标上下居中 */
        margin: auto 0;
    }
    .cards-content {
        font-size: 30px;
        padding: 10px 0px;
    }
    .cards-charts {
        height: 50px;
    }
    .cards-footer {
        border-top: 1px solid #eee;
        padding-top: 10px;
    }
</style>