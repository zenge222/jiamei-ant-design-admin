<template>
    <a-card :bordered="false">
        <!--        查询-->
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="24">
                    <a-col :span="4">
                        <a-form-model-item label="物品编码">
                            <a-input v-model="queryForm.code"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item label="物品名称">
                            <a-input v-model="queryForm.name"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item label="品牌">
                            <a-input v-model="queryForm.brand"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-button type="primary" @click="onSearch">搜索</a-button>
                        <a-button type="primary" style="margin-left:10px" @click="add">添加</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
        <!--        表格-->
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination"
            @change="handleChangeTable"
            rowKey="id"
        >
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
            <template slot="operation" slot-scope="text, record">
                <a @click="edit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="record.status ==0?'确定启用该物品？':'确定禁用该物品？'" @confirm="changeStatus(record,record.status)">
                    <a>{{record.status ==0?'启用':'禁用'}}</a>
                </a-popconfirm>
            </template>
        </a-table>
<!--        弹窗-->
        <a-modal v-model="visible" :title="title==1?'添加':'编辑'" width="50%" :footer="null" @cancel="visible = false">
            <a-form-model
                :model="addForm"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 12 }"
                :rules="rules"
                ref="addForm">
                <a-form-model-item label="物品编码" prop="code">
                    <a-input v-model="addForm.code"/>
                </a-form-model-item>
                <a-form-model-item label="物品名称" prop="name">
                    <a-input v-model="addForm.name"/>
                </a-form-model-item>
                <a-form-model-item label="型号" prop="model">
                    <a-input v-model="addForm.model"/>
                </a-form-model-item>
                <a-form-model-item label="品牌" prop="brand">
                    <a-input v-model="addForm.brand"/>
                </a-form-model-item>
                <a-form-model-item label="物品图片" prop="picture">
                    <upload-image :files="files" @change="getUrl"></upload-image>
                </a-form-model-item>
                <a-form-model-item label="是否启用" prop="status">
                    <a-radio-group v-model="addForm.status">
                        <a-radio :value="0">禁用</a-radio>
                        <a-radio :value="1">启用</a-radio>
                    </a-radio-group>
                </a-form-model-item>
            </a-form-model>
            <a-row>
                <a-col :offset="4" style="margin-top: 120px">
                    <a-button type="primary" @click="submit">提交</a-button>
                    <a-button style="margin-left: 8px" @click="resetFrom">重置</a-button>
                </a-col>
            </a-row>
        </a-modal>

    </a-card>
</template>
<script>
    import {  addMaterial,
        changeMaterial,
        editMaterial,
        getMaterialDetails,
        getMaterialList}from'../../api/localApi'
    import UploadImage from '../staffManagement/modules/modules/UploadImage'
    import uuid from '../../utils/uuid'
    export default {
        name: 'GoodsList',
        components:{UploadImage},
        data() {
            return {
                files:[],
                title:1,
                queryForm:{
                    name:'',
                    code:'',
                    brand:'',
                    pageSize:10,
                    pageNo:1
                },
                addForm:{
                    brand:'',//品牌
                    code:'',//自定义编码
                    model:'',//型号
                    name:'',//名称
                    picture:'',//图片
                    status:'',//	状态，0停用1启用
                },
                rules:{
                    brand:[{required:true,message:'物品品牌不能为空！',trigger:'blur'}] ,
                    code:[{required:true,message:'物品编码不能为空！',trigger:'blur'}] ,
                    model:[{required:true,message:'物品型号不能为空！',trigger:'blur'}] ,
                    name:[{required:true,message:'物品名称不能为空！',trigger:'blur'}] ,
                    picture:[{required:true,message:'商品图片不能为空！',trigger:'change'}] ,
                    status:[{required:true,message:'物品状态不能为空！',trigger:'change'}] ,
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
                visible: false,
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
                    { title: '物品id', dataIndex: 'id', align:"center" },
                    { title: '物品编码', dataIndex: 'code', align:"center" },
                    { title: '物品名称', dataIndex: 'name', align:"center" },
                    { title: '型号', dataIndex: 'model', align:"center", },
                    { title: '品牌', dataIndex: 'brand', align:"center", },
                    { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, align:"center" },
                ],
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(e){
                getMaterialList(e).then(res=>{
                    if(res.code ==0){
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            getUrl(data){
                this.addForm.picture = data.length>0?data[0].url:''
            },
            add() {
                this.visible = true;
                this.title = 1
                this.files = []
                setTimeout(()=>{
                    this.resetFrom()
                },200)
            },
            edit(record){
                this.files = []
                this.visible = true
                this.title = 2
                getMaterialDetails(record.id).then(res=>{
                    if(res.code ==0){
                        this.addForm = res.data
                        let obj = {
                            uid:uuid(),
                            name: 'XXXX.png',
                            status: 'done',
                            url:res.data.picture
                        }
                        this.files.push(obj)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            submit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        if(this.title == 1){
                            addMaterial(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('添加成功！')
                                    this.init()
                                    this.visible = false
                                }else{
                                    this.$message.error(res.message)
                                }
                            })
                        }else {
                            editMaterial(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('编辑成功！')
                                    this.init()
                                    this.visible = false
                                }else{
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    }
                })
            },
            changeStatus(record,status){
                changeMaterial(record.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status==0?'该物品启用成功！':'该物品已禁用！')
                        this.init()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            onSearch(){
                this.init(this.queryForm)
            },
            handleChangeTable(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
            resetFrom(){
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
        },
    };
</script>
<style scoped>

</style>