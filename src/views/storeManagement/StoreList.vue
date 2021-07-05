<template>
    <a-card :bordered="false">
        <!--查询区域-->
        <div class="table-page-search-wrapper">
            <a-form :form="form" layout="inline">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="省" >
                            <a-select v-model="form.province">
                                <a-select-option value="">请选择</a-select-option>
                                <a-select-option value="上海">上海</a-select-option>
                                <a-select-option value="浙江">浙江</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-button type="primary" @click="searchQuery">搜索</a-button>
                        <a-button type="primary" style="margin-left: 8px" @click="handleAdd">添加</a-button>
                    </a-col>
                </a-row>
            </a-form>
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
              <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">修改</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record)">
                        <a>删除</a>
                    </a-popconfirm>
              </span>
        </a-table>
       <div v-if="showMaps"><Add-store ref="AddStore"></Add-store></div>
    </a-card>
</template>

<script>
    import AddStore from './modules/AddStore'
    export default {
        name: 'StoreList',
        components:{AddStore},
        data(){
            return{
                form:{
                    province:''
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
                    { title: '门店名称', align:"center", dataIndex:'storeName' },
                    { title: '负责人姓名', align:"center", dataIndex: 'dutyName' },
                    { title: '负责人手机号码', align:"center", dataIndex: 'dutyPhone'},
                    { title: '省/市/区', dataIndex: 'areaLinkage', align:"center"},
                    { title: '详细地址', dataIndex: 'addressDetail', align:"center"},
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' },}
                ],
                dataSource:[
                    { id: '1', storeName: '上海静安一店', dutyName:'李某某', dutyPhone: '13888888888',areaLinkage:'上海上海市静安区',addressDetail:'长兴路173号' },
                    { id: '2', storeName: '宁波鄞州一店', dutyName:'李某某', dutyPhone: '13888888888',addressCode:'330212',areaLinkage:'浙江省宁波市鄞州区',addressDetail:'浙江省宁波市鄞州区鄞州金融大厦b座',
                        path:[{lat: 29.816221108808858, lng: 121.5403576567769},
                            {lat:29.812981662355508, lng:121.53801877051592},
                            {lat: 29.813447106520893, lng: 121.54464919120073}]
                    },
                ],
                showMaps:false
            }
        },
        methods:{
            handleEdit(e){
                let that = this
                this.showMaps = true
                setTimeout(()=>{
                    that.$refs.AddStore.visible = true
                    that.$refs.AddStore.titleTag = '修改门店'
                    that.$refs.AddStore.editStore(e)
                },500)
            },
            handleDelete(e){
                console.log(e)
            },
            searchQuery(){

            },
            handleAdd(){
                let that = this
                setTimeout(()=>{
                    that.showMaps = true
                    that.$refs.AddStore.visible = true
                    that.$refs.AddStore.addStore()
                },500)
            },
            handleTableChange(pagination, filters, sorter){

            }
        }
    }
</script>

<style scoped>

</style>