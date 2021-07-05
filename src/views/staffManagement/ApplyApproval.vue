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
                    <a-col :span="5">
                        <a-form-model-item label="姓名">
                            <a-input v-model="queryForm.name"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="日期">
                            <a-date-picker
                                v-model="queryForm.date"
                                type="date"
                                placeholder="年/月/日"
                                style="width: 100%;"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-button type="primary">搜索</a-button>
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
            :data-source="dataSource">
            <span slot="action" slot-scope="text,record">
                <a @click="handleCheck(record)">待处理</a>
            </span>
        </a-table>
    </a-card>
</template>

<script>
    export default {
        name: 'ApplyApproval',
        data(){
            return{
                queryForm:{
                    storeName:'',
                    date:'' ,
                    name:'',
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
                        customRender:function (t,r,index) {
                            return parseInt(index)+1;
                        }
                    },
                    { title: '门店', align:"center", dataIndex: 'storeName' },
                    { title: '物品编码', align:"center", dataIndex: 'itemCode' },
                    { title: '物品名称', align:"center", dataIndex: 'itemName'},
                    { title: '型号', align:"center", dataIndex: 'model'},
                    { title: '品牌', align:"center", dataIndex: 'brand'},
                    { title: '申领人', align:"center", dataIndex: 'claimant'},
                    { title: '申领人工号', align:"center", dataIndex: 'claimantWorkNumber'},
                    { title: '申领时间', dataIndex: 'claimantTime', align:"center"},
                    { title: '申领数量', dataIndex: 'claimantNumber', align:"center"},
                    { title: '单价', dataIndex: 'unitPrice', align:"center"},
                    { title: '操作', dataIndex: 'action', align:"center",scopedSlots: { customRender: 'action' },}
                ],
                dataSource:[
                    {claimant:'籍妍丽',storeName:'宁波鄞州一店', itemCode:'20201001', claimantTime:'2020-10-23',itemName:'吸尘器',model:'VCS56A', brand:'苏珀尔',claimantWorkNumber:'329832',claimantNumber:'1',unitPrice:'199',status:"待处理"},
                    {claimant:'籍妍丽',storeName:'宁波鄞州一店', itemCode:'20201001', claimantTime:'2020-10-23',itemName:'吸尘器',model:'VCS56A', brand:'苏珀尔',claimantWorkNumber:'329832',claimantNumber:'1',unitPrice:'199',status:"待处理"},
                    {claimant:'籍妍丽',storeName:'宁波鄞州一店', itemCode:'20201001', claimantTime:'2020-10-23',itemName:'吸尘器',model:'VCS56A', brand:'苏珀尔',claimantWorkNumber:'329832',claimantNumber:'1',unitPrice:'199',status:"待处理"},
                    {claimant:'籍妍丽',storeName:'宁波鄞州一店', itemCode:'20201001', claimantTime:'2020-10-23',itemName:'吸尘器',model:'VCS56A', brand:'苏珀尔',claimantWorkNumber:'329832',claimantNumber:'1',unitPrice:'199',status:"待处理"}
                ],
            }
        },
        methods:{
            handleCheck(e){
                this.$confirm({
                    title: '物品申领',
                    content: '物品申领审批处理',
                    okText: '同意',
                    cancelText: '不同意',
                    onOk() {
                        console.log(e)
                    },
                    onCancel() {},
                });
            }
        }
    }
</script>

<style scoped>

</style>