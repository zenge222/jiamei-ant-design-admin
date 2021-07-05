<template>
    <a-card :bordered="false">
        <a-form-model :form="queryForm" layout="inline">
            <a-form-model-item label="布局名称">
                <a-input v-model="queryForm.name"></a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="onSearch">搜索</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="addLayout">添加</a-button>
            </a-form-model-item>
        </a-form-model>
        <div style="margin-top:20px ">
            <a-table
                bordered
                rowKey="id"
                size="middle"
                :pagination="pagination"
                :loading="loading"
                :columns="columns"
                :data-source="dataSource"
                @change="handleTableChange"
            >
                <span slot-scope="t,r,index" slot="rowIndex">
                    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
                </span>
              <span slot="action" slot-scope="text, record">
                    <a @click="edit(record)">修改</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                      :title="record.status == 0?'确定启用该布局？':'确定禁用该布局？'"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="confirm(record,record.status)"
                    >
                        <a href="#">{{record.status == 0?'启用':'禁用'}}</a>
                    </a-popconfirm>
              </span>
            </a-table>
        </div>
        <a-modal
            :visible="visible"
            :title="title==1?'添加':'修改'"
            width="25%"
            @cancel="visible = false"
            :footer="null">
            <a-form-model :model="addForm" :rules="rules" ref="addForm" :labelCol="{span:6}" :wrapperCol="{span:12}">
                <a-form-model-item label="布局名称" prop="name">
                    <a-input v-model="addForm.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="是否启用" prop="status">
                    <a-radio-group v-model="addForm.status">
                        <a-radio :value="1">
                            启用
                        </a-radio>
                        <a-radio :value="2">
                            禁用
                        </a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-row style="margin-top: 60px">
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
    import{  getStructureList,
        getStructureDetails,
        editStructure,
        addStructure,
        changeStructureStatus}from'../../api/localApi'
    export default {
        name: 'RoomLayout',
        data(){
            return{
                queryForm:{
                    name:'',//房屋结构名称
                    status:null ,//0启用，1禁用
                    pageSize: 10,
                    pageNo:1
                },
                loading:false,
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
                columns:[
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
                    { title: '布局名称', align:"center", dataIndex: 'name' },
                    { title: '创建时间', align:"center", dataIndex: 'createTime' },
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' } }
                ],
                dataSource:[],
                title:1,
                visible:false,
                addForm:{
                    name:'',
                    status:1
                },
                rules:{
                    name:[{required:true,message:'布局名称不能为空！',trigger: 'blur' }]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(e){
                this.loading = true
                getStructureList(e).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                        this.loading = false
                    }else {
                        this.$message.error(res.message)
                        this.loading = false
                    }
                })
            },
            onSearch(){
                this.init(this.queryForm)
            },
            submit(){
                this.$refs.addForm.validate(valid => {
                    if (valid) {
                        if(this.title == 1){
                            addStructure(this.addForm).then(res=>{
                                if(res.code ==0){
                                    console.log(res)
                                    this.$message.success('添加成功！')
                                    this.init()
                                    this.visible = false
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }else{
                            editStructure(this.addForm).then(res=>{
                                if(res.code ==0){
                                    console.log(res)
                                    this.$message.success('修改成功！')
                                    this.init()
                                    this.visible = false
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addLayout(){
                this.title = 1
                this.visible = true
                setTimeout(()=>{
                    this.resetForm()
                },100)
            },
            edit(record){
                this.title = 2
                this.visible = true
                getStructureDetails(record.id).then((res)=>{
                    if(res.code ==0){
                        this.addForm = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            resetForm(){
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
            handleTableChange(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
            confirm(record,status){
                changeStructureStatus(record.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status==0?'启用成功！':'禁用成功！')
                        this.init()
                    }else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>