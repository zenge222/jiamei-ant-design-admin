<template>
    <a-card :bordered="false">
        <!--        查询区域-->
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="16">
                    <a-col :span="5">
                        <a-form-model-item label="门店">
                            <a-input v-model="queryForm.storeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="姓名">
                            <a-input v-model="queryForm.employeeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="日期">
                            <a-range-picker
                                style="width: 210px"
                                v-model="createTimeRange"
                                format="YYYY-MM-DD"
                                :placeholder="['开始时间', '结束时间']"
                                @change="onDateChange"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-button type="primary" @click="querySearch">搜索</a-button>
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
            <span slot="action" slot-scope="text, record">
                    <a @click="handleCheck(record)">查看</a>
                    <a-divider type="vertical" />
                    <a @click="handleEdit(record)" v-if="record.status == -1||record.status == 0">待审批</a>
                    <a disabled v-else>已处理</a>
              </span>
        </a-table>
<!--        查看/审批-->
        <a-modal :title="title == 1?'查看详情':'审批'" :visible="visible" width="65%" @cancel="visible=false" :footer="null">
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">技师员工</a-col>
                <a-col :span="12" :offset="1">{{vacationInfo.employeeName||''}}</a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">请假类型</a-col>
                <a-col :span="12" :offset="1">{{vacationInfo.type==1?'事假':'病假'}}</a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">请假事由</a-col>
                <a-col :span="12" :offset="1">{{vacationInfo.reason||''}}</a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">开始时间</a-col>
                <a-col :span="12" :offset="1">{{vacationInfo.beginTime}}</a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">结束时间</a-col>
                <a-col :span="12" :offset="1">{{vacationInfo.endTime}}</a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">审批意见</a-col>
                <a-col :span="12" :offset="1">
                    <span v-if="title == 1">{{vacationInfo.status == -1?'待审批':vacationInfo.status == 0?'不同意':'已同意'}}</span>
                    <a-radio-group v-else v-model="vacationInfo.status">
                        <a-radio :value="1">
                            同意
                        </a-radio>
                        <a-radio :value="0">
                           不同意
                        </a-radio>
                    </a-radio-group>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="4" align="right">备注</a-col>
                <a-col :span="12" :offset="1">
                    <span v-if="title == 1">{{vacationInfo.managerRemark||'无'}}</span>
                    <a-input type="textarea" v-else v-model="vacationInfo.managerRemark"></a-input>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]" v-if="title == 2&&vacationInfo.tasks.length>0">
                <a-col :span="4" align="right">可替代员工</a-col>
                <a-col :span="19" :offset="1">
                    <a-row :gutter="[16,16]" v-for="(item,index) in vacationInfo.tasks" key="id">
                        <a-col :span="4">{{item.taskBegin}}</a-col>
                        <a-col :span="4">{{item.taskEnd}}</a-col>
                        <a-col :span="2">{{item.serviceHours}}小时</a-col>
                        <a-col :span="3">{{item.type ==1?'标准服务':'定制服务'}}</a-col>
                        <a-col :span="5">{{item.content}}</a-col>
                        <a-col :span="4">
                            <a-select placeholder="可替换人员"
                                      style="width: 120px"
                                      v-model="vacationInfo.tasks[index].employeeId"
                                      @dropdownVisibleChange="(open)=>{getReplace(open,item)}"
                                      @change="(value)=>{getReplaceName(value,index)}">
                                <a-select-option :value="vacationInfo.employeeId" disabled>{{vacationInfo.employeeName}}</a-select-option>
                                <a-select-option v-for="(item,index) in replaceList" :value="item.id">{{item.name}}</a-select-option>
                            </a-select>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :offset="4">
                    <div style="margin-top: 80px">
                        <a-button type="primary" @click="submitVacation" v-if="title !=1">提交</a-button>
                        <a-button @click="visible = false" style="margin-left: 8px">关闭</a-button>
                    </div>
                </a-col>
            </a-row>
        </a-modal>
    </a-card>
</template>

<script>
    import{ getEmployeesVacation,
        getEmployeesVacationDetails,
        getReplaceEmployees,
        approvalEmployeesVacation}from'../../api/localApi'
    import moment from 'moment'
    export default {
        name: 'ApplyRestList',
        data(){
            return{
                createTimeRange:null,
                title:null,
                replaceList:[],
                allReplaceEmployeeId:[],//所有顶岗人员的id集合
                allReplaceEmployeeName:[],//所有顶岗人员的name集合
                fetching:false,
                queryForm:{
                    storeName:'',
                    employeeName:'',
                    pageNo:1,
                    pageSize:10
                },
                vacationInfo:{},
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
                    { title: '姓名', align:"center", dataIndex: 'employeeName' },
                    { title: '提交时间', align:"center", dataIndex: 'createTime'},
                    { title: '工号', align:"center", dataIndex: 'jobNumber'},
                    { title: '开始时间', align:"center", dataIndex: 'beginTime', },
                    { title: '结束时间', align:"center", dataIndex: 'endTime', },
                    { title: '状态', dataIndex: 'status', align:"center",customRender:(text, record, index)=>{
                            return record.status == -1?'待审批':record.status == 0?'不同意':'同意'
                        }
                    },
                    { title: '操作', dataIndex: 'action', align:"center",scopedSlots: { customRender: 'action' }},
                ],
                dataSource:[],
                visible:false,
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            moment,
            init(e){
                getEmployeesVacation(e).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        // if(res.data.records.length==0){
                        //     this.$message.warn('请假列表为空！')
                        // }
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            // 获取详情
            getVacationInfo(id){
                getEmployeesVacationDetails(id).then(res=>{
                    if (res.code == 0){
                        console.log(res)
                        this.vacationInfo = res.data
                        if(this.title == 2){
                            this.vacationInfo.status = 1
                        }
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            querySearch(){
                console.log(this.queryForm)
                this.init(this.queryForm)
            },
            handleCheck(record){
                this.visible = true
                this.title = 1
                this.getVacationInfo(record.id)
            },
            handleEdit(record){
                this.visible = true
                this.title = 2
                this.getVacationInfo(record.id)
            },
            handleTableChange(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
            onDateChange: function (value, dateString) {
                console.log(dateString[0],dateString[1]);
                this.queryForm.beginTime_begin=dateString[0];
                this.queryForm.endTime_end=dateString[1];
            },
            submitVacation(){

                let id = this.vacationInfo.employeeId
                let flag = this.vacationInfo.tasks.findIndex((item)=>item.employeeId == id)
                if(flag == -1){
                    // console.log(this.vacationInfo)
                    approvalEmployeesVacation(this.vacationInfo).then(res=>{
                        if(res.code == 0){
                            this.$message.success('提交成功！')
                            this.visible = false
                            this.init()
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }else {
                    this.$message.error('不能选择本人！')
                    return false
                }
            },
            getReplace(open,item){
                // console.log(open,item)
                let data = {
                    storeId:item.storeId,
                    taskBegin:item.taskBegin,
                    taskEnd:item.taskEnd
                }
                if(open){
                    getReplaceEmployees(data).then(res=>{
                        if(res.code == 0){
                            this.replaceList = res.data
                        }else{
                            this.$message.error(res.message)
                        }
                    })
                }
            },
            getReplaceName(value,index){
                this.vacationInfo.tasks[index].employeeName = this.replaceList.find((item)=>item.id == value).name
            },
        }
    }
</script>

<style scoped>

</style>