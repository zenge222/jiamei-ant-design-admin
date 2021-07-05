<template>
    <a-card :bordered="false">
        <a-form-model layout="inline" :model="queryForm" style="margin-bottom: 20px">
            <a-form-model-item label="门店名称">
                <a-input v-model="queryForm.storeName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="申领人">
                <a-input v-model="queryForm.employeeName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="申领人工号">
                <a-input v-model="queryForm.jobNumber"></a-input>
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
        <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination" @change="handleChangeTable" rowKey="id">
            <span slot-scope="t,r,index" slot="rowIndex">
                {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
            </span>
            <template slot="action" slot-scope="text, record">
                <a-popconfirm
                    title="是否同意?"
                    ok-text="同意"
                    cancel-text="不同意"
                    @cancel="noAgree(record)"
                    @confirm="agree(record)">
                    <a v-if="record.status == -1">审批</a>
                </a-popconfirm>
                <a v-if="record.status == 1" @click="grant(record)">发放</a>
                <a v-if="record.status == 2" style="color: #BFBFBF" disabled>已发放</a>
                <a v-if="record.status == 0" style="color: #BFBFBF" disabled>不同意</a>
            </template>
        </a-table>
        <a-modal v-model="visible" title="申请详情" width="50%" :footer="null" @cancel="visible = false" >
            <a-table
                bordered
                :pagination="false"
                :data-source="materialInfo.itemList"
                :columns="itemColumns" rowKey="id">
            </a-table>
            <a-row style="margin-top: 60px">
                <a-col :span="24" style="text-align: right">
                    <a-button type="primary" @click="grantItem">发放</a-button>
                    <a-button @click="visible = false" style="margin-left: 8px">取消</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </a-card>
</template>

<script>
    import {getMaterialClaimList,changeMaterialStatus,grantMaterial,getMaterialClaimDetails}from'../../api/localApi'
    export default {
        name: 'ClaimsRecord',
        data() {
            return {
                visible:false,
                createTimeRange:null,
                materialInfo:{},
                queryForm:{
                    shopName:'',
                    claimant:'',
                    jobNumber:'',
                    pageSize: 10,
                    pageNo:1
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
                    { title: '门店名称', dataIndex: 'storeName', align:"center" },
                    // { title: '物品编码', dataIndex: 'stockCode', align:"center" },
                    { title: '物品名称', dataIndex: 'stockNames', align:"center" },
                    // { title: '型号', dataIndex: 'stockModel', align:"center", },
                    // { title: '品牌', dataIndex: 'stockBrand', align:"center", },
                    // { title: '单价', dataIndex: 'price', align:"center" },
                    { title: '申领人', dataIndex: 'employeeName', align:"center" },
                    { title: '申领人工号', dataIndex: 'jobNumber', align:"center" },
                    { title: '申领时间', dataIndex: 'createTime', align:"center" },
                    // { title: '申领数量', dataIndex: 'claimNumber', align:"center" },
                    { title: '状态', dataIndex: 'status', align:"center",customRender:(text)=>{
                        return text == -1?'待审批':text == 0?'不同意':text == 1?'已同意':'已发放'
                        }},
                    { title: '操作', dataIndex: 'action', align:"center",scopedSlots:{customRender:'action'} },

                ],
                itemColumns:[
                    { title: '物品名称', dataIndex: 'stockName', align:"center" },
                    { title: '品牌', dataIndex: 'stockBrand', align:"center" },
                    { title: '型号', dataIndex: 'stockModel', align:"center" },
                    { title: '申领数量', dataIndex: 'claimNumber', align:"center" }
                ]
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init(e){
                getMaterialClaimList(e).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
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
            handleChangeTable(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.queryForm.pageNo = pagination.current
                this.init(this.queryForm)
            },
            agree(record){
                changeMaterialStatus(record.id,1).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.$message.success('已同意！')
                        this.init()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            noAgree(record){
                changeMaterialStatus(record.id,0).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.$message.success('已拒绝该申请！')
                        this.init()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            grant(record){
                this.visible = true
                getMaterialClaimDetails(record.id).then(res=>{
                    if(res.code ==0){
                        // console.log(res)
                        this.materialInfo = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })

            },
            grantItem(){
                grantMaterial(this.materialInfo.id).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.$message.success('已发放！')
                        this.visible = false
                        this.init()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>