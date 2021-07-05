<template>
    <a-card :bordered="false">
        <a-form-model :form="queryForm" layout="inline">
            <a-form-model-item label="结构名称">
                <a-input v-model="queryForm.name"></a-input>
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="search">搜索</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="addStructure">添加</a-button>
                <a-button type="primary" style="margin-left: 8px" @click="exportDataEvent" icon="download">导出数据</a-button>
<!--                <a-button type="primary" style="margin-left: 8px" @click="importDataEvent" icon="import">导入数据</a-button>-->
            </a-form-model-item>
        </a-form-model>
        <div style="margin-top:20px ">
<!--            <vxe-toolbar>-->
<!--                <template v-slot:buttons>-->
<!--                    <vxe-button @click="exportDataEvent">导出数据</vxe-button>-->
<!--                    <vxe-button @click="importDataEvent">导入数据</vxe-button>-->
<!--                </template>-->
<!--            </vxe-toolbar>-->
            <vxe-table
                round
                border
                highlight-hover-row
                ref="xTable"
                align="center"
                :export-config="{}"
                :data="tableData">
                <vxe-table-column type="seq" width="60"></vxe-table-column>
                <vxe-table-column field="name" title="布局名称"></vxe-table-column>
                <vxe-table-column field="structureName" title="内部结构名称"></vxe-table-column>
                <vxe-table-column field="cleanLevel" title="清洁程度"></vxe-table-column>
                <vxe-table-column field="cleanPlace" title="清洁项目"></vxe-table-column>
                <vxe-table-column field="cleanTools" title="清洁工具"></vxe-table-column>
                <vxe-table-column field="cleanLotion" title="清洁药剂"></vxe-table-column>
                <vxe-table-column field="acceptNormal" title="验收标准"></vxe-table-column>
<!--                <vxe-table-column field="texture" title="物品材质"></vxe-table-column>-->
                <vxe-table-column field="remark" title="备注"></vxe-table-column>
                <vxe-table-column title="操作">
                    <template v-slot="{ row }">
                        <a @click="edit(row)">修改</a>
                        <a-divider type="vertical" />
                        <a-popconfirm
                            :title="row.status == 0?'确定启用该结构？':'确定禁用该结构？'"
                            ok-text="确定"
                            cancel-text="取消"
                            @confirm="confirm(row,row.status)"
                        >
                            <a href="#">{{row.status == 0?'启用':'禁用'}}</a>
                        </a-popconfirm>
                    </template>
                </vxe-table-column>
            </vxe-table>
            <vxe-pager
                background
                size="small"
                :loading="loading3"
                :current-page="queryForm.pageNo"
                :page-size="queryForm.pageSize"
                :total="total"
                :page-sizes="[10, 20, 50]"
                :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                @page-change="handlePageChange3">
            </vxe-pager>
        </div>
        <a-modal
            :visible="visible"
            :title="title==1?'添加':'修改'"
            width="50%"
            :footer="null"
            @cancel="visible = false">
            <a-form-model :model="addForm" :rules="rules" ref="addForm" :labelCol="{span:4}" :wrapperCol="{span:12}">
                <a-form-model-item label="布局名称" prop="structureId">
                    <a-select v-model="addForm.structureId" @change="getStructureName">
                        <a-select-option :value="item.id" v-for="(item,index) in structureList" key="id">{{item.name}}</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="内部结构名称" prop="name">
                    <a-input v-model="addForm.name"></a-input>
                </a-form-model-item>
                <a-form-model-item label="清洁程度" prop="cleanLevel">
                    <a-input v-model="addForm.cleanLevel"></a-input>
                </a-form-model-item>
                <a-form-model-item label="清洁项目" prop="cleanPlace">
                    <a-input v-model="addForm.cleanPlace"></a-input>
                </a-form-model-item>
                <a-form-model-item label="清洁工具" prop="cleanTools">
                    <a-input v-model="addForm.cleanTools"></a-input>
                </a-form-model-item>
                <a-form-model-item label="清洁药剂" prop="cleanLotion">
                    <a-input v-model="addForm.cleanLotion"></a-input>
                </a-form-model-item>
                <a-form-model-item label="验收标准" prop="acceptNormal">
                    <a-input v-model="addForm.acceptNormal"></a-input>
                </a-form-model-item>
