<template>
    <a-modal :visible="visible" width="75%" :title="title == 1?'添加商品':'编辑商品'" @cancel="visible = false" :footer="null">
        <a-form-model :model="goodsForm" :labelCol="{span:2}" :wrapperCol="{span:12}" :rules="rules" ref="goodsForm">
            <a-row>
                <a-col :span="24">
                    <a-form-model-item label="所属门店" prop="storeId">
                        <a-select v-model="goodsForm.storeId" @change="selectStore">
                            <a-select-option :value="item.id" v-for="(item,index) in storeList" :key="index">
                                {{item.name}}
                            </a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
<!--                <a-col :span="24">-->
<!--                    <a-form-model-item label="商品号">-->
<!--                        <a-input v-model="goodsForm.goodsNo"></a-input>-->
<!--                    </a-form-model-item>-->
<!--                </a-col>-->
                <a-col :span="24">
                    <a-form-model-item label="商品名称" prop="name">
                        <a-input v-model="goodsForm.name"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="所属类型">
                        <a-radio-group disabled>
                            <a-radio checked>标准服务</a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="商品分类" prop="typeName">
                        <a-select v-model="goodsForm.typeName" @change="getTypeName">
                            <a-select-option :value="item.typeName" v-for="(item,index) in category" key="id">{{item.typeName}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="上架状态" prop="status">
                        <a-radio-group v-model="goodsForm.status">
                            <a-radio :value="1">直接上架</a-radio>
                            <a-radio :value="0">暂不上架</a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="商品属性" prop="skuList">
                        <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                            <a-col :span="5">属性名称</a-col>
                            <a-col :span="5">服务时长</a-col>
                            <a-col :span="5">原价</a-col>
                            <a-col :span="5">现价</a-col>
                            <a-col :span="4">操作</a-col>
                        </a-row>
                        <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in goodsForm.skuList" :key="index">
                            <a-col :span="5">
                                <a-form-model-item>
                                    <a-input placeholder="两小时保洁不擦窗" v-model="goodsForm.skuList[index].name"/>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="5">
                                <a-form-model-item>
                                    <a-input placeholder="打扫时长" v-model="goodsForm.skuList[index].duration" type="number"/>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="5">
                                <a-form-model-item>
                                    <a-input placeholder="原价" v-model="goodsForm.skuList[index].originalPrice" type="number"/>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="5">
                                <a-form-model-item>
                                    <a-input placeholder="现价" v-model="goodsForm.skuList[index].realPrice" type="number"/>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="4">
                                <a-form-model-item>
                                    <a-button @click="addRowCustom" icon="plus"></a-button>&nbsp;
                                    <a-button @click="delRowCustom(index)" icon="minus" v-if="goodsForm.skuList.length>1"></a-button>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="规则协议" prop="protocolId">
                        <a-select v-model="goodsForm.protocolId" :allowClear="true"  @change="getAgree">
<!--                            <a-select-option value="0">请选择</a-select-option>-->
                            <a-select-option :value="item.id" v-for="(item,index) in agree" key="id">{{item.name}}</a-select-option>
                        </a-select>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="推荐服务" prop="recommend">
                        <a-radio-group v-model="goodsForm.recommend">
                            <a-radio :value="1">是</a-radio>
                            <a-radio :value="0">否</a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="推荐排序" prop="sort">
                        <a-input type="number" v-model="goodsForm.sort"></a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="商品图片" prop="pics">
                        <upload-image @change="getAvatarUrl" :files="files"></upload-image>
                    </a-form-model-item>
                </a-col>
                <a-col :span="24">
                    <a-form-model-item label="商品详情" :labelCol="{span:2}" :wrapperCol="{span:22}" prop="details">
                        <j-editor v-model="goodsForm.details" style="width: 100%;"/>
                    </a-form-model-item>
                </a-col>
            </a-row>
            <div style="text-align: right">
                <a-button type="primary" @click="addStandard">提交</a-button>
                <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
            </div>
        </a-form-model>
    </a-modal>
</template>

<script>
    import {addStandard,getCurrentUserStoreInfo,getStandardDetails,editStandard,getCanAgreementList}from'../../../api/localApi'
    import JEditor from '../../../components/jeecg/JEditor'
    import UploadImage from '../../staffManagement/modules/modules/UploadImage'
    import uuid from '../../../utils/uuid'
    export default {
        name: 'AddGoods',
        components:{
            JEditor,
            UploadImage
        },
        data(){
            return{
                title:1,
                visible:false,
                files:[],
                storeList:[],//
                category:[],
                agree:[],
                goodsForm:{
                    storeName:'',//门店名称
                    // goodsNo:'',
                    storeId:'',//门店id
                    name:'',//商品名称
                    typeId:null,//服务分类，1一次性保洁2钟点工3开荒4收纳5日常烹饪
                    //goodsCategory:'',
                    skuList:[//子商品sku列表
                        {duration:null,name:null,originalPrice:null,realPrice:null}
                    ],
                    recommend:1,//是否推荐服务
                    details:'',//富文本详情
                    protocolId:null,//协议id
                    protocolName:'',//协议名称
                    pics:"",//商品图片
                    sort:1,//推荐服务排序
                    status:1,//状态，0已下架1已上架
                    typeName:''
                },
                rules:{
                    storeId:[{required:true,message:'请选择所属门店！',trigger:'change'}],
                    name:[{required:true,message:'请输入商品名称！',trigger:'blur'}],
                    typeId:[{required:true,message:'请选择商品分类！',trigger:'change'}],
                    skuList:[{required:true,message:'商品属性不能为空！',trigger:'blur'}],
                    pics:[{required:true,message:'请添加商品图片！',trigger:'change'}],
                    details:[{required:true,message:'请添加商品详情！',trigger:'blur'}]
                }
            }
        },
        mounted() {
            this.getUserStoreInfo()
            this.getAgreeList()
        },
        methods:{
            // 获取当前登录用户所属那些门店
            getUserStoreInfo(){
                getCurrentUserStoreInfo().then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.storeList = res.data
                    }
                })
            },
            //获取可用的协议列表
            getAgreeList(){
                getCanAgreementList().then(res=>{
                    if(res.code ==0){
                        this.agree = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            //获取标准服务详情
            getStandardInfo(id){
                this.files = []
                getStandardDetails(id).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.goodsForm = res.data
                        let obj = {
                            uid:uuid(),
                            name: 'XXXX.png',
                            status: 'done',
                            url:res.data.pics
                        }
                        this.files.push(obj)
                    }
                })
            },
            selectStore(value,options){
                this.goodsForm.storeName = this.storeList.find((item)=>item.id == value).name
                // console.log(this.formPartThree)
            },
            getTypeName(value,options){
                console.log(value,options)
                this.goodsForm.typeId = this.category.find((item)=>item.typeName == value).id
            },
            getAgree(value,options){
                this.goodsForm.protocolName = this.agree.find((item)=>item.id == value).name
            },
            //获取上传的商品图片
            getAvatarUrl(data){
                // console.log(data)
                this.goodsForm.pics = data[0].url
            },
            addRowCustom () {
                this.goodsForm.skuList.push({duration:null,name:'',originalPrice:null,realPrice:null});
            },
            delRowCustom (index) {
                this.goodsForm.skuList.splice(index,1);
            },
            addStandard(){
                let that = this
                // console.log(this.goodsForm)
                if(that.goodsForm.skuList.length<=0){
                    that.$message.error('商品属性不能为空！')
                }else{
                    let list = [...that.goodsForm.skuList]
                    for (let i = 0;i<list.length;i++){
                        let obj = list[i]
                        if(obj['duration'] == ''||obj['duration'] == undefined||obj['duration'] == null){
                            that.$message.error('服务时长不能为空！')
                            return false
                        }
                        if(obj['name'] == ''||obj['name'] == undefined||obj['name'] == null){
                            that.$message.error('属性名称不能为空！')
                            return false
                        }
                        if(obj['originalPrice'] == ''||obj['originalPrice'] == undefined||obj['originalPrice'] == null){
                            that.$message.error('商品原价不能为空！')
                            return false
                        }
                        if(obj['realPrice'] == ''||obj['realPrice'] == undefined||obj['realPrice'] == null){
                            that.$message.error('商品现价不能为空！')
                            return false
                        }
                    }
                }
                that.$delete(that.goodsForm,'type')
                that.$refs.goodsForm.validate((valid)=>{
                    if(valid){
                        if(that.title ==1){
                            addStandard(that.goodsForm).then(res=>{
                                if(res.code == 0){
                                    that.$message.success('添加成功！')
                                    that.visible = false
                                    that.$emit('success')
                                }else {
                                    that.$message.error(res.message)
                                }
                            })
                        }else{
                            editStandard(that.goodsForm).then(res=>{
                                if(res.code == 0){
                                    that.$message.success('编辑成功！')
                                    that.visible = false
                                    that.$emit('success')
                                }else {
                                    that.$message.error(res.message)
                                }
                            })
                        }
                    }
                })
            },
            resetForm(){
                this.files = []
                this.goodsForm.skuList=[{duration:null,name:null,originalPrice:null,realPrice:null}]
                this.$refs.goodsForm.resetFields()
                this.deleteAttr()
            },
            // 添加的时候，删除id，createId，createName，createTime，updateId，updateName，updateTime
            deleteAttr(){
                this.$delete(this.goodsForm,'id')
                this.$delete(this.goodsForm,'createId')
                this.$delete(this.goodsForm,'createName')
                this.$delete(this.goodsForm,'createTime')
                this.$delete(this.goodsForm,'updateId')
                this.$delete(this.goodsForm,'updateName')
                this.$delete(this.goodsForm,'updateTime')
            },
        }
    }
</script>

<style>
    .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
    }
</style>

<style scoped>

</style>