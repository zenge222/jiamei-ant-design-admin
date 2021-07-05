<template>
    <!--        添加/修改门店-->
    <div>
        <a-form-model :model="formData" :rules="rules" :label-col="{span:4}" :wrapper-col="{span:14}" ref="formData">
            <a-form-model-item label="上级地区">
                <a-tree-select
                    style="width:100%"
                    :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                    :treeData="treeData"
                    disabled
                    v-model="formData.parentId"
                    placeholder="无">
                </a-tree-select>
            </a-form-model-item>
            <a-form-model-item label="门店名称" prop="name">
                <a-input v-model="formData.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="联系方式" prop="phone">
                <a-input v-model="formData.phone"></a-input>
            </a-form-model-item>
            <a-form-model-item label="省/市/区" prop="code">
                <j-area-linkage v-model="formData.code" type="select" @getTitle="getArea"/>
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
            <!--            <a-form-model-item label="规划区域">-->
            <!--                <a-button type="primary" @click="flagStartPlan = true">开始规划</a-button>-->
            <!--                <a-button type="primary" style="margin-left: 8px" id="endPlan">重新规划</a-button>-->
            <!--                <span style="margin-left: 8px">备注：点击开始规划或者重新规划，在圈点位置，双击结束圈点</span>-->
            <!--            </a-form-model-item>-->
            <div id="map" style="width:100%;height:0px"></div>
        </a-form-model>
        <a-row>
            <a-col :offset="4">
                <a-button type="primary" @click="submit">提交</a-button>
                <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import maps from "qqmap";
    import JAreaLinkage from '../../../components/jeecg/JAreaLinkage'
    import { editStore } from '../../../api/localApi'
    export default {
        name: 'EditStore',
        components:{
            JAreaLinkage
        },
        data(){
            return{
                titleTag:'添加门店',
                visible:true,
                parentName:'',
                treeData:[],
                formData:{
                    name:'',
                    orders:1,
                    parentId:null,
                    phone:'',
                    province:'',//省
                    city:'',//市
                    area:'',//区
                    address:'',//详细地址
                    code:null,//省市区编码
                    status:1,//0闭店，1营业
                    type:2,//1区域,2,门店
                    latitude:'',//纬度
                    longitude:'',//经度
                },
                rules:{
                    name:[{required: true, message: '门店名称不能为空！', trigger: 'blur' }],
                    address:[{required: true, message: '门店详细地址不能为空！', trigger: 'blur' }],
                    orders:[{required: true, message: '排序不能为空！', trigger: 'blur' }],
                    code:[{required: true, message: '省市区不能为空！', trigger: 'change' }],
                    type:[{required: true, message: '类型不能为空！', trigger: 'change' }],
                    latitude:[{required: true, message: '纬度不能为空！', trigger: 'blur' }],
                    longitude:[{required: true, message: '经度不能为空！', trigger: 'blur' }],
                },
                //腾讯地图
                areaObj:{},
                map: null,
                getAddress: null,
                getAddCode: null,
                flagStartPlan:false,
                path:[]
            }
        },
        created() {

        },
        mounted() {
            this.init()
        },
        methods:{
            //初始化地图
            init() {
                let that = this;
                maps.init("D5OBZ-24A6F-2LNJZ-NLPJ6-TW6VE-M7FJ5", () => {

                    let center = new qq.maps.LatLng(39.916527,116.397128);
                    let myOptions = {
                        center: center,
                        zoom: 13,
                        disableDoubleClickZoom: true,
                        mapTypeId: qq.maps.MapTypeId.ROADMAP
                    };
                    let path1=[];
                    let polyline = new qq.maps.Polyline({
                        path: path1,
                        strokeColor: '#000000',
                        strokeWeight: 5,
                        editable:false,
                        map: that.map
                    });
                    let polygon = new qq.maps.Polygon({
                        path:path1,
                        strokeColor: '#000000',
                        strokeWeight: 5,
                        fillColor: qq.maps.Color.fromHex("#FECC75", 0.5),
                        map: that.map
                    });
                    that.map = new qq.maps.Map(
                        window.document.getElementById("map"),
                        myOptions
                    );
                    // //获取点击后的地址,并生成线段
                    qq.maps.event.addListener(that.map, "click", function(event) {
                        // 获取点击后的地图坐标
                        // console.log(event.latLng.lng,event.latLng.lat);
                        polyline.setMap(that.map);
                        if(that.flagStartPlan){
                            path1.push(new qq.maps.LatLng(event.latLng.lat, event.latLng.lng))
                            polyline.setPath(path1);
                        }else{
                            that.$message.error('请先点击开始规划按钮！');
                            return
                        }
                    });
                    //双击生成区域范围圈
                    qq.maps.event.addListener(that.map, "dblclick", function(event) {
                        // 获取点击后的地图坐标
                        polygon.setMap(that.map);
                        polygon.setPath(path1);
                        console.log(path1)
                    });
                    //重新规划
                    let endPlan = window.document.getElementById("endPlan");
                    qq.maps.event.addListener(endPlan, "click", function(event) {
                        that.flagStartPlan = true
                        path1 = []
                        polyline.setMap(null);
                        polygon.setMap(null);
                    });

                    let marker = new qq.maps.Marker({
                        map: that.map,
                        position: center
                    });
                    //调用地址显示地图位置并设置地址
                    that.getAddress = new qq.maps.Geocoder({
                        complete: function(result) {
                            that.map.setCenter(result.detail.location);
                            that.formData.longitude = result.detail.location.lng;
                            that.formData.latitude = result.detail.location.lat;
                            marker.setPosition(result.detail.location);
                            // console.log("获取经纬度");
                            // console.log(result.detail.location);
                            // var marker = new qq.maps.Marker({
                            //   map: that.map,
                            //   position: result.detail.location
                            // });
                        }
                    });
                    //通过坐标来显示地图地址
                    that.getAddCode = new qq.maps.Geocoder({
                        complete: function(result) {
                            that.formData.addressDetail = result.detail.address;
                        }
                    });
                });
            },
            //通过地址获得位置
            getAddressKeyword() {
                //通过getLocation();方法获取位置信息值
                // 省市区 + this.formParams.addressKeyword
                if(!this.formData.code||!this.formData.address){
                    this.$message.error('请选择省市区/填写详细地址！')
                    return false
                }
                let details = this.formData.province +''+ this.formData.city +''+ this.formData.area +''+ this.formData.address
                // console.log(details)
                this.getAddress.getLocation(details);
                // 调用自带的接口;
            },

            // 通过坐标获得地址
            // getAddressCode() {
            //     var lat = parseFloat(this.shopInfo.lat);
            //     var lng = parseFloat(this.shopInfo.lng);
            //     var latLng = new qq.maps.LatLng(lat, lng);
            //     //调用获取位置方法
            //     this.getAddCode.getAddress(latLng);
            // },
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
                        editStore(this.formData).then(res=>{
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
        }

    }
</script>

<style scoped>

</style>