<template>
    <a-card :bordered="false">
        <a-form-model :model="queryForm" :labelCol="{span:6}" :wrapperCol="{span:16}">
            <a-row>
                <a-col :span="4">
                    <a-form-model-item label="门店">
                        <a-input v-model="queryForm.storeName"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="4">
                    <a-form-model-item label="工号">
                        <a-input v-model="queryForm.workNumber"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="4">
                    <a-form-model-item label="姓名">
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
        name: 'Compensation',
        data(){
            return{
                queryForm:{
                    storeName:'',
                    workNumber:'',
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
                    { title: '门店', align:"center", dataIndex: 'storeName' },
                    { title: '工号', align:"center", dataIndex: 'workNumber' },
                    { title: '姓名', align:"center", dataIndex: 'name'},
                    { title: '手机号', align:"center", dataIndex: 'phone'},
                    { title: '职位', align:"center", dataIndex: 'position'},
                    { title: '标准服务总工时', align:"center", dataIndex: 'standardHours'},
                    { title: '定制服务总工时', align:"center", dataIndex: 'customHours'},
                    { title: '月份', align:"center", dataIndex: 'month'},
                    { title: '工资', align:"center", dataIndex: 'wage'},
                ],
                dataSource:[
                    { id: 1, storeName: '宁波鄞州1店', workNumber:'324323', name: '欧云红',phone:1,position:'技师员工',standardHours:'208', customHours:'60',month:'7月',wage:'6164'},
                    { id: 2, storeName: '宁波鄞州1店', workNumber:'SHJA20201201010032', name: '家政保洁服务 新房开荒 家庭',phone:1,position:'钟点服务',standardHours:'139', customHours:'129',month:'',wage:''},
                    { id: 3, storeName: '宁波鄞州1店', workNumber:'SHJA20201201010032', name: '家政保洁服务 新房开荒 家庭',phone:1,position:'钟点服务',standardHours:'139', customHours:'129',month:'',wage:''},
                    { id: 4, storeName: '宁波鄞州1店', workNumber:'SHJA20201201010032', name: '家政保洁服务 新房开荒 家庭',phone:1,position:'钟点服务',standardHours:'139', customHours:'129',month:'',wage:''},
                    { id: 5, storeName: '宁波鄞州1店', workNumber:'SHJA20201201010032', name: '家政保洁服务 新房开荒 家庭',phone:1,position:'钟点服务',standardHours:'139', customHours:'129',month:'',wage:''},
                    { id: 6, storeName: '宁波鄞州1店', workNumber:'SHJA20201201010032', name: '家政保洁服务 新房开荒 家庭',phone:1,position:'钟点服务',standardHours:'139', customHours:'129',month:'',wage:''},
                ],
            }
        },
        methods:{
        }
    }
</script>

<style scoped>

</style>