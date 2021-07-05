<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="16">
                    <a-col :span="5">
                        <a-form-model-item label="门店">
                            <a-input v-model="queryForm.storeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="标题">
                            <a-input v-model="queryForm.name"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="类型">
                            <a-select v-model="queryForm.type" :allowClear="true">
                                <a-select-option :value="1">首页banner</a-select-option>
                                <a-select-option :value="2">首页活动栏</a-select-option>
                                <a-select-option :value="3">分类页banner</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-button type="primary" @click="onSearch">搜索</a-button>
                        <a-button type="primary" style="margin-left: 12px" @click="onAdd">添加</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination"
            @change="handleTableChange" rowKey="id">
            <div slot="picture" slot-scope="text, record">
                <img :src="text" alt="" style="width: 80px;height: 80px">
            </div>
            <span slot-scope="t,r,index" slot="rowIndex">
                {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
            </span>
            <template slot="operation" slot-scope="text,record">
                <a @click="edit(record)">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="record.status==0?'确定开启该活动?':'确定关闭该活动?'" @confirm="changeStatus(record,record.status)">
                    <a>{{record.status==0?'开启':'停用'}}</a>
                </a-popconfirm>
            </template>
        </a-table>
        <add-activity ref="AddActivity" @success="init"></add-activity>
    </a-card>
</template>

<script>
    import {  getActivityList,
        getActivityDetails,
        editActivity,
        changeActivityStatus,
        addActivity}from'../../api/localApi'
    import AddActivity from './modules/AddActivity'
    export default {
        name: 'ActivityList',
        components:{AddActivity},
        data() {
            return {
                visible:false,
                queryForm:{
                    name:'',
                    storeName:'',
                    sort:null,
                    pageNo:1,
                    pageSize:10
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
                    { title: '门店', dataIndex: 'storeName', align:"center" },
                    { title: '标题', dataIndex: 'name', align:"center" },
                    { title: '缩略图', dataIndex: 'picture', align:"center", scopedSlots: { customRender: 'picture' }},
                    { title: '位置', dataIndex: 'type', align:"center",customRender:(text)=>{
                        return text==1?'首页banner':text==2?'首页活动栏':'分类页banner'
                        }},
                    { title: '链接', dataIndex: 'url', align:"center" },
                    { title: '来源', dataIndex: 'side', align:"center",customRender:(text)=>{
                        return text==1?'小程序':text==2?'app':'H5'
                        }},
                    { title: '排序', dataIndex: 'sort', align:"center" },
                    { title: '操作', dataIndex: 'operation', align:"center", scopedSlots: { customRender: 'operation' }, },
                ],
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(e){
                getActivityList(e).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            handleTableChange(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.queryForm.pageNo = pagination.current
                this.init(this.queryForm)
            },
            onAdd(){
                this.$refs.AddActivity.visible = true
                this.$refs.AddActivity.title = 1
                this.$refs.AddActivity.files = []
                setTimeout(()=>{
                    this.$refs.AddActivity.resetForm()
                },200)
            },
            // 搜索
            onSearch(){
                this.init(this.queryForm)
            },
            edit(record){
                console.log(record)
                this.$refs.AddActivity.visible = true
                this.$refs.AddActivity.title = 2
                this.$refs.AddActivity.getDetails(record)
            },
            changeStatus(record,status){
                changeActivityStatus(record.id).then(res=>{
                    if(res.code == 0){
                        this.$message.success(status==0?'活动开启成功！':'活动已关闭！')
                        this.init(this.queryForm)
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>