<template>
  <a-card :bordered="false">
      <!--查询区域-->
      <div class="table-page-search-wrapper">
          <a-form :form="form" layout="inline">
                <a-row :gutter="24">
                    <a-col :span="6">
                        <a-form-item label="省/直辖市" >
<!--                            <a-select v-model="form.province">-->
<!--                                <a-select-option value="">请选择</a-select-option>-->
<!--                                <a-select-option value="上海市">上海市</a-select-option>-->
<!--                                <a-select-option value="浙江省">浙江省</a-select-option>-->
<!--                            </a-select>-->
                            <a-input v-model="form.province"></a-input>
                        </a-form-item>
                    </a-col>
                    <a-col :span="6">
                        <a-button type="primary" @click="searchQuery">搜索</a-button>
                        <a-button type="primary" style="margin-left: 8px" @click="handleAdd">添加</a-button>
                    </a-col>
                </a-row>
          </a-form>
      </div>
<!--      表格区域-->
      <div>
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
            <span slot-scope="t,r,index" slot="rowIndex">
                {{parseInt(pagination.pageSize)*(parseInt(pagination.current) - 1)+(index + 1)}}
            </span>
              <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit(record)">修改</a>
                    <a-divider type="vertical" />
                    <a-popconfirm :title="record.status ==0?'确定启用该城市？':'确定禁用该城市？'" @confirm="changeStatus(record,record.status)">
                        <a>{{record.status ==0?'启用':'禁用'}}</a>
                    </a-popconfirm>
              </span>
          </a-table>
      </div>
<!--      添加/编辑-->
      <a-modal
          :title="title == 1?'添加':'编辑'"
          :visible="visible"
          width="30%"
          @cancel="visible = false"
          :footer="null"
          centered
      >
                <a-form-model :model="addFormObj"
                              :rules="rules"
                              :label-col="labelCol"
                              :wrapper-col="wrapperCol"
                              ref="ruleForm"
                >

                    <a-form-model-item label="省/直辖市" prop="province">
<!--                        <a-select :default-value="provinceData[0]" @change="handleProvinceChange" v-model="addFormObj.province">-->
<!--                            <a-select-option v-for="province in provinceData" :key="province">-->
<!--                                {{ province }}-->
<!--                            </a-select-option>-->
<!--                        </a-select>-->
                        <a-input v-model="addFormObj.province"></a-input>
                    </a-form-model-item>

                    <a-form-model-item label="城市" prop="city">
<!--                        <a-select v-model="addFormObj.city">-->
<!--                            <a-select-option v-for="city in cities" :key="city">-->
<!--                                {{ city }}-->
<!--                            </a-select-option>-->
<!--                        </a-select>-->
                        <a-input v-model="addFormObj.city"></a-input>
                    </a-form-model-item>

                    <a-form-model-item label="是否启用">
                        <a-radio-group v-model="addFormObj.status">
                            <a-radio :value="1">
                                启用
                            </a-radio>
                            <a-radio :value="0">
                                禁用
                            </a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </a-form-model>
              <a-row style="margin-top: 120px">
                  <a-col :offset="4">
                      <a-button type="primary" @click="handleOk">提交</a-button>
                      <a-button @click="resetForm" style="margin-left: 8px">重置</a-button>
                  </a-col>
              </a-row>
      </a-modal>
  </a-card>
</template>

<script>
    // const provinceData = ['浙江省', '上海市'];
    // const cityData = {
    //     '浙江省': ['宁波市'],
    //     '上海市': ['上海市'],
    // };
    import moment from 'moment'
    import {addServiceCity,getServiceList,editServiceCity,changeServiceStatus,getServiceCityDetails} from '../../api/localApi'
    export default {
        name: 'ServiceCity',
        data(){
            return{
                labelCol: { span: 4},
                wrapperCol: { span:16 },
                form:{
                    province:'',
                    pageNo:1,
                    pageSize:10
                },
                addFormObj:{
                    province:'',
                    city:'',
                    status:1
                },
                title:1,
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
                        scopedSlots: {
                            customRender: 'rowIndex'
                        }
                    },
                    { title: '城市名', align:"center", dataIndex: 'city' },
                    { title: '省', align:"center", dataIndex: 'province' },
                    { title: '添加时间', align:"center", dataIndex: 'createTime'},
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' }, }
                ],
                dataSource:[],
                // provinceData,
                // cityData,
                // cities: cityData[provinceData[0]],
                // secondCity: cityData[provinceData[0]][0],
                rules:{
                    city:[{required: true, message: '请选择城市！', trigger: 'change' }],
                    province:[{required: true, message: '请选择省市区域！', trigger: 'change' }],
                }
            }
        },
        created() {
            this.init()
        },
        methods:{
            init(e){
                this.loading = true
                getServiceList(e).then(res=>{
                    if(res.code == 0){
                        this.dataSource = res.data.records
                        this.pagination.total = parseInt(res.data.total)
                        this.loading = false
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            searchQuery(){
                this.init(this.form)
            },
            handleAdd(){
                this.visible = true;
                this.title = 1
                this.addFormObj = {
                    province: '',
                    city: '',
                    status:1
                }
                console.log(this.addFormObj)
            },
            handleEdit(e){
                this.visible = true;
                this.title = 2
                getServiceCityDetails(e.id).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.addFormObj = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleTableChange(pagination, filters, sorter){
                this.pagination.current = pagination.current
                this.form.pageNo = pagination.current
                this.form.pageSize = pagination.pageSize
                this.init(this.form)
            },
            handleOk() {
                let that = this
                that.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        if(that.title ==1){
                            addServiceCity(that.addFormObj).then(res=>{
                                if(res.code == 0){
                                    that.$message.success('添加成功！');
                                    that.visible = false
                                    that.init()
                                }else {
                                    that.$message.error(res.message);
                                    return false
                                }
                            })
                        }else {
                            editServiceCity(that.addFormObj).then(res=>{
                                if(res.code == 0){
                                    // console.log(res)
                                    that.$message.success('修改成功')
                                    that.init()
                                    that.visible = false
                                }
                            })
                        }
                    }
                })
            },
            // handleProvinceChange(value){
            //     this.addFormObj.city = ''
            //     this.cities = cityData[value];
            //     this.secondCity = cityData[value][0];
            //     console.log(this.addFormObj)
            // },
            resetForm(){
                this.addFormObj = {
                    province: '',
                    city: '',
                    status:1
                }
            },
            changeStatus(record,status){
                changeServiceStatus(record.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status==0?'该城市启用成功！':'该城市已禁用！')
                        this.init()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
        }

    }
</script>

<style scoped>
</style>