<template>
    <a-card :borderd="false">
        <a-form-model :model="queryForm" :labelCol="{span:6}" :wrapperCol="{span:16}">
            <a-row>
                <a-col :span="4">
                    <a-form-model-item label="公司名称">
                        <a-input v-model="queryForm.companyName"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="4">
                    <a-form-model-item label="联系人">
                        <a-input v-model="queryForm.name"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="4">
                    <a-form-model-item label="手机号">
                        <a-input v-model="queryForm.phone"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="8">
                    <a-form-model-item :wrapperCol="{span:24}">
                        <a-button type="primary">搜索</a-button>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
        <a-table
            bordered
            rowKey="id"
            size="middle"
            :pagination="pagination"
            :loading="loading"
            :columns="columns"
            :data-source="dataSource"></a-table>
    </a-card>
</template>

<script>
  export default {
    name: 'OtherPayments',
      data(){
        return{
            queryForm:{
                companyName:'',
                name:'',
                phone:''
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
                { title: '公司名', align:"center", dataIndex: 'companyName' },
                { title: '联系人', align:"center", dataIndex: 'name'},
                { title: '手机号', align:"center", dataIndex: 'phone'},
                { title: '介绍人数(人)', align:"center", dataIndex: 'personNum'},
                { title: '技师总工时(小时)', align:"center", dataIndex: 'allHours'},
                { title: '年月', align:"center", dataIndex: 'date'},
                { title: '佣金(元)', align:"center", dataIndex: 'wage'},
            ],
            dataSource:[
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                { id: 1, companyName: 'XXXX中介', name:'欧云红', phone: 13895464619,personNum:12,allHours:2645,date:'2020/08', wage:2645},
                ],
        }
      }
  }
</script>

<style scoped>

</style>