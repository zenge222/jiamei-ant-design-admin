<template>
    <a-card :bordered="false">
        <a-button class="btn_addition" type="primary" style="margin-bottom: 10px" @click="add">+添加</a-button>
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination"
            rowKey="id"
            @change="handleChangeTable"
        >
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
            <template slot="operation" slot-scope="text, record">
                <a @click="check(record)">查看</a>
                <a-divider type="vertical" />
                <a @click="edit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="record.status==0?'确定启用该协议？':'确定停用该协议？'" @confirm="changeStatus(record,record.status)">
                    <a>{{record.status==0?'启用':'停用'}}</a>
                </a-popconfirm>
            </template>
        </a-table>
        <a-modal v-model="visible" :title="title==1?'添加协议':title==2?'编辑协议':'查看协议'" width="70%" :footer="null" @cancel="visible = false">
            <a-form-model :model="addForm" ref="addForm" :labelCol="{span:2}" :wrapperCol="{span:12}" :rules="rules">
                <a-form-model-item label="协议名称" prop="name">
                    <a-input v-model="addForm.name" :disabled="title == 3"></a-input>
                </a-form-model-item>
                <a-form-model-item label="协议类型" prop="type">
                    <a-radio-group v-model="addForm.type" :disabled="title == 3">
                        <a-radio :value="1">注册协议</a-radio>
                        <a-radio :value="2">产品使用协议</a-radio>
                        <a-radio :value="3">付款协议</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="是否使用" prop="status">
                    <a-radio-group v-model="addForm.status" :disabled="title == 3">
                        <a-radio :value="0">停用</a-radio>
                        <a-radio :value="1">启用</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="协议简介">
                    <a-input v-model="addForm.intro" :disabled="title == 3"></a-input>
                </a-form-model-item>
                <a-form-model-item label="协议详情" prop="details" :labelCol="{span:2}" :wrapperCol="{span:20}">
                    <j-editor v-model="addForm.details" :disabled="title == 3"></j-editor>
                </a-form-model-item>
            </a-form-model>
            <a-row v-if="title!=3">
                <a-col :offset="2">
                    <a-button type="primary" @click="submit">提交</a-button>
                    <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </a-card>
</template>
<script>
    import {
        addProtocol,
        changeProtocol,
        editProtocol,
        getProtocolDetails,
        getProtocolList
    }from'../../api/localApi'
    import JEditor from '../../components/jeecg/JEditor'
    export default {
        name: 'AgreementList',
        components:{JEditor},
        data() {
            return {
                visible: false,
                title:1,
                queryForm:{
                    pageNo:1,
                    pageSize:10
                },
                addForm:{
                    name:'',//协议名称
                    status:1,//协议状态，0已停用1使用中
                    type:null,//协议分类，1注册协议2产品使用协议3付款协议
                    details:'',//协议详情
                    intro:'',
                },
                rules:{
                   name:[{required:true,message:'协议名称不能为空！',trigger:'blur'}],
                   status:[{required:true,message:'协议状态不能为空！',trigger:'change'}],
                   type:[{required:true,message:'协议类型不能为空！',trigger:'change'}],
                   details:[{required:true,message:'协议详情不能为空！',trigger:'change'}],
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
                    { title: '协议名称', dataIndex: 'name', align:"center" },
                    { title: '协议类型', dataIndex: 'type', align:"center",customRender:(text)=>{
                        return text==1?'注册协议':text==2?'产品使用协议':'付款协议'
                        } },
                    { title: '协议简介', dataIndex: 'intro', align:"center" },
                    { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, align:"center" },
                ],
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(e){
                getProtocolList(e).then(res=>{
                    if (res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            add(){
                this.title = 1
                this.visible = true
                setTimeout(()=>{
                    this.resetForm()
                    console.log(this.addForm)
                },200)
            },
            edit(record){
                this.title = 2
                this.visible = true
                getProtocolDetails(record.id).then(res=>{
                    if(res.code ==0){
                        this.addForm = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            check(record){
                this.title = 3
                this.visible = true
                getProtocolDetails(record.id).then(res=>{
                    if(res.code ==0){
                        this.addForm = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            submit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        if(this.title == 1){
                            addProtocol(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('添加成功！')
                                    this.visible = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }else{
                            editProtocol(this.addForm).then(res=>{
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
            handleChangeTable(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
            changeStatus(record,status){
                changeProtocol(record.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status==0?"该协议启用成功！":"该协议已停止使用！")
                        this.init()
                    }else{
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
        },
    };
</script>
<style scoped>

</style>