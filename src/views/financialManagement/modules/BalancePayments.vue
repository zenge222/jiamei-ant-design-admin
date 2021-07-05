<template>
    <a-modal :visible="visible" :footer="null" @cancel="visible = false" width="90%">
        <a-form-model :model="queryForm" layout="inline">
            <a-form-model-item label="门店">
                <a-input v-model="queryForm.storeName"></a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary">搜索</a-button>
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
                :data-source="dataSource">
            </a-table>
        </div>
    </a-modal>
</template>

<script>
    export default {
        name: 'BalancePayments',
        data(){
            return{
                visible:false,
                queryForm:{
                    storeName:''
                },
                visible:false,
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
                    { title: '年/月', align:"center", dataIndex: 'date' },
                    { title: '收入(元)', align:"center", dataIndex: 'income'},
                    { title: '工资支出(元)', align:"center", dataIndex: 'payrolls'},
                    { title: '中介佣金支出(元)', align:"center", dataIndex: 'intermediaryCosts'},
                    { title: '阿姆尼佣金支出(元)', align:"center", dataIndex: 'eminemCosts'},
                    { title: '蓝若佣金支出(元)', align:"center", dataIndex: 'blueCosts'},
                    { title: '杂费', align:"center", dataIndex: 'clutterCosts'},
                ],
                dataSource:[
                    { id: 1, storeName: '宁波鄞州1店', date:'2020/10', income: 696000,payrolls:276000,intermediaryCosts:10000,eminemCosts:12000, blueCosts:12000,clutterCosts:26600},
                    { id: 1, storeName: '上海静安1店', date:'2020/10', income: 696000,payrolls:276000,intermediaryCosts:10000,eminemCosts:12000, blueCosts:12000,clutterCosts:26600},
                ],
            }
        }
    }
</script>

<style scoped>

</style>