<template>
    <!--        添加/修改门店-->
    <a-modal
        :title="titleTag"
        :visible="visible"
        width="60%"
        @cancel="close"
        :footer="null"
        centered
        ref="ruleForm"
    >
        <a-form-model :model="formData" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:14}" ref="formData">
            <a-form-model-item label="上级区域">
                <a-input disabled v-model="parentName"></a-input>
            </a-form-model-item>
            <a-form-model-item label="门店名称" prop="name">
                <a-input v-model="formData.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="联系方式" prop="phone">
                <a-input v-model="formData.phone"></a-input>
            </a-form-model-item>
            <a-form-model-item label="省/市/区" prop="idcardAddressCode">
                <j-area-linkage v-model="formData.idcardAddressCode" type="select" @getTitle="getArea"/>
            </a-form-model-item>
            <a-form-model-item label="详细地址" prop="address">
                <a-input v-model="formData.address"></a-input>
                <div @click="getAddressKeyword" style="text-decoration: underline;color: red">点击获取门店经纬度</div>
            </a-form-model-item>
            <a-form-model-item label="经度" prop="longitude">
                <a-input v-model="formData.longitude" disabled/>
            </a-form-model-item>
            <a-form-model-item label="纬度" prop="latitude">
                <a-input v-model="formData.latitude" disabled/>
            </a-form-model-item>
            <a-form-model-item label="排序" prop="orders">
                <a-input type="number" v-model="formData.orders"/>
            </a-form-model-item>
            <a-form-model-item label="类型" prop="type">
                <a-radio-group v-model="formData.type">
                    <a-radio :value="2">门店</a-radio>
                </a-radio-group>
            </a-form-model-item>
<!--            <a-form-model-item label="可选负责人">-->
<!--                <a-select v-model="formData.managerId">-->
<!--                    <a-select-option :value="0">-->
<!--                        -->
<!--                    </a-select-option>-->
<!--                    <a-select-option value="zhangsan">-->
<!--                        李四-->
<!--                    </a-select-option>-->
<!--                    <a-select-option value="lisi">-->
<!--                        张三-->
<!--                    </a-select-option>-->
<!--                </a-select>-->
<!--            </a-form-model-item>-->
        </a-form-model>
        <a-row>
            <a-col :offset="4">
                <a-button type="primary" @click="submit">提交</a-button>
                <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
            </a-col>
        </a-row>
    </a-modal>
</template>

<script>
    import JAreaLinkage from '../../../components/jeecg/JAreaLinkage'
    import { addStore } from '../../../api/localApi'
    export default {
        name: 'AddStore',
        components:{
            JAreaLinkage
        },
        props:['storeLocation'],
        data(){
            return{
                titleTag:'添加门店',
                visible:false,
                parentName:'',
                formData:{
                    name:'',
                    orders:1,
                    parentId:null,
                    phone:'',
                    province:'',//省
                    city:'',//市
                    area:'',//区
                    address:'',//详细地址
                    idcardAddressCode:null,//省市区编码
                    status:1,//0闭店，1营业
                    type:2,//1区域,2,门店
                    latitude:'',//纬度
                    longitude:'',//经度
                },
                rules:{
                    name:[{required: true, message: '门店名称不能为空！', trigger: 'blur' }],
                    address:[{required: true, message: '门店详细地址不能为空！', trigger: 'blur' }],
                    orders:[{required: true, message: '排序不能为空！', trigger: 'blur' }],
                    idcardAddressCode:[{required: true, message: '省市区不能为空！', trigger: 'change' }],
                    type:[{required: true, message: '类型不能为空！', trigger: 'change' }],
                    latitude:[{required: true, message: '纬度不能为空！', trigger: 'blur' }],
                    longitude:[{required: true, message: '经度不能为空！', trigger: 'blur' }],
                },
                addMap:null
            }
        },
        created() {

        },
        mounted() {

        },
        methods:{

            //通过地址获得位置
            getAddressKeyword() {
                //通过getLocation();方法获取位置信息值
                // 省市区 + this.formParams.addressKeyword
                if(!this.formData.idcardAddressCode||!this.formData.address){
                    this.$message.error('请选择省市区/填写详细地址！')
                    return false
                }
                let details = this.formData.province +''+ this.formData.city +''+ this.formData.area +''+ this.formData.address
                this.$emit('getPositionCode',details)
            },
            getParents(e){
                this.parentName = e.name
                this.formData.parentId = e.id
            },
            getArea(e){
                console.log(e)
                this.formData.province = e.province
                this.formData.city = e.city
                this.formData.area = e.area
            },
            resetForm(){
                this.$refs.formData.resetFields()
            },
            submit(){
                this.$refs.formData.validate((valid)=>{
                    if(valid){
                        addStore(this.formData).then(res=>{
                            if(res.code ==0){
                                this.$message.success('添加成功！')
                                this.$emit('success')
                                this.visible = false
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }
                })
            },
            close(){
                this.visible = false
            },

        }

    }
</script>

<style scoped>

</style>