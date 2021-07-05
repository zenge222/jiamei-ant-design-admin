<template>
    <a-card :bordered="false">
<!--        输入框-->
        <a-form-model layout="inline" :model="queryForm" ref="ruleForm" style="margin-bottom: 20px">
            <a-form-model-item label="门店名称">
                <a-input v-model="queryForm.storeName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="物品编码">
                <a-input v-model="queryForm.code"></a-input>
            </a-form-model-item>
            <a-form-model-item label="物品名称">
                <a-input v-model="queryForm.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="品牌">
                <a-input v-model="queryForm.brand"></a-input>
            </a-form-model-item>
            <a-form-model-item label="时间">
                <a-range-picker
                    style="width: 210px"
                    v-model="createTimeRange"
                    format="YYYY-MM-DD"
                    :placeholder="['开始时间', '结束时间']"
                    @change="onDateChange"
                    @ok="onDateOk"
                />
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="onSearch">搜索</a-button>
            </a-form-model-item>
        </a-form-model>
        <!--        表格-->
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination"
            :loading="loading"
            rowKey="id"
            @change="handleTableChange"
        >
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
        </a-table>>
    </a-card>
</template>
<script>
    import {getMaterialChangeLog}from'../../api/localApi'
    export default {
        name: 'AccessRecords',
        data() {
            return {
                createTimeRange:null,
                queryForm:{
                    storeName:'',
                    code:'',
                    name:'',
                    brand:'',
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
                    { title: '门店名称', dataIndex: 'storeName', align:"center" },
                    { title: '物品编码', dataIndex: 'code', align:"center" },
                    { title: '物品名称', dataIndex: 'name', align:"center" },
                    { title: '型号', dataIndex: 'model', align:"center", },
                    { title: '品牌', dataIndex: 'brand', align:"center", },
                    { title: '单价', dataIndex: 'price', align:"center" },
                    { title: '数量', dataIndex: 'changeCount', align:"center" },
                    { title: '操作人', dataIndex: 'createName', align:"center" },
                    { title: '工号', dataIndex: 'createId', align:"center" },
                    { title: '时间', dataIndex: 'createTime', align:"center" },
                    { title: '备注', dataIndex: 'remark', align:"center" },
                ],
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(e){
                this.loading = true
                getMaterialChangeLog(e).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                        this.loading = false
                    }else{
                        this.$message.error(res.message)
                        this.loading = false
                    }
                })
            },
            //搜索
            onSearch(){
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
        },
    };
</script>
<style scoped>

</style>