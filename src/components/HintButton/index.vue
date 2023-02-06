<template>
    <!-- 这他妈的根本不用 但是需要学习二次封装 -->
    <a :title="title" style="">
        <el-button type="" v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
</template>

<script>
export default {
    name: 'HintButton',
    props: ['title'],
}
</script>

<style>

</style>