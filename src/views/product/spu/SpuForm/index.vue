<template>
    <div>
        <el-form :model="spu" label-width="80px">
            <el-form-item label="Spu名称">
                <el-input placeholder="Spu名称" v-model="spu.spuName"></el-input>
            </el-form-item>

            <el-form-item label="品牌">
                <el-select v-model="spu.tmId" placeholder="请选择品牌">
                    <!-- 收集的数据的id -->
                    <el-option v-for="(tm, index) in tradeMarkList" :key="tm.id" :label="tm.tmName" :value="tm.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="Spu描述">
                <el-input type="textarea" rows="4" placeholder="Spu描述" v-model="spu.description"></el-input>
            </el-form-item>

            <el-form-item label="Spu图片">
                <!-- 
                    file-list: 照片墙展示的数据 必须有name, url属性
                 -->
                <el-upload action="dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
                    :file-list="spuImageList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!-- 展示图片的dialog -->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>

            <el-form-item label="销售属性">
                <el-select v-model="selectAttrIdAndName" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
                    <el-option v-for="(unselect, index) in unSelectSaleAttr" :key="unselect.id" :label="unselect.name"
                        :value="`${unselect.id}:${unselect.name}`"></el-option>
                </el-select>

                <el-button type="primary" icon="el-icon-plus" :disabled="!selectAttrIdAndName" @click="addSaleAttr">
                    添加销售属性</el-button>

                <el-table :data="spu.spuSaleAttrList" border>
                    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                    <el-table-column prop="saleAttrName" label="属性名"></el-table-column>
                    <el-table-column label="属性值名称列表">
                        <template slot-scope="{row, $index}">
                            <!-- @close="handleClose(tag)" -->
                            <el-tag :key="tag.id" v-for="(tag, index) in row.spuSaleAttrValueList" closable
                                :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index, 1)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                                ref="saveTagInput" size="small" @keyup.enter.native="$event.target.blur"
                                @blur="handleInputConfirm(row)">
                            </el-input>
                            <!-- @click="showInput" -->
                            <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">+添加
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="{row, $index}">
                            <el-button size="mini" type="danger" icon="el-icon-delete"
                                @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button type="" @click="cancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'SpuForm',
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            spu: {
                category3Id: 0,
                spuName: "",
                tmId: '',
                description: "",
                spuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     spuId: 0
                    // }
                ],
                // 平台属性与属性值
                spuSaleAttrList: [
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "string",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         {
                    //             baseSaleAttrId: 0,
                    //             id: 0,
                    //             isChecked: "string",
                    //             saleAttrName: "string",
                    //             saleAttrValueName: "string",
                    //             spuId: 0
                    //         }
                    //     ]
                    // }
                ],
            }, // 存储SPU信息属性
            tradeMarkList: [], //储存品牌信息
            spuImageList: [], // 存储SPU图片的数据
            saleAttrList: [], // 销售属性的数据
            selectAttrIdAndName: ''
        }
    },
    computed: {
        unSelectSaleAttr() {
            return this.saleAttrList.filter(item => {
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName
                })
            })
        }
    },
    methods: {
        async initSpuData(spu) {
            // 获取SPU信息
            let spuResult = await this.$API.spu.reqSpu(spu.id)
            if (spuResult.code == 200) {
                this.spu = spuResult.data
            }
            // 获取品牌的信息
            let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data
            }
            // 获取SPU图片
            let spuImageListResult = await this.$API.spu.reqSpuImageList(spu.id)
            if (spuImageListResult.code == 200) {
                let listArr = spuImageListResult.data
                // 照片墙需要两个属性 但是点击保存的时候删除后再发请求
                listArr.forEach(item => {
                    item.name = item.imgName
                    item.url = item.imgUrl
                })
                this.spuImageList = listArr
            }
            // 获取平台全部销售属性
            let saleResult = await this.$API.spu.reqBaseSaleAttrList()
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data
            }
        },
        async addSpuData(category3Id) {
            this.spu.category3Id = category3Id
            // 获取品牌的信息
            let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
            if (tradeMarkResult.code == 200) {
                this.tradeMarkList = tradeMarkResult.data
            }
            // 获取平台全部销售属性
            let saleResult = await this.$API.spu.reqBaseSaleAttrList()
            if (saleResult.code == 200) {
                this.saleAttrList = saleResult.data
            }
        },
        addSaleAttr() {
            const [baseSaleAttrId, saleAttrName] = this.selectAttrIdAndName.split(':')
            // 修改spu对象
            let newSaleAttr = {
                baseSaleAttrId,
                saleAttrName,
                spuSaleAttrValueList: [],
            }
            this.spu.spuSaleAttrList.push(newSaleAttr) // 可以数据代理
            this.selectAttrIdAndName = '' // 置空 刷新select框
        },
        addSaleAttrValue(row) {
            // 添加 inputVisible 和 inputValue 方便每一项使用
            this.$set(row, 'inputVisible', true)
            this.$set(row, 'inputValue', '')
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        // el-input 失去焦点
        handleInputConfirm(row) {
            row.inputVisible = false
            const { baseSaleAttrId, saleAttrName, inputValue } = row
            // inputValue不能为空和不能重复
            if (inputValue.trim() == '') {
                this.$message('属性值不能为空！')
                return
            }
            else {
                let isRepeat = row.spuSaleAttrValueList.some(item => item.saleAttrValueName == inputValue.trim())
                if (isRepeat == true) {
                    this.$message('属性值不能重复！')
                    return
                }
            }

            let newSaleAttrValue = {
                baseSaleAttrId,
                saleAttrValueName: inputValue.trim()
            }
            row.spuSaleAttrValueList.push(newSaleAttrValue)
        },
        async addOrUpdateSpu() {
            // 整理参数-照片墙
            // 需要有imgName imgUrl
            this.spu.spuImageList = this.spuImageList.map(item => {
                return {
                    imgName: item.name,
                    imgUrl: (item.response && item.response.data) || item.url
                }
            })
            // 发请求
            let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
            if (result.code == 200) {
                this.$message({
                    type: 'success',
                    message: '保存成功'
                })
                this.$emit('changeScene', { newScene: 0, flag: this.spu.id ? 0 : 1 }) // 判断是添加还是修改
                // 清除数据
                Object.assign(this._data, this.$options.data())
            }
        },
        cancle() {
            this.$emit('changeScene', { newScene: 0, flag: 0 })
            // 清理数据
            // Object.assign：es6中新增的方法，可以合并对象
            // 组件实例中的_data：可以操作data当中的响应式数据
            // this.$options：可以获取配置对象，data()可以返回新数据
            Object.assign(this._data, this.$options.data())
        },
        handleRemove(file, fileList) {
            console.log(file, fileList)
            this.spuImageList = fileList
        },
        // 图片墙上传成功
        handleSuccess(response, file, fileList) {
            if (response.code == 200) {
                console.log(response, file, fileList);
                this.spuImageList = fileList
            }
            else {
                console.log(response, file, fileList);
                this.$message({
                    type: 'error',
                    message: response.message
                })
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>