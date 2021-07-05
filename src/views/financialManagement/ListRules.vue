<template>
    <a-card :bordered="false">
        <a-form-model :model="queryForm" layout="inline">
            <a-form-model-item label="门店">
                <a-input v-model="queryForm.storeName"></a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="search">搜索</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="handleSetting">添加</a-button>
            </a-form-model-item>
        </a-form-model>
        <div style="min-height: 600px;margin-top: 30px">
            <span style="color: red;font-size: 12px;">注：一个门店同时只能启用一种规则</span>
            <a-table
                bordered
                rowKey="id"
                size="middle"
                :pagination="pagination"
                :loading="loading"
                :columns="columns"
                @change="handleTableChange"
                :data-source="dataSource">
                <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
                    <span slot="action" slot-scope="text, record">
                        <a @click="handleChange(record)">修改</a>
                    </span>
            </a-table>
        </div>
        <a-modal :visible="settings" :title="title==1?'添加':'修改'" width="50%" :footer="null" @cancel="settings = false">
            <div>
                <a-form-model :model="settingsForm" :labelCol="{span:4}" :wrapperCol="{span:14}" :rules="rules" ref="settingsForm">
                    <a-form-model-item label="选择门店" prop="storeId">
                        <a-select v-model="settingsForm.storeId" @change="selectStore" :disabled="title == 2">
                            <a-select-option :value="item.id" v-for="(item,index) in storeList" :key="index">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="每小时售价" prop="starsPrice">
                        <a-input v-model="settingsForm.starsPrice" type="number"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="技师星级" prop="employeeStars">
                        <a-select v-model="settingsForm.employeeStars">
                            <a-select-option :value="1">一星</a-select-option>
                            <a-select-option :value="2">二星</a-select-option>
                            <a-select-option :value="3">三星</a-select-option>
                            <a-select-option :value="4">四星</a-select-option>
                            <a-select-option :value="5">五星</a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="技师时薪" prop="employeePrice">
                        <a-input v-model="settingsForm.employeePrice" type="number"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="中介提成" prop="thirdPrice">
                        <a-input v-model="settingsForm.thirdPrice" type="number"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="阿姆尼提成" prop="amuniPrice">
                        <a-input v-model="settingsForm.amuniPrice" type="number"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="蓝若提成" prop="lanruoPrice">
                        <a-input v-model="settingsForm.lanruoPrice" type="number"></a-input>
                    </a-form-model-item>
                    <a-row>
                        <a-col :offset="4">
                            <a-button type="primary" @click="submit">提交</a-button>
                            <a-button type="primary" style="margin-left: 8px" @click="resetForm">重置</a-button>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
        </a-modal>
    </a-card>
</template>

<script>
    import {
        getStorePriceRuleList,
        getCurrentUserStoreInfo,
        addStoreRule,
        editStoreRule,
        getRuleDetails
    }from'../../api/localApi'
    export default {
        data(){
            return{
                title:1,
                storeList:[],
                queryForm:{
                    storeName:'',
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
                    { title: '门店', align:"center", dataIndex: 'storeName' },
                    { title: '每小时售价(元)', align:"center", dataIndex: 'starsPrice' },
                    { title: '技师星级', align:"center", dataIndex: 'employeeStars'},
                    { title: '技师时薪(元)', align:"center", dataIndex: 'employeePrice'},
                    { title: '中介提成(元)', align:"center", dataIndex: 'thirdPrice'},
                    { title: '阿姆尼提成(元)', align:"center", dataIndex: 'amuniPrice'},
                    { title: '蓝若提成(元)', align:"center", dataIndex: 'lanruoPrice'},
                    { title: '操作', align:"center", dataIndex: 'action',scopedSlots:{ customRender: 'action' }},
                ],
                dataSource:[],
                settings:false,
                settingsForm:{
                    storeName:'',
                    storeId:'',
                    starsPrice:'',
                    thirdPrice:'',
                    amuniPrice:'',
                    lanruoPrice:'',
                    employeePrice:'',
                    employeeStars:'',
                },
                rules:{
                    employeePrice:[{required:true,trigger:'blur',message:'技师时薪不能为空！'}],
                    thirdPrice:[{required:true,trigger:'blur',message:'中介提成不能为空！'}],
                    amuniPrice:[{required:true,trigger:'blur',message:'阿姆尼提成不能为空！'}],
                    lanruoPrice:[{required:true,trigger:'blur',message:'蓝若提成不能为空！'}],
                    starsPrice:[{required:true,trigger:'blur',message:'每小时售价不能为空！'}],
                    employeeStars:[{required:true,trigger:'blur',message:'技师星级不能为空！'}],
                    storeId:[{required:true,trigger:'change',message:'门店不能为空！'}],
                }
            }
        },
        mounted() {
            this.init()
            this.getUserStoreInfo()
        },
        methods:{
            init(e){
                getStorePriceRuleList(e).then(res=>{
                    if(res.code ==0){
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            // 获取当前登录用户所属那些门店
            getUserStoreInfo(){
                getCurrentUserStoreInfo().then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.storeList = res.data
                    }
                })
            },
            selectStore(value,options){
                this.settingsForm.storeName = this.storeList.find((item)=>item.id == value).name
                // console.log(this.formPartThree)
            },
            submit(){
                this.$refs.settingsForm.validate((valid)=>{
                    if(valid){
                        if(this.title == 1){
                            addStoreRule(this.settingsForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('添加成功')
                                    this.settings = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }else{
                            editStoreRule(this.settingsForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('修改成功')
                                    this.settings = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    }
                })
            },
            handleChange(record){
                this.settings = true
                this.title = 2
                getRuleDetails(record.id).then(res=>{
                    if(res.code ==0){
                        this.settingsForm = res.data
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            search(){
                this.init(this.queryForm)
            },
            handleSetting(){
                this.settings = true
                this.title = 1
                setTimeout(()=>{
                    this.resetForm()
                },100)
            },
            handleTableChange(pagination){
                this.pagination.current = pagination.current
              this.queryForm.pageNo = pagination.current
              this.queryForm.pageSize = pagination.pageSize
              this.init(this.queryForm)
            },
            resetForm(){
                this.$refs.settingsForm.resetFields()
                this.deleteAttr()
            },
            // 添加的时候，删除id，createId，createName，createTime，updateId，updateName，updateTime
            deleteAttr(){
                this.$delete(this.settingsForm,'id')
                this.$delete(this.settingsForm,'createId')
                this.$delete(this.settingsForm,'createName')
                this.$delete(this.settingsForm,'createTime')
                this.$delete(this.settingsForm,'updateId')
                this.$delete(this.settingsForm,'updateName')
                this.$delete(this.settingsForm,'updateTime')
            },
        }
    }
</script>

<style scoped>

</style>