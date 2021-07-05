<template>
    <a-card :bordered="false">
        <!--        查询区域-->
        <div class="table-page-search-wrapper">
            <a-form-model :model="queryForm" layout="inline" :labelCol="{span:4}" :wrapperCol="{span:18}">
                <a-row :gutter="24">
                    <a-col :span="5">
                        <a-form-model-item label="真实姓名">
                            <a-input v-model="queryForm.name"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="微信昵称">
                            <a-input v-model="queryForm.nickName"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="手机号">
                            <a-input v-model="queryForm.phone"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="性别">
                            <a-select v-model="queryForm.sex">
                                <a-select-option :value="0">未知</a-select-option>
                                <a-select-option :value="1">男</a-select-option>
                                <a-select-option :value="2">女</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="注册时间">
                            <a-range-picker
                            v-model="createTime"
                            format="YYYY-MM-DD"
                            :placeholder="['开始时间', '结束时间']"
                            @change="onDateChange"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="2">
                        <a-form-model-item>
                            <a-button type="primary" @click="search">搜索</a-button>
                        </a-form-model-item>
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
            <div slot="avatar" slot-scope="text, record">
                <a-avatar :size="64" :src="record.avatar" v-if="record.avatar"/>
            </div>
            <span slot="action" slot-scope="text, record">
                  <a @click="handleCheck(record)">服务日历</a>
            </span>
        </a-table>
        <service-calendar ref="ServiceCalendar"></service-calendar>
    </a-card>
</template>

<script>
    import { getMiniUserList }from'../../api/localApi'
    import ServiceCalendar from './modules/ServiceCalendar'
    export default {
        name: 'MemberList',
        components:{ServiceCalendar},
        data(){
            return{
                createTime:null,
                queryForm:{
                    name:'',
                    nickName:'',
                    phone:'',
                    telPhone:'',
                    sex:null,
                    pageNo:1,
                    pageSize: 10
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
                    // { title: '真实姓名', align:"center", dataIndex: 'name' },
                    { title: '微信昵称', align:"center", dataIndex: 'nickName' },
                    { title: '手机号', align:"center", dataIndex: 'phone'},
                    { title: '性别', align:"center", dataIndex: 'sex',customRender:(text)=>{
                            return text == 0?'未知':text == 1?'男':'女'
                        }},
                    { title: '注册时间', align:"center", dataIndex: 'createTime'},
                    { title: '头像', align:"center", dataIndex: 'avatar',scopedSlots:{ customRender: 'avatar' }},
                    { title: '城市', align:"center", dataIndex: 'city'},
                    { title: '联系地址', align:"center", dataIndex: 'address'},
                    { title: '操作', align:"center", dataIndex: 'action',scopedSlots:{ customRender: 'action' } }
                ],
                dataSource:[],
            }
        },
        mounted() {
            this.init()
        },
        methods:{
            init(e){
                this.loading = true
                getMiniUserList(e).then(res=>{
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
            handleCheck(record){
                this.$refs.ServiceCalendar.visible = true
                this.$refs.ServiceCalendar.getMonthService(record)
            },
            search(){
                this.init(this.queryForm)
            },
            onDateChange: function (value, dateString) {
                console.log(dateString[0],dateString[1]);
                this.queryForm.createTime_begin=dateString[0];
                this.queryForm.createTime_end=dateString[1];
            },
            handleTableChange(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
        }
    }
</script>

<style scoped>

</style>