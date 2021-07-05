<template>
    <a-card :bordered="false">
        <a-button class="btn_addition" type="primary"  @click="add">
            +添加
        </a-button>
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination"
            @change="handleTableChange"
            rowKey="id"
        >
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
            <div slot="icon" slot-scope="text,record">
                <img :src="text" alt="" width="80px">
            </div>
            <template slot="operation" slot-scope="text, record">
                <a @click="edit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="record.status ==0?'确认启用该分类？':'确认禁用该分类？'" @confirm="() => changeStatus(record,record.status)">
                    <a>{{record.status ==0?'启用':'禁用'}}</a>
                </a-popconfirm>
            </template>
        </a-table>
        <a-modal
            :visible="visible"
            :title="title==1?'添加':'修改'"
            width="50%"
            :rules="rules"
            @cancel="visible = false"
            :footer="null">
            <a-form-model
                :model="addForm"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
                :rules="rules"
                ref="addForm">
                <a-form-model-item label="分类名称" prop="typeName">
                    <a-input v-model="addForm.typeName"/>
                </a-form-model-item>
                <a-form-model-item label="分类排序" prop="sort">
                    <a-input-number  v-model="addForm.sort" :min="1"/>
                </a-form-model-item>
                <a-form-model-item label="简介" prop="intro">
                    <a-input type='textarea' v-model="addForm.intro"/>
                </a-form-model-item>
                <a-form-model-item label="图标" prop="icon">
                    <upload-image @change="getAvatarUrl" :files="files"></upload-image>
                </a-form-model-item>
                <a-form-model-item label="是否启用" prop="status">
                    <a-radio-group v-model="addForm.status">
                        <a-radio :value="0">禁用</a-radio>
                        <a-radio :value="1">启用</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-row style="margin-top: 80px">
                    <a-col :offset="4">
                        <a-button type="primary" @click="submit">提交</a-button>
                        <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </a-card>
</template>
<script>
    import {
        addGoodsCategory,
        changeGoodsStatus,
        editGoodsCategory,
        getCategoryDetails,
        getCategoryList
    }from'../../api/localApi'
    import UploadImage from '../staffManagement/modules/modules/UploadImage'
    import uuid from '../../utils/uuid'
    export default {
        name: 'GoodsCategory',
        components:{UploadImage},
        data() {
            return {
                visible: false,
                title:1,
                files:[],
                addForm: {
                    typeName:'',
                    sort:null,
                    intro:'',
                    icon:'',
                    status:1
                },
                pagination:{
                    current: 1,
                    pageSize: 10,
                    pageSizeOptions: ['10', '20', '30'],
                    showTotal: (total, range) => {
                        return range[0] + '-' + range[1] + ' 共' + total + '条'
                    },
                    showQuickJumper: true,
                    showSizeChanger: true,
                    total: 0
                },
                dataSource: [],
                columns: [
                    {
                        title: '序号',
                        dataIndex: '',
                        key:'rowIndex',
                        width:120,
                        align:"center",
                        scopedSlots: {
                            customRender: 'rowIndex'
                        }
                    },
                    { title: '分类名称', dataIndex: 'typeName', align:"center" },
                    { title: '分类排序', dataIndex: 'sort', align:"center" },
                    { title: '简介', dataIndex: 'intro', align:"center"},
                    { title: '图标', dataIndex: 'icon', align:"center",scopedSlots: {customRender: 'icon'} },
                    { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, align:"center" },
                ],
                rules:{
                    typeName:[{required:true,message:'类别名称不能为空！',trigger:'blur'}],
                    icon:[{required:true,message:'类别图标不能为空！',trigger:'change'}],
                }
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(e){
                getCategoryList(e).then(res=>{
                    if(res.code ==0){
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            // 获取上传成功返回的url
            getAvatarUrl(data){
                this.addForm.icon = data[0].url
            },
            handleTableChange(pagination){
                this.pagination.current = pagination.current
                let data = {
                    pageSize: pagination.current,
                    pageNo:pagination.pageSize
                }
                this.init(data)
            },
            submit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        if(this.title ==1){
                            addGoodsCategory(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('添加成功！')
                                    this.visible = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }else {
                            editGoodsCategory(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('修改成功！')
                                    this.visible = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    }
                })
            },
            resetForm(){
                this.files = []
                this.$refs.addForm.resetFields()
                this.deleteAttr()
            },
            // 添加的时候，删除id，createId，createName，createTime，updateId，updateName，updateTime
            deleteAttr(){
                this.$delete(this.addForm,'id')
                this.$delete(this.addForm,'createId')
                this.$delete(this.addForm,'createName')
                this.$delete(this.addForm,'createTime')
                this.$delete(this.addForm,'updateId')
                this.$delete(this.addForm,'updateName')
                this.$delete(this.addForm,'updateTime')
            },
            add() {
                this.title = 1
                this.visible = true
                setTimeout(()=>{this.resetForm()},100)
            },
            changeStatus(record,status) {
                changeGoodsStatus(record.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status==0?'启用成功！':'禁用成功！')
                        this.init()
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            edit(record){
                this.files = []
                this.visible = true
                this.title = 2
                getCategoryDetails(record.id).then(res=>{
                    if(res.code ==0){
                        this.addForm = res.data
                        let obj = {
                            uid:uuid(),
                            name: 'XXXX.png',
                            status: 'done',
                            url:res.data.icon
                        }
                        this.files.push(obj)
                    }else{
                      this.$message.error(res.message)
                    }
                })
            }
        },
    };
</script>
<style scoped>
    .btn_addition{
        margin-bottom: 8px;
    }
</style>