<template>
    <div>
        <!-- 
            inline: 代表行内表单
         -->
        <el-form :disabled="show" :inline="true" class="demo-form-inline" :model="cForm">
            <el-form-item label="一级分类">
                <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1">
                    <el-option :label="c1.name" :value="c1.id" v-for="(c1, index) in list1" :key="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2">
                    <el-option :label="c2.name" :value="c2.id" v-for="(c2, index) in list2" :key="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3">
                    <el-option :label="c3.name" :value="c3.id" v-for="(c3, index) in list3" :key="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'CategorySelect',
    props:['show'],
    data() {
        return {
            // 一级分类数据
            list1: [],
            list2: [],
            list3: [],
            cForm: {
                category1Id: '',
                category2Id: '',
                category3Id: '',
            }
        }
    },
    methods: {
        async getCategory1List() {
            let result = await this.$API.attr.reqCategory1List()
            if(result.code == 200){
                this.list1 = result.data
            }
        },
        // 当category1Id发生改变
        async handler1() {
            this.list2 = []
            this.list3 = []
            this.cForm.category2Id = ''
            this.cForm.category3Id = ''
            this.$emit('removeList')

            const {category1Id} = this.cForm
            let result = await this.$API.attr.reqCategory2List(category1Id)
            // console.log(result);
            if(result.code == 200){
                this.list2 = result.data
            }
        },
        // 当category2Id发生改变
        async handler2() {
            this.list3 = []
            this.cForm.category3Id = ''
            this.$emit('removeList')

            const {category2Id} = this.cForm
            let result = await this.$API.attr.reqCategory3List(category2Id)
            // console.log(result);
            if(result.code == 200){
                this.list3 = result.data
            }
        },
        handler3() {
            this.$emit('getCategoryId', this.cForm)
        }
    },
    mounted() {
        // 挂载完毕要获取一级分类
        this.getCategory1List()
    },
}
</script>

<style>

</style>