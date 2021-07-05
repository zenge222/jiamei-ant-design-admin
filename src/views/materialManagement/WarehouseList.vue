<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="16">
                    <a-col :span="4">
                        <a-form-model-item label="门店">
                            <a-input v-model="queryForm.storeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item label="物品编码">
                            <a-input v-model="queryForm.code"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item label="物品名称">
                            <a-input v-model="queryForm.name"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-button type="primary" @click="onSearch">搜索</a-button>
                        <a-button type="primary" style="margin-left: 8px" @click="putIn">入库</a-button>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination"
            :loading="loading"
            rowKey="id"
            size="small"
            @change="handleChangeTable">
            <div slot="action" slot-scope="text,record">
                <a v-if="record.amount>0" @click="outbound(record)">出库</a>
            </div>
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
        </a-table>
<!--        弹窗-->
        <a-modal :visible="visible" width="50%" :footer="null" :title="title==1?'入库':'出库'" @cancel="visible = false">
            <a-form-model :model="addForm" :labelCol="{span:4}" :wrapperCol="{span:12}" ref="addForm" :rules="rules">
                <a-form-model-item label="选择门店" prop="storeId">
                    <a-select v-model="addForm.storeId" @change="selectStore" :disabled="title ==2">
                        <a-select-option :value="item.id" v-for="(item,index) in storeList" :key="index">
                            {{item.name}}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="物料id" prop="categoryId">
                    <a-input v-model="addForm.categoryId" :disabled="title ==2"></a-input>
                </a-form-model-item>
                <a-form-model-item label="物料编码" prop="code">
                    <a-input v-model="addForm.code" :disabled="title ==2"></a-input>
                </a-form-model-item>
                <a-form-model-item label="物料名称" prop="name">
                    <a-input v-model="addForm.name" :disabled="title ==2"></a-input>
                </a-form-model-item>
                <a-form-model-item label="型号" prop="model">
                    <a-input v-model="addForm.model" :disabled="title ==2"></a-input>
                </a-form-model-item>
                <a-form-model-item label="品牌" prop="brand">
                    <a-input v-model="addForm.brand" :disabled="title ==2"></a-input>
                </a-form-model-item>
                <a-form-model-item label="单价" prop="price" v-if="title == 1">
                    <a-input v-model="addForm.price" type="number"></a-input>
                </a-form-model-item>
                <a-form-model-item label="库存数量" prop="amount" v-if="title ==2">
                    <a-input v-model="addForm.amount" type="number" :disabled="title ==2"></a-input>
                </a-form-model-item>
                <a-form-model-item label="入库数量" prop="changeCount" v-if="title == 1">
                    <a-input-number v-model="addForm.changeCount" :min="1"/>
                </a-form-model-item>
                <a-form-model-item label="出库数量" prop="changeCount" v-if="title == 2">
                    <a-input-number v-model="addForm.changeCount" :min="1" :max="parseInt(addForm.amount)"/>
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model="addForm.remark" type="textarea"></a-input>
                </a-form-model-item>
            </a-form-model>
            <a-row>
                <a-col :offset="4">
                    <a-button type="primary" @click="submit">提交</a-button>
                    <a-button style="margin-left: 8px" @click="resetForm" v-if="title==1">重置</a-button>
                    <a-button style="margin-left: 8px" @click="visible=false" v-else>关闭</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </a-card>
</template>

<script>
    import {  stockMaterialList,
        getCurrentUserStoreInfo,
        stockMaterialAdd,
        stockMaterialSubtract,
        stockMaterialDetails}from'../../api/localApi'
  export default {
    name: 'WarehouseList',
          data() {
              return {
                  storeList:[],
                  visible:false,
                  queryForm:{
                      storeName:'',
                      code:'',
                      name:'',
                      pageNo:1,
                      pageSize: 10
                  },
                  addForm:{
                      changeCount:null,//变动数量
                      storeId:'',//门店id
                      storeName: '',//门店名称
                      code:'',//编码
                      name:'',//物品名称
                      remark:'',//备注
                      price:'',//单价
                      model:'',//型号
                      brand:'',//品牌
                      categoryId:null,//物料id,
                      amount:'',//剩余数量
                  },
                  rules:{
                      storeId:[{required:true,message:"请选择门店！",trigger:'change'}],
                      changeCount:[{required:true,message:"出/入库数量不能为空！",trigger:'blur'}],
                      code:[{required:true,message:"物品编码不能为空！",trigger:'blur'}],
                      price:[{required:true,message:"物品单价不能为空！",trigger:'blur'}],
                      categoryId:[{required:true,message:"物料id不能为空！",trigger:'blur'}],
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
                  title:1,
                  loading:false,
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
                      { title: '物品编码', dataIndex: 'code', align:"center" },
                      { title: '物品名称', dataIndex: 'name', align:"center" },
                      { title: '型号', dataIndex: 'model', align:"center", },
                      { title: '品牌', dataIndex: 'brand', align:"center", },
                      { title: '剩余数量', dataIndex: 'amount', align:"center" },
                      {
                          title:'操作',dataIndex: 'action',align: "center",scopedSlots:{customRender:'action'}
                      }
                  ],
              };
          },
      mounted() {
        this.init()
          this.getUserStoreInfo()
      },
      methods:{
        init(){
            this.loading = true
            stockMaterialList().then(res=>{
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
          // 获取当前登录用户所属那些门店
          getUserStoreInfo(){
              getCurrentUserStoreInfo().then(res=>{
                  if(res.code ==0){
                      this.storeList = res.data
                  }else{
                      this.$message.error(res.message)
                  }
              })
          },
          selectStore(value,options){
              this.addForm.storeName = this.storeList.find((item)=>item.id == value).name
              // console.log(this.formPartThree)
          },
          onSearch(){
            this.init(this.queryForm)
          },
          handleChangeTable(pagination){
              this.pagination.current = pagination.current
            this.queryForm.pageNo = pagination.current
              this.queryForm.pageSize = pagination.pageSize
              this.init()
          },
          submit(){
            this.$refs.addForm.validate((valid)=>{
                if(valid){
                    if(this.title ==1){
                        stockMaterialAdd(this.addForm).then(res=>{
                            if(res.code ==0){
                                console.log(res)
                                this.$message.success('物品入库成功！')
                                this.visible = false
                                this.init()
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }else {
                        stockMaterialSubtract(this.addForm).then(res=>{
                            if(res.code ==0){
                                this.$message.success('物品出库成功！')
                                this.visible = false
                                this.init()
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }
                }
            })
          },
          putIn(){
              this.visible = true
              this.title = 1
              setTimeout(()=>{
                  this.resetForm()
              },200)
          },
          outbound(record){
              this.visible = true
              this.title = 2
              stockMaterialDetails(record.id).then(res=>{
                  if(res.code ==0){
                      console.log(res)
                      this.addForm = res.data
                  }else{
                      this.$message.error(res.message)
                  }
              })
          },
          resetForm(){
              this.$refs.addForm.resetFields()
              this.deleteAttr()
          },
          // 添加的时候，删除id，createId，createName，createTime，updateId，updateName，updateTime
          deleteAttr(){
              this.$delete(this.addForm,'id')
              this.$delete(this.addForm,'createId')
              this.$delete(this.addForm,'createName')
              this.$delete(this.addForm,'createTime')
              this.$delete(this.addForm,'updateId')
              this.$delete(this.addForm,'updateName')
              this.$delete(this.addForm,'updateTime')
          },

      }
  }
</script>

<style scoped>

</style>