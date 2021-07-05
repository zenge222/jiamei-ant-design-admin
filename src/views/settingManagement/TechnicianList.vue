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
            rowKey="id"
            @change="handleChangeTable">
            <span slot-scope="t,r,index" slot="rowIndex">
                {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
            </span>
            <template slot="operation" slot-scope="text, record">
                <a @click="edit(record)">修改</a>
            </template>
        </a-table>
        <a-modal v-model="visible" :title="title ==1?'添加':'修改'" width="50%" :footer="null" @cancel="visible = false">
            <a-form-model :model="addForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" :rules="rules" ref="addForm">
                <a-form-model-item label="名称" prop="name">
                    <a-input v-model="addForm.name"/>
                </a-form-model-item>
                <a-form-model-item label="联系方式" prop="phone">
                    <a-input v-model="addForm.phone"/>
                </a-form-model-item>
                <a-form-model-item label="联系地址">
                    <a-input v-model="addForm.address"/>
                </a-form-model-item>
                <a-form-model-item label="类型">
                    <a-radio-group v-model="addForm.type">
                        <a-radio :value="2">个人</a-radio>
                        <a-radio :value="1">机构</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-row>
                    <a-col align="right" :span="24">
                        <a-button type="primary" @click="submit">提交</a-button>
                        <a-button @click="resetForm" style="margin-left: 8px">重置</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </a-card>
</template>
<script>
    import {  getRecommendList,
        getRecommendDetail,
        addRecommend,
        editRecommend}from '../../../src/api/localApi'
    export default {
        name: 'TechnicianList',
        data() {
            return {
                title:1,
                visible: false,
                queryForm:{
                    pageNo:1,
                    pageSize:10
                },
                addForm:{
                    name:'',
                    phone:'',
                    type:2,//2个人 1公司，
                    address:'',
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
                rules:{
                    name:[{required:true,message:'名称不能为空！',trigger:'blur'}],
                    phone:[{required:true,message:'联系方式不能为空！',trigger:'blur'}],
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
                    { title: '联系人姓名', dataIndex: 'name', align:"center" },
                    { title: '手机号码', dataIndex: 'phone', align:"center" },
                    { title: '类型', dataIndex: 'type', align:"center",customRender:(text)=>{
                        return text==1?'机构':'个人'
                        } },
                    { title: '地址', dataIndex: 'address', align:"center" },
                    { title: '操作', dataIndex: 'operation', scopedSlots: { customRender: 'operation' }, align:"center" },
                ],
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(){
                getRecommendList(this.queryForm).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            add() {
                this.visible = true;
                this.title = 1
                setTimeout(()=>{
                    this.resetForm()
                },50)
            },
            edit(record) {
                this.visible = true;
                this.title = 2
                getRecommendDetail(record.id).then(res=>{
                    if(res.code ==0){
                        this.addForm = res.data
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleChangeTable(){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init()
            },
            submit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        console.log(this.addForm)
                        if(this.title ==1){
                            addRecommend(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('添加成功！')
                                    this.visible = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }else {
                            editRecommend(this.addForm).then(res=>{
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
                this.$refs.addForm.resetFields()
            }
        },
    };
</script>
<style scoped>
    .btn_addition{
        margin-bottom: 8px;
    }
</style>