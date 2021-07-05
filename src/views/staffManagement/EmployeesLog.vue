<template>
    <a-card :bordered="false">
        <!--        查询区域-->
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="16">
                    <a-col :span="5">
                        <a-form-model-item label="门店名称">
                            <a-input v-model="queryForm.storeName"></a-input>
                        </a-form-model-item>
                    </a-col>
<!--                    <a-col :span="5">-->
<!--                        <a-form-model-item label="完成状态">-->
<!--                            <a-select v-model="queryForm.status">-->
<!--                                <a-select-option value="">-->
<!--                                    请选择-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="0">-->
<!--                                    完成-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="1">-->
<!--                                    进行中-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="2">-->
<!--                                    未开始-->
<!--                                </a-select-option>-->
<!--                            </a-select>-->
<!--                        </a-form-model-item>-->
<!--                    </a-col>-->
<!--                    <a-col :span="5">-->
<!--                        <a-form-model-item label="在岗">-->
<!--                            <a-select v-model="queryForm.workStatus">-->
<!--                                <a-select-option value="">-->
<!--                                    请选择-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="0">-->
<!--                                    在岗-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="1">-->
<!--                                    请假-->
<!--                                </a-select-option>-->
<!--                                <a-select-option value="2">-->
<!--                                    休息-->
<!--                                </a-select-option>-->
<!--                            </a-select>-->
<!--                        </a-form-model-item>-->
<!--                    </a-col>-->
                    <a-col :span="5">
                        <a-form-model-item label="姓名">
                            <a-input v-model="queryForm.employeeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="日期">
                            <a-range-picker
                                v-model="createTimeRange"
                                format="YYYY-MM-DD"
                                :placeholder="['开始时间', '结束时间']"
                                @change="onDateChange"
                                @ok="onDateOk"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-button type="primary" @click="search">搜索</a-button>
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
        </a-table>
    </a-card>
</template>

<script>
    import {  getEmployeesWorkLogList,
        getEmployeesWorkLogDetails}from '../../api/localApi'
    export default {
        name: 'EmployeesLog',
        data(){
            return{
                createTimeRange:null,
                queryForm:{
                    employeeName: '',
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
                    { title: '员工姓名', align:"center", dataIndex: 'employeeName' },
                    { title: '职位', align:"center", dataIndex: 'workType',customRender:(text)=>{
                        return text==1?'保洁员':text==2?'小时工':text==3?'月嫂':text==4?'居家保姆':'临时工'
                        }},
                    // { title: '日期', align:"center", dataIndex: 'date'},
                    // { title: '开始时间', align:"center", dataIndex: 'startTime'},
                    // { title: '结束时间', align:"center", dataIndex: 'endTime'},
                    { title: '每次服务时长', align:"center", dataIndex: 'serviceHours'},
                    { title: '服务名称', dataIndex: 'orderName', align:"center"},
                    { title: '服务客户', dataIndex: 'contactName', align:"center"},
                    { title: '客户联系方式', dataIndex: 'contactPhone', align:"center"},
                    { title: '订单创建时间', dataIndex: 'createTime', align:"center"},
                    { title: '员工星级', dataIndex: 'stars', align:"center",customRender:(text)=>{
                        return text+'星'
                        }},
                    // { title: '完成状态', dataIndex: 'status', align:"center"},
                    // { title: '在岗状态', dataIndex: 'WorkStatus', align:"center"}
                ],
                dataSource:[]
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(e){
                this.loading = true
                getEmployeesWorkLogList(e).then(res=>{
                    if(res.code ==0){
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                        this.loading = false
                    }else{
                        this.$message.error(res.message)
                        this.loading = false
                    }
                })
            },
            search(){
                this.init(this.queryForm)
            },
            onDateChange: function (value, dateString) {
                console.log(dateString[0],dateString[1]);
                this.queryForm.createTime_begin=dateString[0];
                this.queryForm.createTime_end=dateString[1];
            },
            onDateOk(value) {
                console.log(value);
            },
            handleTableChange(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.queryForm.pageNo = pagination.current
                this.init(this.queryForm)
            }
        }
    }
</script>

<style scoped>

</style>