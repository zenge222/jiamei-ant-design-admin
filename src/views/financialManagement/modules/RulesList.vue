<template>
    <a-modal :visible="visible" width="90%" :footer="null" title="规则列表" @cancel="visible = false">
        <a-form-model :model="queryForm" layout="inline">
            <a-form-model-item label="门店">
                <a-input></a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary">搜索</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="handleSetting">设置</a-button>
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
                    <span slot="action" slot-scope="text, record">
                        <a @click="handleChange(record)">修改</a>
                        <a-divider type="vertical" />
                        <a @click="handleDel(record)">删除</a>
                    </span>
            </a-table>
        </div>
        <a-modal :visible="settings" title="设置" width="50%" :footer="null" @cancel="settings = false">
            <div>
                <a-form-model :model="settingsForm" :labelCol="{span:4}" :wrapperCol="{span:14}" :rules="rules">
                    <a-form-model-item label="选择门店">
                        <a-select v-model="settingsForm.storeName">
                            <a-select-option value="1">宁波鄞州1店</a-select-option>
                            <a-select-option value="2">上海静安1店</a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="每小时售价">
                        <a-input v-model="settingsForm.hourPrice"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="技师星级">
                        <a-select v-model="settingsForm.starTechnician">
                            <a-select-option value="1">一星</a-select-option>
                            <a-select-option value="2">二星</a-select-option>
                            <a-select-option value="3">三星</a-select-option>
                            <a-select-option value="4">四星</a-select-option>
                            <a-select-option value="5">五星</a-select-option>
                        </a-select>
                    </a-form-model-item>
                    <a-form-model-item label="技师时薪" prop="technicianSalary">
                        <a-input v-model="settingsForm.technicianSalary"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="中介提成" prop="intermediary">
                        <a-input v-model="settingsForm.intermediary"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="阿姆尼提成" prop="eminem">
                        <a-input v-model="settingsForm.eminem"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="蓝若提成" prop="blue">
                        <a-input v-model="settingsForm.blue"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label="状态" prop="status">
                        <a-radio-group v-model="settingsForm.status">
                            <a-radio value="1">启用</a-radio>
                            <a-radio value="2">禁用</a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-button type="primary">提交</a-button>
                        <a-button type="primary" style="margin-left: 8px">重置</a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </a-modal>
    </a-modal>
</template>

<script>
  export default {
    name: 'RulesList',
      data(){
        return{
            queryForm:{

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
                { title: '每小时售价(元)', align:"center", dataIndex: 'hourPrice' },
                { title: '星级技师(元)', align:"center", dataIndex: 'starTechnician'},
                { title: '技师时薪(元)', align:"center", dataIndex: 'technicianSalary'},
                { title: '中介提成(元)', align:"center", dataIndex: 'intermediary'},
                { title: '阿姆尼提成(元)', align:"center", dataIndex: 'eminem'},
                { title: '蓝若提成(元)', align:"center", dataIndex: 'blue'},
                { title: '状态', align:"center", dataIndex: 'status'},
                { title: '操作', align:"center", dataIndex: 'action',scopedSlots:{ customRender: 'action' }},
            ],
            dataSource:[
                { id: 1, storeName: '宁波鄞州1店', hourPrice:58, starTechnician: 5,technicianSalary:23,intermediary:1,eminem:1, blue:1,status:1},
                { id: 2, storeName: '上海静安1店', hourPrice:58, starTechnician: 5,technicianSalary:23,intermediary:1,eminem:1, blue:1,status:1},
            ],
            settings:false,
            settingsForm:{
                storeName:'',
                hourPrice:'',
                starTechnician:"",
                technicianSalary:'',
                intermediary:'',
                eminem:'',
                blue:'',
                status:'1'
            },
            rules:{
                technicianSalary:[{required:true,trigger:'blur',message:'技师时薪不能为空！'}],
                intermediary:[{required:true,trigger:'blur',message:'中介提成不能为空！'}],
                eminem:[{required:true,trigger:'blur',message:'阿姆尼提成不能为空！'}],
                blue:[{required:true,trigger:'blur',message:'蓝若提成不能为空！'}],
                status:[{required:true,trigger:'change',message:'启用状态不能为空！'}],
            }
        }
      },
      methods:{
          handleSetting(){
              this.settings = true
          }
      }
  }
</script>

<style scoped>

</style>