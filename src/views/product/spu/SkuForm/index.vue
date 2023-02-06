<template>
    <div>
        <el-form label-width="80px">
            <el-form-item label="SPU名称">{{spuName}}</el-form-item>
            <el-form-item label="SKU名称">
                <el-input v-model="skuInfo.skuName" placeholder="sku名称"></el-input>
            </el-form-item>
            <el-form-item label="价格(元)">
                <el-input v-model="skuInfo.price" type="number" placeholder="价格（元）"></el-input>
            </el-form-item>
            <el-form-item label="重量(千克)">
                <el-input v-model="skuInfo.weight" placeholder="重量（千克）"></el-input>
            </el-form-item>
            <el-form-item label="规格描述">
                <el-input v-model="skuInfo.skuDesc" type="textarea" rows="4" placeholder="规格描述"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true" label-width="80px">
                    <el-form-item v-for="(attr, index) in attrInfoList" :key="attr.id" :label="attr.attrName">
                        <el-select v-model="attr.selectValueId" placeholder="请选择">
                            <el-option v-for="(attrValue, index) in attr.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="attrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true" label-width="80px">
                    <el-form-item v-for="(saleAttr, index) in spuSaleAttrList" :key="saleAttr.id" :label="saleAttr.saleAttrName">
                        <el-select v-model="saleAttr.selectValueId" placeholder="请选择">
                            <el-option v-for="(saleAttrValue, index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="saleAttrValue.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片列表">
                <el-table :data="spuImageList" border style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="80px"></el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="{row, $index}">
                            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column prop="imgName" label="名称"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <el-button v-if="row.isDefault == 0" type="primary"  @click="changeDefault(row)">设置默认</el-button>
                            <el-button v-else type="">默认</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveSku">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SkuForm',
    data() {
        return {
            spuImageList: [],
            spuSaleAttrList: [],
            attrInfoList: [],
            spuName: '',
            // 收集的sku数据的字段
            skuInfo: {
                // 第一类父组件传来的
                category3Id: 0,
                spuId: 0,
                tmId: 0,

                // 第二类双向绑定填入的
                skuName: '',
                price: 0,
                weight: '',
                skuDesc: '',

                // 第三类自己写代码收集的
                skuDefaultImg: '',
                skuAttrValueList: [
                    // {
                    //     attrId: 0,
                    //     valueId: 0,
                    // }
                ],
                skuSaleAttrValueList: [
                    // {
                    //     id: 0,
                    //     saleAttrId: 0,
                    //     saleAttrName: "string",
                    //     saleAttrValueId: 0,
                    //     saleAttrValueName: "string",
                    //     skuId: 0,
                    //     spuId: 0
                    // }
                ],
                skuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     isDefault: "string",
                    //     skuId: 0,
                    //     spuImgId: 0
                    // }
                ],
            },
            selectImageList: []
        }
    },
    methods: {
        async getData(category1Id, category2Id, spu) {
            // 收集父组件给的数据
            this.spuName = spu.spuName
            this.skuInfo.category3Id = spu.category3Id
            this.skuInfo.spuId = spu.id
            this.skuInfo.tmId = spu.tmId

            // 获取图片的数据
            let result = await this.$API.spu.reqSpuImageList(spu.id)
            if (result.code == 200) {
                let list = result.data
                list.forEach(item => item.isDefault = 0);
                this.spuImageList = list
            }

            // 获取销售属性的数据
            let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id)
            if (result1.code == 200) this.spuSaleAttrList = result1.data

            // 获取平台属性的数据
            let result2 = await this.$API.spu.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
            // console.log(result2);
            if (result2.code == 200) this.attrInfoList = result2.data
        },
        handleSelectionChange(selection) {
            this.selectImageList = selection
        },
        changeDefault(row) {
            this.spuImageList.forEach(item => item.isDefault = 0)
            row.isDefault = 1
            // 修改data里的skuInfo
            this.skuInfo.skuDefaultImg = row.imgUrl
        },
        async saveSku() {
            const {skuInfo} = this

            skuInfo.skuAttrValueList = this.attrInfoList.reduce((prev, item) => {
                if(item.selectValueId) {
                    const attrId = item.id
                    const valueId = item.selectValueId
                    prev.push({attrId, valueId})
                }
                return prev
            }, [])

            skuInfo.skuSaleAttrValueList = this.spuSaleAttrList.reduce((prev, item) => {
                if(item.selectValueId) {
                    const saleAttrId = item.id
                    const saleAttrValueId = item.selectValueId
                    prev.push({saleAttrId, saleAttrValueId})
                }
                return prev
            }, [])

            skuInfo.skuImageList = this.selectImageList.map(item => {
                return {
                    imgName:item.imgName,
                    imgUrl:item.imgUrl,
                    isDefault:item.isDefault,
                    spuImgId:item.id
                }
            })

            console.log("发请求！")
            let result = await this.$API.spu.reqAddSku(skuInfo)
            console.log("保存失败  但是不晓得为啥子")
            console.log(result)
            if(result.code == 200) {
                this.$message({
                    type: 'success',
                    message: '添加SKU成功！'
                })
                this.$emit('changeScene', { newScene: 0, flag: -1 })
                Object.assign(this._data, this.$options.data())
            }
        },
        cancel() {
            this.$emit('changeScene', { newScene: 0, flag: -1 })
            // 清理数据
            // Object.assign：es6中新增的方法，可以合并对象
            // 组件实例中的_data：可以操作data当中的响应式数据
            // this.$options：可以获取配置对象，data()可以返回新数据
            Object.assign(this._data, this.$options.data())
        }
    },
}
</script>

<style>

</style>