<!--                <a-form-model-item label="物品材质" prop="texture">-->
<!--                    <a-input v-model="addForm.texture"></a-input>-->
<!--                </a-form-model-item>-->
                <a-form-model-item label="物品保洁周期" prop="cleanPeriod">
                    <a-radio-group v-model="addForm.cleanPeriod" @change="changeClean">
                        <a-radio :value="1">每次</a-radio>
                        <a-radio :value="2">隔n天</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="物品保洁相隔天数" prop="days" v-if="addForm.cleanPeriod ==2">
                    <a-input-number v-model="addForm.days" :min="1" />
                </a-form-model-item>
                <a-form-model-item label="是否启用" prop="status">
                    <a-radio-group v-model="addForm.status">
                        <a-radio :value="1">启用</a-radio>
                        <a-radio :value="0">禁用</a-radio>
                    </a-radio-group>
                </a-form-model-item>
                <a-form-model-item label="备注" prop="remark">
                    <a-input v-model="addForm.remark"></a-input>
                </a-form-model-item>
            </a-form-model>
            <a-row style="margin-top: 80px">
                <a-col :offset="4">
                    <a-button type="primary" @click="submit">提交</a-button>
                    <a-button @click="resetForm" style="margin-left: 8px">重置</a-button>
                </a-col>
            </a-row>
        </a-modal>
    </a-card>
</template>

<script>
    import {
        addStructureItem,
        changeStructureItemStatus,
        editStructureItem,
        getStructureItemDetails,
        getStructureAllTypeList,
        getStructureItemList,
    } from '../../api/localApi'
    export default {
        name: 'RoomStructure',
        data(){
            return{
                queryForm:{
                    name:'',
                    pageSize:10,
                    pageNo:1
                },
                total:null,
                loading3: false,
                tableData: [],
                title:1,
                visible:false,
                addForm:{
                    structureId:'',
                    name:'',
                    cleanLevel:'',
                    structureName:'',
                    cleanPlace:'',
                    cleanTools:'',
                    cleanLotion:'',
                    acceptNormal:'',
                    // texture:'',//物品材质
                    remark:'',
                    cleanPeriod:1,//物品保洁周期，1每次 2隔n天
                    days:0,//如果选择隔天，则需要输入具体隔的天数
                    status:1
                },
                rules:{
                    structureId:[{required:true,message:'布局名称不能为空！',trigger: 'change' }],
                    name:[{required:true,message:'内部名称不能为空！',trigger: 'blur' }],
                    cleanPeriod:[{required:true,message:'物品保洁周期不能为空！',trigger: 'change' }],
                    days:[{required:true,message:'物品保洁相隔天数不能为空！',trigger: 'change' }],
                    status:[{required:true,message:'状态不能为空！',trigger: 'change' }]
                },
                structureList:[]
            }
        },
        mounted() {
            this.init()
            this.structureListSelect()
        },
        methods:{
            init(e){
                this.loading3 = true
                getStructureItemList(e).then(res=>{
                    if(res.code ==0){
                        this.tableData = res.data.records
                        this.total = parseInt(res.data.total)
                        this.loading3 = false
                    }else {
                        this.$message.error(res.message)
                        this.loading3 = false
                    }
                })
            },
            //获取布局名称列表
            structureListSelect(){
                getStructureAllTypeList().then(res=>{
                    if(res.code ==0){
                        this.structureList = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            changeClean(e){
                // console.log(e)
                if(e.target.value ==1){
                    this.addForm.days = 0
                }else{
                    this.addForm.days = 1
                }
            },
            getStructureName(value){
                // console.log(value)
                this.addForm.structureName = this.structureList.find(item=>item.id == value).name
            },
            addStructure(){
                this.title = 1
                this.visible = true
                setTimeout(()=>{
                    this.resetForm()
                },100)
            },
            submit(){
                this.$refs.addForm.validate((valid)=>{
                    if(valid){
                        if(this.title ==1){
                            // console.log(this.addForm)
                            addStructureItem(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('添加成功！')
                                    this.visible = false
                                    this.init()
                                }else{
                                    this.$message.error(res.message)
                                }
                            })
                        }else{
                            editStructureItem(this.addForm).then(res=>{
                                if(res.code ==0){
                                    this.$message.success('修改成功！')
                                    this.visible = false
                                    this.init()
                                }else {
                                    this.$message.error(res.message)
                                }
                            })
                        }
                    }
                })
            },
            edit(e){
                this.title = 2
                this.visible = true
                getStructureItemDetails(e.id).then(res=>{
                    if(res.code ==0){
                        this.addForm = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            confirm(row,status){
                changeStructureItemStatus(row.id).then(res=>{
                    if(res.code ==0){
                        this.$message.success(status==0?'启用成功！':'禁用成功！')
                        this.init()
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            exportDataEvent () {
                this.$refs.xTable.openExport({
                    // 默认勾选源
                    original: true
                })
            },
            importDataEvent () {
                this.$refs.xTable.importData({
                    remote:true,
                    importMethod:({file, options})=>{
                        console.log(file)
                        console.log(options)
                    }
                })
            },
            search(){
                this.init(this.queryForm)
            },
            handlePageChange3 ({ currentPage, pageSize }) {
                this.queryForm.pageNo = currentPage
                this.queryForm.pageSize = pageSize
                this.init(this.queryForm)
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