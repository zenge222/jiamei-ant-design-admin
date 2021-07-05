<template>
    <a-card :bordered="false">
<!--        查询区域-->
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="24">
                    <a-col :span="5">
                        <a-form-model-item label="门店名称">
                            <a-input v-model="queryForm.storeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="工号">
                            <a-input v-model="queryForm.jobNumber"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="姓名">
                            <a-input v-model="queryForm.name"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="手机">
                            <a-input v-model="queryForm.mobile"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="技师等级">
                            <a-select v-model="queryForm.stars">
                                <a-select-option :value="1">1星</a-select-option>
                                <a-select-option :value="2">2星</a-select-option>
                                <a-select-option :value="3">3星</a-select-option>
                                <a-select-option :value="4">4星</a-select-option>
                                <a-select-option :value="5">5星</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="工种">
                            <a-select v-model="queryForm.workType">
                                <a-select-option :value="1">保洁员</a-select-option>
                                <a-select-option :value="2">小时工</a-select-option>
                                <a-select-option :value="3">月嫂</a-select-option>
                                <a-select-option :value="4">居家保姆</a-select-option>
                                <a-select-option :value="5">临时工</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-button type="primary" @click="handleQuery">搜索</a-button>
                        <a-button type="primary" style="margin-left: 8px" @click="addEmployees">添加</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
<!--        表格区域-->
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
            <div slot="stars" slot-scope="text, record">
                <span>{{record.stars+'星'}}</span>
            </div>
            <div slot="workType" slot-scope="text, record">
                <span v-if="record.workType == 1">保洁员</span>
                <span v-if="record.workType == 2">小时工</span>
                <span v-if="record.workType == 3">月嫂</span>
                <span v-if="record.workType == 4">居家保姆</span>
                <span v-if="record.workType == 5">临时工</span>
            </div>
              <span slot="action" slot-scope="text, record">
                    <a @click="handleCheck(record)">查看</a>
                    <a-divider type="vertical" />
                    <a @click="handleEdit(record)">修改</a>
              </span>
        </a-table>

<!--        查看员工-->
        <check-employees ref="checkEmployees"></check-employees>
<!--        添加员工-->
        <add-employees ref="addEmployees" @success="init"></add-employees>
<!--        编辑员工-->
        <edit-employee ref="editEmployees" @success="init"></edit-employee>
    </a-card>
</template>

<script>
    import CheckEmployees from './modules/CheckEmployees'
    import AddEmployees from './modules/AddEmployees'
    import EditEmployee from './modules/EditEmployee'
    import {getEmployeesList,getCurrentUserStoreInfo,} from '../../api/localApi'

    export default {
        name: 'EmployeesList',
        components:{
            CheckEmployees,AddEmployees,
            EditEmployee
        },
        data(){
            return{
                storeList:[],
                queryForm:{
                    storeName:'',
                    jobNumber:'',
                    name:'',
                    mobile:'',
                    stars:'',
                    workType:'',
                    pageNo:1,
                    pageSize:10
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
                    { title: '工号', align:"center", dataIndex: 'jobNumber' },
                    { title: '真实姓名', align:"center", dataIndex: 'name' },
                    { title: '手机号', align:"center", dataIndex: 'mobile'},
                    { title: '所属门店', align:"center", dataIndex: 'storeName'},
                    { title: '技师等级', align:"center", dataIndex: 'stars', scopedSlots: { customRender: 'stars' }},
                    { title: '工种', align:"center", dataIndex: 'workType', scopedSlots: { customRender: 'workType' }},
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' }}
                ],
                dataSource:[]
            }
        },
        created() {
            this.init()
            this.getUserStoreInfo()
        },
        methods:{
            init(e){
                this.loading = true
                getEmployeesList(e).then(res=>{
                    if(res.code == 0){
                        // console.log(res.data)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                        this.loading = false
                    }
                })
            },
            // 获取当前登录用户所属那些门店
            getUserStoreInfo(){
                getCurrentUserStoreInfo().then(res=>{
                    if(res.code ==0){
                        this.storeList = res.data
                    }
                })
            },
            // 搜索
            handleQuery(){
                this.init(this.queryForm)
            },
            // 点击分页
            handleTableChange(pagination, filters, sorter){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
            //查看
            handleCheck(e){
                this.$refs.checkEmployees.visible = true
                setTimeout(()=>{
                    this.$refs.checkEmployees.init(e)
                },50)
            },
            // 修改
            handleEdit(e){
                this.$refs.editEmployees.visible = true
                setTimeout(()=>{
                    this.$refs.editEmployees.storeList = this.storeList
                    this.$refs.editEmployees.editEmployees(e)
                },50)
            },
            // 删除
            handleDelete(){

            },
            //添加
            addEmployees(){
                this.$refs.addEmployees.visible = true
                this.$refs.addEmployees.storeList = this.storeList
            },
        }
    }
</script>

<style scoped>

</style>