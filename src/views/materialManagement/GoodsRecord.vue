<template>
    <a-card :bordered="false">
        <a-form-model layout="inline" :model="queryForm" ref="ruleForm" style="margin-bottom: 20px">
            <a-form-model-item label="门店">
                <a-input v-model="queryForm.storeName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="物品编码">
                <a-input v-model="queryForm.stockCode"></a-input>
            </a-form-model-item>
            <a-form-model-item label="物品名称">
                <a-input v-model="queryForm.stockName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="品牌">
                <a-input v-model="queryForm.stockBrand"></a-input>
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
        <a-table
            bordered
            :data-source="dataSource"
            :columns="columns"
            :pagination="pagination" @change="handleChangeTable">
            <span slot-scope="t,r,index" slot="rowIndex">
    {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
</span>
        </a-table>
    </a-card>
</template>

<script>
    import {getMaterialClaimList}from'../../api/localApi'
  export default {
    name: 'GoodsRecord',
      data() {
          return {
              createTimeRange:null,
              queryForm:{
                  storeName:'',
                  stockCode:'',
                  stockName:'',
                  stockBrand:'',
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
                  { title: '物品编码', dataIndex: 'stockCode', align:"center" },
                  { title: '物品名称', dataIndex: 'stockName', align:"center" },
                  { title: '型号', dataIndex: 'stockModel', align:"center", },
                  { title: '品牌', dataIndex: 'stockBrand', align:"center", },
                  // { title: '单价', dataIndex: 'price', align:"center" },
                  { title: '申领人', dataIndex: 'employeeName', align:"center" },
                  { title: '申领人工号', dataIndex: 'jobNumber', align:"center" },
                  { title: '申领时间', dataIndex: 'createTime', align:"center" },
                  { title: '申领数量', dataIndex: 'claimNumber', align:"center" }
              ],
          };
      },
      mounted() {
        this.init()
      },
      methods:{
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
      },
  }
</script>

<style scoped>

</style>