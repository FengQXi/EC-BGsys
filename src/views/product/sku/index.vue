<template>
    <div class="app-container">
        <el-table :data="records" style="width: 100%" border>
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column label="名称" prop="skuName"></el-table-column>
            <el-table-column label="描述" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="110">
                <template slot-scope="{row, $index}">
                    <img :src="row.skuDefaultImg" alt="" style="width: 80px; height: 80px">
                </template>
            </el-table-column>
            <el-table-column label="重量" prop="weight" width="80"></el-table-column>
            <el-table-column label="价格" prop="price" width="80"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="{row, $index}">
                    <el-button v-if="row.isSale==1" type="success" icon="el-icon-sort-down" size="mini" @click="handleSale(row, 1)"></el-button>
                    <el-button v-else type="info" icon="el-icon-sort-up" size="mini" @click="handleSale(row, 0)"></el-button>
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit()"></el-button>
                    <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-drawer title="侧边抽屉展示详情" :visible.sync="drawer" :direction="direction" :with-header="false" :show-close="false" size="50%">
            <el-row>
                <el-col :span="5">名称</el-col>
                <el-col :span="16">{{skuInfo.skuName}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">描述</el-col>
                <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">价格</el-col>
                <el-col :span="16">{{skuInfo.price}}元</el-col>
            </el-row>
            <el-row>
                <el-col :span="5">平台属性</el-col>
                <el-col :span="16">
                    <el-tag v-for="(attr, index) in skuInfo.skuAttrValueList" :key="attr.id" type="success" style="margin-right: 10px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">商品图片</el-col>
                <el-col :span="16">
                    <el-carousel height="400px">
                        <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                            <img :src="item.imgUrl"/>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>

        <!-- @current-change="" @size-change="" -->
        <el-pagination style="text-align: center" :total="total" :current-page="page" :page-sizes="[3, 5, 10]"
            :page-size="limit" layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getSkuList" @size-change="handleSizeChange"></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Sku',
    data() {
        return {
            page: 1,
            limit: 10,
            total: 0,
            records: [], // 存储sku列表'
            skuInfo: {},
            drawer: false, // 侧边抽屉展示与否
            direction: 'rtl', // 抽屉方向
        }
    },
    methods: {
        async getSkuList(pages = 1) {
            this.page = pages
            const { page, limit } = this
            let result = await this.$API.sku.reqSkuList(page, limit)
            if (result.code == 200) {
                this.total = result.data.total
                this.records = result.data.records
            }
        },
        handleSizeChange(limit) {
            this.limit = limit
            this.getSkuList()
        },
        async handleSale(row, op) {
            if(op == 1) { // 需要下架
                let result = await this.$API.sku.reqCancelSale(row.id)
                if(result.code == 200) {
                    row.isSale = 0
                    this.$message({
                        type: 'success',
                        message: '下架成功'
                    })
                }
            }
            else if(op == 0) { // 需要上架
                let result = await this.$API.sku.reqOnSale(row.id)
                if(result.code == 200) {
                    row.isSale = 1
                    this.$message({
                        type: 'success',
                        message: '上架成功'
                    })
                }
            }
        },
        handleEdit() {
            this.$message({ message: '正在开发中！'})
        },
        async getSkuInfo(row) {
            this.drawer = true
            let result = await this.$API.sku.reqSkuById(row.id)
            console.log(result);
            if(result.code == 200) {
                this.skuInfo = result.data
            }
        }
    },
    mounted() {
        this.getSkuList()
    },
}
</script>

<style scoped>
    >>>.el-row .el-col-5{
        font-size: 18px;
        text-align: right
    }
    >>>.el-col{
        margin: 10px 10px;
    }
</style>

<style>
    .el-carousel__button {
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
    }

    .el-carousel__item img {
        height: 100%;
        width: 100%;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    } 
</style>