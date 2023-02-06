<template>
    <div class="app-container">
        <el-card>
            <category-select :show="scene != 0" @getCategoryId="getCategoryId" @removeList="removeList">
            </category-select>
        </el-card>
        <el-card style="margin-top: 20px;">
            <!-- 有三部分切换 - 列表 -->
            <div v-show="scene == 0">
                <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 20px;" :disabled="!category3Id"
                    @click="addSpu">添加SPU</el-button>

                <el-table :data="records" border>
                    <el-table-column type="index" label="序号" align="center" width="80px"></el-table-column>
                    <el-table-column prop="spuName" label="SPU名称"></el-table-column>
                    <el-table-column prop="description" label="SPU描述"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <el-button type="success" icon="el-icon-plus" size="mini" title="添加sku"
                                @click="addSku(row)"></el-button>
                            <el-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"
                                @click="updateSpu(row)"></el-button>
                            <el-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handlerDialog(row)"></el-button>
                            <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                                <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                                    title="删除spu" style="margin-left: 10px"></el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!--   @current-change="getPageList"
                    @size-change="handleSizeChange"  -->
                <el-pagination style="margin-top: 20px; textAlign: center" :total="total" :current-page="page"
                    :page-size="limit" :pager-count="5" :page-sizes="[3, 5, 10]"
                    layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getSpuList"
                    @size-change="handleSizeChange"></el-pagination>
            </div>
            <!-- 有三部分切换 - 添加修改spu -->
            <spu-form ref="spuForm" v-show="scene == 1" @changeScene="changeScene"></spu-form>
            <!-- 有三部分切换 - 添加sku -->
            <sku-form ref="skuForm" v-show="scene == 2" @changeScene="changeScene"></sku-form>

            <el-dialog :title="`${dialogSkuList.title}的SKU列表`" :visible.sync="dialogTableVisible" :before-close="dialogClose">
                <el-table :data="dialogSkuList.skuList" border style="width: 100%" v-loading="dialogLoading">
                    <el-table-column property="skuName" label="名称"></el-table-column>
                    <el-table-column property="price" label="价格"></el-table-column>
                    <el-table-column property="weight" label="重量"></el-table-column>
                    <el-table-column label="默认图片">
                        <template slot-scope="{row, $index}">
                            <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'

export default {
    name: 'Spu',
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            scene: 0, // 值 0：列表   1：添加修改   2：修改
            records: [], // spu列表的数据
            page: 1,
            limit: 5,
            total: 0,
            dialogTableVisible: false,
            dialogSkuList: {
                title: '',
                skuList: []
            },
            dialogLoading: true,
        }
    },
    components: {
        SpuForm,
        SkuForm,
    },
    methods: {
        removeList() {
            this.category3Id = ''
            this.records = []
        },
        getCategoryId(cForm) {
            // console.log(cForm);
            const { category1Id, category2Id, category3Id } = cForm
            this.category1Id = category1Id
            this.category2Id = category2Id
            this.category3Id = category3Id
            this.getSpuList()
        },
        async getSpuList(pages = 1) {
            // 若是@current-change调用会自己传参
            this.page = pages
            const { page, limit, category3Id } = this
            // page: 第几页， limit: 每一页的数据
            let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
            // console.log(result)
            if (result.code == 200) {
                this.records = result.data.records
                this.total = result.data.total
            }
        },
        handleSizeChange(limit) {
            this.limit = limit
            this.getSpuList()
        },
        addSpu() {
            this.scene = 1
            // 调用子组件方法 获得数据初始化
            this.$refs.spuForm.addSpuData(this.category3Id)
        },
        updateSpu(row) {
            this.scene = 1
            // 调用子组件方法 获得数据初始化
            this.$refs.spuForm.initSpuData(row)
        },
        async deleteSpu(row) {
            let result = await this.$API.spu.reqDeleteSpu(row.id)
            if (result.code == 200) {
                this.$message({
                    type: 'succese',
                    message: '删除成功！'
                })
                // 如果是这一页的最后一个被删除 页面会到上一页
                this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
            }
        },
        addSku(row) {
            this.scene = 2
            // 调用子组件方法 获得数据初始化
            this.$refs.skuForm.getData(this.category1Id, this.category2Id, row)
        },
        changeScene({ newScene, flag }) {
            this.scene = newScene
            if (flag == 1) this.getSpuList()
            else if (flag == -1) return
            else this.getSpuList(this.page)
        },
        async handlerDialog(spu) {
            this.dialogSkuList.title = spu.spuName
            this.dialogTableVisible = true

            let result = await this.$API.spu.reqSkuList(spu.id)
            // console.log(result);
            if(result.code == 200) {
                this.dialogSkuList.skuList = result.data
                this.dialogLoading = false
            }
        },
        dialogClose(done) {
            this.dialogLoading = true
            this.dialogSkuList = {
                title: '',
                skuList: []
            }
            done()
        }
    }
}
</script>

<style>

</style>