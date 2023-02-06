<template>
    <div class="app-container">
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click.native="showDialog">添加</el-button>
        <!-- 
            表格组件
            data： 表格组件将来要展示的数据---数组类型
            align： 标题对其方式
         -->
        <el-table style="width: 100%" border :data="list">
            <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
            <el-table-column prop="tmName" label="品牌名称"></el-table-column>
            <!-- 展示图片 -->
            <el-table-column prop="logoUrl" label="品牌LOGO">
                <template slot-scope="{row, $index}">
                    <img :src="row.logoUrl" style="width: 80px; height: 100%" alt="">
                </template>
            </el-table-column>
            <!-- 按钮 -->
            <el-table-column label="操作">
                <template slot-scope="{row, $index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click.native="updateTradeMark(row)">修改
                    </el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletTradeMark(row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination style="margin-top: 20px; textAlign: center" :total="total" :current-page="page"
            :page-size="limit" :pager-count="5" :page-sizes="[3, 5, 10]"
            layout="prev, pager, next, jumper, ->, sizes, total" @current-change="getPageList"
            @size-change="handleSizeChange"></el-pagination>
        <!-- 对话框 -->
        <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
            <!-- 
                form表单
                tmForm: 将来表单验证也要用


                Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
             -->
            <el-form ref="ruleForm" style="width: 80%" :model="tmForm" :rules="rules">
                <el-form-item label="品牌名称" label-width="120px" prop="tmName">
                    <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
                </el-form-item>

                <el-form-item label="品牌LOGO" label-width="120px" prop="logoUrl">
                    <!-- 上传图片 -->
                    <!-- 
                        action: 设置图片上传的地址
                        :on-success: 可以检测图片上传成功,之后执行一次
                        :before-upload: 可以在图片上传之前,执行一次

                     -->
                    <el-upload class="avatar-uploader" action="dev-api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { validate } from 'json-schema';

export default {
    name: 'TradeMark',
    data() {
        var validateTmName = (rule, value, callback) => {
            if (value.length < 2 || value.length > 10) {
                callback(new Error('品牌名称2~10'));
            } else {
                callback();
            }
        };


        return {
            page: 1, // 当前第几页
            limit: 5, // 当前页展示数据条数
            total: 0, // 总共数据条数
            list: [], // 列表展示数据
            dialogFormVisible: false, // 对话框显示与否
            imageUrl: '', // 临时展示上传图片的url
            tmForm: {
                tmName: '',
                logoUrl: ''
            }, // 收集品牌信息
            rules: {
                tmName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    // { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                    // 自定义校验规则
                    { validator: validateTmName, trigger: 'change' }
                ],
                logoUrl: [
                    { required: true, message: '请选择品牌图片', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        async getPageList(pager = 1) {
            this.page = pager;
            const { page, limit } = this;
            let result = await this.$API.tradeMark.reqTradeMarkList(page, limit);
            if (result.code == 200) {
                this.total = result.data.total;
                this.list = result.data.records;
            }
        },
        handleSizeChange(limit) {
            this.limit = limit;
            this.getPageList();
        },
        showDialog() {
            this.dialogFormVisible = true;
            this.tmForm = { tmName: '', logoUrl: '' };
            this.imageUrl = '';
        },
        updateTradeMark(row) {
            // row：当前用户选的品牌信息
            // console.log(row);
            this.dialogFormVisible = true;
            this.tmForm = { ...row };
            this.imageUrl = row.logoUrl;
        },
        // 图片上传成功
        handleAvatarSuccess(res, file) {
            //res 上传成功之后返回的地址
            //file 上传成功后服务器返回的数据
            this.imageUrl = URL.createObjectURL(file.raw);
            this.tmForm.logoUrl = res.data;
        },
        // 图片上传之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 添加或者修改品牌
        addOrUpdateTradeMark() {
            this.$refs['ruleForm'].validate(async (valid) => {
                // 表单验证成功
                if (valid) {
                    this.dialogFormVisible = false;
                    // 发请求（添加或者修改）
                    let result = await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.tmForm);
                    if (result.code == 200) {
                        // 弹出提示信息
                        this.$message({
                            type: 'success',
                            message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
                        });
                        this.getPageList(this.tmForm.id ? this.page : 1);
                    }
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                }
            })
        },
        // 删除品牌
        deletTradeMark(row) {
            this.$confirm(`此操作将永久删除${row.tmName}品牌, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 当用户点击确定
                let result = await this.$API.tradeMark.reqDeletTradeMark(row.id);
                if (result.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getPageList(this.list.length > 1 ? this.page : 1);
                }
            }).catch(() => {
                // 当用户点击取消
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    mounted() {
        this.getPageList()
    }
}
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>