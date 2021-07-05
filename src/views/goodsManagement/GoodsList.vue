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
<!--                    <a-col :span="5">-->
<!--                        <a-form-model-item label="商品号">-->
<!--                            <a-input v-model="queryForm.productNumber"/>-->
<!--                        </a-form-model-item>-->
<!--                    </a-col>-->
                    <a-col :span="5">
                        <a-form-model-item label="商品名称">
                            <a-input v-model="queryForm.name"/>
                        </a-form-model-item>
                    </a-col>
<!--                    <a-col :span="5">-->
<!--                        <a-form-model-item label="所属类型">-->
<!--                            <a-select v-model="queryForm.productType">-->
<!--                                <a-select-option value="0">请选择</a-select-option>-->
<!--                                <a-select-option value="1">标准服务</a-select-option>-->
<!--                                <a-select-option value="2">定制服务</a-select-option>-->
<!--                            </a-select>-->
<!--                        </a-form-model-item>-->
<!--                    </a-col>-->
                    <a-col :span="5">
                        <a-form-model-item label="商品分类">
                            <a-select v-model="queryForm.typeId" :allowClear="true">
                                <a-select-option :value="item.id" v-for="(item,index) in category" key="id">{{item.typeName}}</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="上架状态">
                            <a-select v-model="queryForm.status">
                                <a-select-option :value="0">已下架</a-select-option>
                                <a-select-option :value="1">已上架</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-button type="primary" @click="querySearch">搜索</a-button>
                            <a-button type="primary" style="margin-left: 8px" @click="addGoodsItems">添加</a-button>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
<!--    表格区域-->
        <a-table
            bordered
            rowKey="id"
            size="middle"
            :pagination="pagination"
            :loading="loading"
            :columns="columns"
            :data-source="dataSource"
            @change="handleChangeTable"
        >
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
              <span slot="action" slot-scope="text, record">
                    <a @click="handleDetails(record)">商品详情</a>
                    <a-divider type="vertical" />
                    <a-popconfirm
                        :title='record.status == 1?"确定下架该商品？":"确定上架架该商品?"'
                        ok-text="确定"
                        cancel-text="取消"
                        @confirm="confirm(record,record.status)"
                        @cancel="cancel"
                    >
                        <a v-if="record.status == 1">下架</a>
                        <a v-else>上架</a>
                    </a-popconfirm>
                    <a-divider type="vertical" />
                    <a @click="handleEdit(record)">编辑</a>
              </span>
        </a-table>
        <add-goods ref="AddGoods" @success="init"></add-goods>
        <goods-details ref="GoodsDetails"></goods-details>
    </a-card>
</template>

<script>
    import GoodsDetails from './modules/GoodsDetails'
    import {  getStandardList,getCanCategoryList,
        changeStandardStatus}from'../../api/localApi'
    import AddGoods from './modules/AddGoods'
    export default {
        name: 'GoodsList',
        components:{
            AddGoods,
            GoodsDetails
        },
        data(){
            return{
                category:[],
                queryForm:{
                    storeName:'',
                    // productNumber:'',
                    name:'',
                    typeId:null,
                    // classification:'',
                    status:'',
                    pageNo:1,
                    pageSize:10
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
                    { title: '门店', align:"center", dataIndex: 'storeName' },
                    { title: '商品id', align:"center", dataIndex: 'id' },
                    { title: '商品名称', align:"center", dataIndex: 'name'},
                    { title: '商品分类', align:"center", dataIndex: 'typeName'},
                    { title: '排序', align:"center", dataIndex: 'sort'},
                    // { title: '商品分类', align:"center", dataIndex: 'classification'},
                    // { title: '原价', align:"center", dataIndex: 'originalPrice'},
                    // { title: '现价', align:"center", dataIndex: 'presentPrice'},
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' } }
                ],
                dataSource:[],
            }
        },
        mounted() {
            this.init()
            this.getCategory()
        },
        methods:{
            init(e){
                getStandardList(e).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            //获取有效的标准服务分类集合
            getCategory(){
                getCanCategoryList().then(res=>{
                    if(res.code ==0){
                        // console.log(res)
                        this.category = res.data
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            addGoodsItems(){
                this.$refs.AddGoods.visible = true
                this.$refs.AddGoods.title = 1
                this.$refs.AddGoods.category = this.category
                setTimeout(()=>{
                    this.$refs.AddGoods.resetForm()
                },200)
            },
            querySearch(){
                this.init(this.queryForm)
            },
            handleChangeTable(pagination){
                this.pagination.current = pagination.current
                this.queryForm.pageNo = pagination.current
                this.queryForm.pageSize = pagination.pageSize
                this.init(this.queryForm)
            },
            handleEdit(record){
                this.$refs.AddGoods.visible = true
                this.$refs.AddGoods.title = 2
                this.$refs.AddGoods.category = this.category
                this.$refs.AddGoods.getStandardInfo(record.id)
            },
            confirm(record,status) {
                // console.log(record)
                changeStandardStatus(record.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status == 1?"商品下架成功！":"商品上架成功！")
                        this.init()
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            cancel(){},
            handleDetails(record){
                this.$refs.GoodsDetails.visible = true
                this.$refs.GoodsDetails.getStandardInfo(record.id)
            },
        }
    }
</script>

<style scoped>

</style>