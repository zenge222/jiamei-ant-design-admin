<template>
    <a-card :bordered="false">
        <!--        查询区域-->
        <div class="table-page-search-wrapper">
            <a-form-model :form="queryForm" :labelCol="{span:6}" :wrapperCol="{span:16}">
                <a-row :gutter="16">
                    <a-col :span="5">
                        <a-form-model-item label="门店">
                            <a-input v-model="queryForm.storeName"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="订单号">
                            <a-input v-model="queryForm.orderNumber"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="订单类型">
                            <a-select v-model="queryForm.orderType">
                                <a-select-option value="0">全部</a-select-option>
                                <a-select-option value="1">标准</a-select-option>
                                <a-select-option value="2">非标准</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="申请时间">
                            <a-range-picker @change="onChange" v-model="queryForm.applyDate"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="1">
                        <a-form-model-item>
                            <a-button type="primary">搜索</a-button>
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
        >

              <span slot="action" slot-scope="text, record">
                  <a @click="handleCheck(record)">查看</a>
                  <a-divider type="vertical" ></a-divider>
                  <a @click="handleAudit(record)">审核</a>
              </span>
        </a-table>
        <check-audit-refund-order ref="CheckAuditRefundOrder"></check-audit-refund-order>
    </a-card>
</template>

<script>
    import CheckAuditRefundOrder from './modules/CheckAuditRefundOrder'
    export default {
        name: 'RefundProcessing',
        components:{
            CheckAuditRefundOrder
        },
        data(){
            return{
                queryForm:{
                    storeName:'',
                    orderNumber:'',
                    orderType:'',
                    applyDate:undefined,
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
                    { title: '订单编号', align:"center", dataIndex: 'orderNumber' },
                    { title: '商品名称', align:"center", dataIndex: 'productName'},
                    { title: '订单类型', align:"center", dataIndex: 'orderType',customRender:(text)=>{
                            return text == 1?'标准':'定制'
                        }},
                    { title: '下单时间', align:"center", dataIndex: 'orderCratedTime'},
                    { title: '订单状态', align:"center", dataIndex: 'orderStatus',customRender:(text)=>{
                            return text == 0?'待服务':'待服务'
                        }},
                    { title: '申请时间', align:"center", dataIndex: 'applyTime'},
                    { title: '申请退金额', align:"center", dataIndex: 'applyRefundCount'},
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' }, }
                ],
                dataSource:[
                    { id: '1', storeName: '上海静安一店', orderNumber:'SHJA20201201010032', productName: '定制服务日常保洁',orderType:0, orderCratedTime:'2020-8-22 11:32:00',orderStatus:0,applyTime:'2020-8-22 11:32:00',applyRefundCount:'2594.00'},
                    { id: '2', storeName: '上海静安一店', orderNumber:'SHJA20201201010032', productName: '家政上门日常保洁',orderType:1, orderCratedTime:'2020-8-22 11:32:00',orderStatus:0,applyTime:'2020-8-22 11:32:00',applyRefundCount:'308.00'},
                ],
            }
        },
        methods:{
            onChange(date, dateString) {
                console.log(date, dateString);
            },
            handleCheck(){
                this.$refs.CheckAuditRefundOrder.visible = true
                this.$refs.CheckAuditRefundOrder.title = '查看'
            },
            handleAudit(){
                this.$refs.CheckAuditRefundOrder.visible = true
                this.$refs.CheckAuditRefundOrder.title = '审核'
            }
        }
    }
</script>

<style scoped>

</style>