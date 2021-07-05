<template>
    <a-card :bordered="false">
        <!--        查询区域-->
        <div class="table-page-search-wrapper">
            <a-form-model layout="inline" :model="queryForm" ref="ruleForm">
                <a-row :gutter="16">
                    <a-col :span="5">
                        <a-form-model-item label="门店名称">
                            <a-input v-model="queryForm.storeName"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="学号">
                            <a-input v-model="queryForm.studentId"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="姓名">
                            <a-input v-model="queryForm.name"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5">
                        <a-form-model-item label="手机">
                            <a-input v-model="queryForm.telPhone"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="2">
                        <a-button type="primary">搜索</a-button>
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
            :data-source="dataSource">
            <span slot="action" slot-scope="text,record">
                <a @click="handleCheck(record)">查看</a>
                <a-divider type="vertical" />
                <a @click="handleAudit(record)">待审核</a>
            </span>
        </a-table>
        <a-modal :title="title" :visible="visible" width="50%" @cancel="close" @ok="handleSubmit">
            <a-form-model :model="approvalForm" ref="approvalForm" :rules="rules" :labelCol="{span:4}" :wrapperCol="{span:14}">
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="申请门店">
                            <a-input v-model="approvalForm.storeName" :disabled="disabled"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="审核">
                            <a-radio-group v-model="approvalForm.result" :disabled="disabled">
                                <a-radio value="1">
                                    同意
                                </a-radio>
                                <a-radio value="2">
                                    不同意
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="职位安排" prop="position">
                            <a-select v-model="approvalForm.position" :disabled="disabled">
                                <a-select-option value="0">请选择</a-select-option>
                                <a-select-option value="1">区域经理</a-select-option>
                                <a-select-option value="2">技师员工</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="工种" prop="workerType">
                            <a-select v-model="approvalForm.workerType" :disabled="disabled">
                                <a-select-option value="0">请选择</a-select-option>
                                <a-select-option value="1">培训学员</a-select-option>
                                <a-select-option value="2">住家保姆</a-select-option>
                                <a-select-option value="3">小时工</a-select-option>
                                <a-select-option value="4">月嫂</a-select-option>
                                <a-select-option value="5">保洁员</a-select-option>
                                <a-select-option value="6">临时工</a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="入职时间" prop="joinTime">
                            <a-date-picker
                                v-model="approvalForm.joinTime"
                                type="date"
                                style="width: 100%;" :disabled="disabled"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="休息日" :wrapperCol="{span:20}">
                            <a-checkbox-group v-model="approvalForm.resetDate" :disabled="disabled">
                                <a-checkbox value="1" name="type">
                                    星期一
                                </a-checkbox>
                                <a-checkbox value="2" name="type">
                                    星期二
                                </a-checkbox>
                                <a-checkbox value="3" name="type">
                                    星期三
                                </a-checkbox>
                                <a-checkbox value="4" name="type">
                                    星期四
                                </a-checkbox>
                                <a-checkbox value="5" name="type">
                                    星期五
                                </a-checkbox>
                                <a-checkbox value="6" name="type">
                                    星期六
                                </a-checkbox>
                                <a-checkbox value="7" name="type">
                                    星期天
                                </a-checkbox>
                            </a-checkbox-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="工作时间" prop="startTime">
                            <a-time-picker v-model="approvalForm.startTime" format="HH:mm" :disabled="disabled"/>-<a-time-picker v-model="approvalForm.endTime" format="HH:mm" :disabled="disabled"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="备注">
                            <a-textarea allow-clear v-model="approvalForm.note" :disabled="disabled"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </a-card>
</template>

<script>
    import moment from 'moment';
export default {
    name: 'StudentsReview',
    data(){
        return{
            queryForm:{
                storeName:'',
                studentId:'',
                name:'',
                telPhone:''
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
                { title: '学号', align:"center", dataIndex: 'studentId' },
                { title: '真实姓名', align:"center", dataIndex: 'realName' },
                { title: '手机号', align:"center", dataIndex: 'telPhone'},
                { title: '申请门店', align:"center", dataIndex: 'applyStoreName'},
                { title: '技师等级', align:"center", dataIndex: 'level'},
                { title: '操作', dataIndex: 'action', align:"center",scopedSlots: { customRender: 'action' },}
            ],
            dataSource:[
                {realName:'籍妍丽',applyStoreName:'宁波鄞州一店', studentId:'20201001', telPhone:'13888888888',level:'1星'},
                {realName:'籍妍丽',applyStoreName:'宁波鄞州一店', studentId:'20201001', telPhone:'13888888888',level:'1星'},
                {realName:'籍妍丽',applyStoreName:'宁波鄞州一店', studentId:'20201001', telPhone:'13888888888',level:'1星'},
                {realName:'籍妍丽',applyStoreName:'宁波鄞州一店', studentId:'20201001', telPhone:'13888888888',level:'1星'},
                {realName:'籍妍丽',applyStoreName:'宁波鄞州一店', studentId:'20201001', telPhone:'13888888888',level:'1星'},
            ],
            title:'查看',
            visible:false,
            disabled:true,
            approvalForm:{
                storeName:'',
                result:'',
                workerType:'',
                joinTime:'',
                resetDate:[],
                startTime:moment('12:08','HH:mm'),
                endTime:moment('12:08','HH:mm'),
                note:''
            },
            rules:{
                position:[{required:true,trigger:'change'}],
                workerType:[{required:true,trigger:'change'}],
                joinTime:[{required:true,trigger:'change'}],
                startTime:[{required:true,trigger:'change'}]
            }
        }
    },
    methods:{
        moment,
        handleAudit(){
            this.title = '审核'
            this.visible = true
            this.disabled = false
        },
        handleCheck(){
            this.title = '查看'
            this.visible = true
            this.disabled = true
        },
        close(){
            this.visible = false

        },
        handleSubmit(){
            this.visible = false
        },
    }
}
</script>

<style scoped>

</style>