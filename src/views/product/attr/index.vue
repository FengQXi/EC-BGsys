<template>
    <div class="app-container">
        <el-card>
            <category-select :show="!isShowTable" @getCategoryId="getCategoryId" @removeList="removeList"></category-select>
        </el-card>
        <el-card style="margin-top: 20px;">
            <!-- 表格 -->
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-icon-plus" :disabled="!attrList.length" style="margin-bottom: 20px;"
                    @click="isShowTable = false">添加属性</el-button>

                <el-table :data="attrList" style="width: 100%" border>
                    <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>

                    <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>

                    <el-table-column label="属性值列表">
                        <template slot-scope="{row, $index}">
                            <el-tag style="margin-right: 10px" type="success" v-for="attrValue in row.attrValueList"
                                :key="attrValue.id">{{ attrValue.valueName }}</el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="150px">
                        <template slot-scope="{row, $index}">
                            <el-button type="warning" icon="el-icon-edit" size="mini" style="margin-right: 10px" @click="updateAttr(row)">
                            </el-button>
                            <!-- 气泡确认框 -->
                            <el-popconfirm :title="`确定删除${row.attrName}属性吗？`" @onConfirm="deleteAttr(row.id)">
                                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 修改添加 -->
            <div v-show="!isShowTable">
                <el-form :inline="true" :model="attrInfo" label-width="80px">
                    <el-form-item label="属性名">
                        <el-input v-model="attrInfo.attrName" placeholder="请输入属性名"></el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
                    :disabled="!attrInfo.attrName.trim()">添加属性值</el-button>
                <el-button @click="cancelAdd">取消</el-button>

                <el-table border style="margin: 20px 0;" :data="attrInfo.attrValueList">
                    <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>

                    <el-table-column label="属性值名称">
                        <template slot-scope="{row, $index}">
                            <el-input :ref="$index" v-if="row.flag" @blur="toLook(row)" v-model="row.valueName"
                                placeholder="请输入属性值名称" size="mini"></el-input>
                            <span v-else @click="toEdit(row, $index)" style="display: block">{{ row.valueName }}</span>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <!-- 气泡确认框 -->
                            <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>

                <el-button :disabled="!attrInfo.attrValueList.length" type="primary" @click="addOrUpdateAttr">保存</el-button>
                <el-button @click="cancelAdd">取消</el-button>
            </div>
        </el-card>

    </div>
</template>

<script>
import CategorySelect from '@/components/CategorySelect/index.vue'
// 按需引入lodash当中的深拷贝
// import cloneDeep from 'lodash/cloneDeep'

export default {
    name: "Attr",
    data() {
        return {
            isShowTable: true,
            category1Id: '',
            category2Id: '',
            category3Id: '',
            attrList: [],
            attrInfo: {// 收集新增和修改的属性
                attrName: "",
                attrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueName: "string"
                    // }
                ],
                categoryId: 0, // 三级分类的id
                categoryLevel: 3,
                // id: 0
            },
        }
    },
    components: { CategorySelect },
    methods: {
        removeList() {
            this.attrList = []
        },
        getCategoryId(cForm){
            // console.log(cForm);
            const { category1Id, category2Id, category3Id } = cForm
            this.category1Id = category1Id
            this.category2Id = category2Id
            this.category3Id = category3Id
            this.getAttrList()
        },
        async getAttrList() {
            let result = await this.$API.attr.reqAttrList(this.category1Id, this.category2Id, this.category3Id)
            // console.log(result)
            if (result.code == 200) {
                this.attrList = result.data
            }
        },
        addAttrValue() {
            // 是响应式的
            this.attrInfo.attrValueList.push({
                attrId: this.attrInfo.id,
                valueName: '',
                flag: true, // 切换查看与编辑模式
            })
            // 新增的输入框也要自动聚焦
            this.$nextTick(() => {
                this.$refs[this.attrInfo.attrValueList.length - 1].focus()
            })
        },
        cancelAdd() {
            this.attrInfo = {
                attrName: "",
                attrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueName: "string"
                    // }
                ],
                categoryId: 0, // 三级分类的id
                categoryLevel: 3,
                // id: 0
            }
            this.isShowTable = true
        },
        updateAttr(row) {
            this.isShowTable = false
            // 这里数据结构复杂 要深拷贝
            // this.attrInfo = cloneDeep(row)
            this.attrInfo = JSON.parse(JSON.stringify(row))
            this.attrInfo.attrValueList.forEach(item => {
                this.$set(item, 'flag', false)
            })
        },
        toLook(row) {
            if (row.valueName.trim() == '') {
                this.$message({
                    message: '请输入正确的值！',
                    type: 'warning'
                })
                return
            }
            // 新增的值不能与已有重复
            let isRepeat = this.attrInfo.attrValueList.some(item => {
                if (row !== item) {
                    return row.valueName.trim() == item.valueName
                }
            })
            if (isRepeat) {
                this.$message({
                    message: '请不要重复输入！',
                    type: 'warning'
                })
                return
            }
            // 去头去尾
            row.valueName = row.valueName.trim()
            row.flag = false
        },
        toEdit(row, $index) {
            row.flag = true
            // 小心哦 $nextTick()哦
            this.$nextTick(() => {
                this.$refs[$index].focus()
            })
        },
        deleteAttrValue($index) {
            // 暂时不需要发请求
            this.attrInfo.attrValueList.splice($index, 1)
        },
        async deleteAttr(attrId) {
            let result = await this.$API.attr.reqDeleteAttr(attrId)
            if(result.code == 200) {
                this.$message({
                    type: 'success',
                    message: '删除成功！'
                })
                // 重新获取列表
                this.getAttrList()
            }
        },
        async addOrUpdateAttr() {
            // 整理参数 flag 和 空数据清理
            this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
                // 删flag
                if (item.valueName != '') {
                    delete item.flag
                    return true
                }
            })
            try {
                // 三级目录赋值
                this.attrInfo.categoryId = this.category3Id
                // 发请求
                let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
                // console.log(result)
                this.$message({
                    type: 'success',
                    message: '保存成功！'
                })
                // 重新获取列表
                this.getAttrList()
                // 返回列表页面
                this.cancelAdd()
            } catch (error) {
                // this.$message({})
            }
        }
    },
}
</script>

<style>

</style>