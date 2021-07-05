<template>
    <a-card :bordered="false">
        <a-row :gutter="16">
            <a-col :span="8">
                <div style="margin-bottom: 8px">
                    <a-button type="primary" @click="addProvince">添加省/直辖市</a-button>
                    <a-button type="primary" @click="addCity">添加市/区/县</a-button>
                    <a-button type="primary" @click="addStore">添加门店</a-button>
                </div>
                <a-alert type="info" :showIcon="true">
                    <div slot="message">
                        当前选择：<span v-if="this.currSelected.title">{{ getCurrSelectedTitle() }}</span>
                        <a v-if="this.currSelected.title" style="margin-left: 10px" @click="onClearSelected">取消选择</a>
                    </div>
                </a-alert>
                <a-tree
                    v-model="checkedKeys"
                    checkable
                    :selected-keys="selectedKeys"
                    :tree-data="treeData"
                    :expandedKeys="iExpandedKeys"
                    :autoExpandParent="autoExpandParent"
                    @select="onSelect"
                    @expand="onExpand"
                />
            </a-col>
            <a-col span="14" :offset="2">
                <a-tabs defaultActiveKey="1">
                    <a-tab-pane tab="基本信息" key="1">
                        <a-form-model :model="editObj" ref="editObj" :labelCol="{span:4}" :wrapperCol="{span:14}" :rules="rules" v-show="editObj.id">
                            <a-form-model-item label="区域/门店名称" prop="name">
                                <a-input placeholder="输入区域/门店名称" v-model="editObj.name"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="上级地区">
                                <a-tree-select
                                    style="width:100%"
                                    :dropdownStyle="{maxHeight:'200px',overflow:'auto'}"
                                    :treeData="treeData"
                                    disabled
                                    v-model="editObj.parentId"
                                    placeholder="无">
                                </a-tree-select>
                            </a-form-model-item>
                            <a-form-model-item label="省/市/区" :prop="editObj.type ==2?'idcardAddressCode':''" v-show="editObj.type ==2">
                                <j-area-linkage v-model="editObj.idcardAddressCode" type="select" @getTitle="getArea"/>
                            </a-form-model-item>
                            <a-form-model-item label="详细地址" :prop="editObj.type ==2?'address':''" v-show="editObj.type ==2">
                                <a-input v-model="editObj.address"></a-input>
                                <div @click="getAddressKeyword" style="text-decoration: underline;color: red">点击获取门店经纬度</div>
                            </a-form-model-item>
                            <a-form-model-item label="经度" v-show="editObj.type ==2">
                                <a-input v-model="editObj.longitude" disabled/>
                            </a-form-model-item>
                            <a-form-model-item label="纬度" v-show="editObj.type ==2">
                                <a-input v-model="editObj.latitude" disabled/>
                            </a-form-model-item>
                            <a-form-model-item label="类型">
                                <a-radio-group v-model="editObj.type" disabled>
                                    <a-radio :value="1">地区</a-radio>
                                    <a-radio :value="2">门店</a-radio>
                                </a-radio-group>
                            </a-form-model-item>
                            <a-form-model-item label="排序" prop="orders">
                                <a-input type="number" v-model="editObj.orders"></a-input>
                            </a-form-model-item>
                            <a-form-model-item label="规划区域" v-show="editObj.type ==2">
                                <a-button type="primary" @click="startPlan">开始规划</a-button>
                                <a-button type="primary" style="margin-left: 8px" id="endPlan">重新规划</a-button>
                                <span style="margin-left: 8px">备注：点击开始规划或者重新规划，在圈点位置，双击结束圈点</span>
                            </a-form-model-item>
                            <div id="map" style="width:100%;height:500px" v-show="editObj.type ==2"></div>
                            <a-row style="margin-top: 60px">
                                <a-col :offset="4">
                                    <a-button type="primary" @click="submit">提交</a-button>
                                    <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
                                </a-col>
                            </a-row>
                        </a-form-model>
                        <a-empty v-show="!editObj.id">
                            <span slot="description">请选择区域/门店</span>
                        </a-empty>
                    </a-tab-pane>
                </a-tabs>
            </a-col>
        </a-row>
        <add-province ref="AddProvince" @success="init"></add-province>
        <add-citys ref="AddCitys" @success="init"></add-citys>
        <Add-store ref="AddStore" @success="init" @getPositionCode="getStoreLocation"></Add-store>
    </a-card>
</template>
<script>
    import maps from "qqmap";
    import JAreaLinkage from '../../components/jeecg/JAreaLinkage'
    import AddCitys from './modules/AddCitys'
    import AddStore from './modules/AddStore'
    import AddProvince from './modules/AddProvince'
    import { editStore, getAllStoreList}from'../../api/localApi'
    export default {
        components:{AddStore,AddProvince,AddCitys,JAreaLinkage},
        data() {
            return {
                autoExpandParent:true,
                iExpandedKeys:[],
                checkedKeys: [],
                selectedKeys: [],
                treeData:[],
                currSelected: {},
                storeLocation:{},
                visible:false,
                showMaps:false,
                editObj:{
                    id:'',
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
                    areasList:[]
                },
                rules:{
                    name:[{required: true, message: '门店名称不能为空！', trigger: 'blur' }],
                    address:[{required: true, message: '门店详细地址不能为空！', trigger: 'blur' }],
                    orders:[{required: true, message: '排序不能为空！', trigger: 'blur' }],
                    idcardAddressCode:[{required: true, message: '省市区不能为空！', trigger: 'change' }],
                },
                //腾讯地图
                map: null,
                getAddress: null,
                getAddCode: null,
                flagStartPlan:false,
                path:[],
            };
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val);
            },
        },
        mounted() {
            this.init()
            this.initMap()
        },
        methods: {
            setThisExpandedKeys(node) {
                if (node.children && node.children.length > 0) {
                    this.iExpandedKeys.push(node.key)
                    for (let a = 0; a < node.children.length; a++) {
                        this.setThisExpandedKeys(node.children[a])
                    }
                }
            },
            init(){
                getAllStoreList().then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.treeData = res.data
                        if(res.data.length>0){
                            for (let i = 0;i<res.data.length;i++){
                                this.setThisExpandedKeys(res.data[i])
                            }
                        }
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            initMap(){
                let that = this;
                maps.init("D5OBZ-24A6F-2LNJZ-NLPJ6-TW6VE-M7FJ5", () => {

                    let center = new qq.maps.LatLng(that.editObj.latitude,that.editObj.longitude);
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
                        if(path1.length<3){
                            that.$message.error('至少选择三个点！')
                            return false
                        }else{
                            polygon.setMap(that.map);
                            polygon.setPath(path1);
                            let areasList = []
                            for (let i = 0;i<path1.length;i++){
                                let obj = {}
                                obj['latitude'] = path1[i].lat
                                obj['longitude'] = path1[i].lng
                                areasList.push(obj)
                            }
                            that.editObj.areasList = areasList
                        }
                        // console.log(path1)
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
                            // console.log("获取经纬度");
                            that.map.setCenter(result.detail.location);
                            that.editObj.longitude = result.detail.location.lng;
                            that.editObj.latitude = result.detail.location.lat;
                            that.storeLocation = result.detail.location
                            marker.setPosition(result.detail.location);
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
                            // console.log(result)
                            that.map.setCenter(result.detail.location);
                            marker.setPosition(result.detail.location);
                        }
                    });
                });
            },
            startPlan(){
                this.flagStartPlan = true
                window.document.getElementById("endPlan").click()
            },
            //添加门店时根据地址获取坐标
            getStoreLocation(e){
                this.getAddress.getLocation(e)
                setTimeout(()=>{
                    this.$refs.AddStore.formData.longitude = this.storeLocation.lng
                    this.$refs.AddStore.formData.latitude = this.storeLocation.lat
                },100)
            },
            //根据地质获取坐标
            getAddressKeyword() {
                //通过getLocation();方法获取位置信息值
                // 省市区 + this.formParams.addressKeyword
                if(!this.editObj.idcardAddressCode||!this.editObj.address){
                    this.$message.error('请选择省市区/填写详细地址！')
                    return false
                }
                let details = this.editObj.province +''+ this.editObj.city +''+ this.editObj.area +''+ this.editObj.address
                // console.log(details)
                this.getAddress.getLocation(details);
                // 调用自带的接口;
            },
            //
            // 通过坐标获得地址
            getAddressCode() {
                var lat = parseFloat(this.editObj.latitude);
                var lng = parseFloat(this.editObj.longitude);
                var latLng = new qq.maps.LatLng(lat, lng);
                //调用获取位置方法
                this.getAddCode.getAddress(latLng);
            },
            getArea(e){
                console.log(e)
                this.editObj.province = e.province
                this.editObj.city = e.city
                this.editObj.area = e.area
            },
            onExpand(expandedKeys) {
                console.log('onExpand', expandedKeys)
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.iExpandedKeys = expandedKeys
                this.autoExpandParent = false
            },
            onCheck(checkedKeys) {
                console.log('onCheck', checkedKeys);
                this.checkedKeys = checkedKeys;
            },
            onSelect(selectedKeys, e) {
                // console.log('onSelect', e);
                let record = e.node.dataRef
                console.log('onSelect-record', record)
                this.currSelected = Object.assign({}, record)
                this.editObj = Object.assign({}, record)
                this.selectedKeys = [record.key]
                if(this.editObj.type ==2){
                    this.getAddressCode()
                }
            },
            getCurrSelectedTitle() {
                return !this.currSelected.title ? '' : this.currSelected.title
            },
            onClearSelected() {
                this.checkedKeys = []
                this.currSelected = {}
                this.selectedKeys = []
                this.editObj.id = ''
            },
            addStore(){
                if(!this.currSelected.id || this.currSelected.type != 1){
                    this.$message.error('请先选择上级区域！')
                    return false
                }
                this.$refs.AddStore.visible = true
                this.$refs.AddStore.getParents(this.currSelected)
            },
            addProvince(){
                this.$refs.AddProvince.visible = true
            },
            addCity(){
                if(!this.currSelected.id || this.currSelected.type != 1){
                    this.$message.error('请先选择上级区域！')
                    return false
                }
                this.$refs.AddCitys.visible = true
                this.$refs.AddCitys.getParents(this.currSelected)
            },
            submit(){
                this.$refs.editObj.validate((valid)=>{
                    if(valid){
                        editStore(this.editObj).then(res=>{
                            if(res.code ==0){
                                this.$message.success('修改成功！')
                                this.flagStartPlan = false
                                this.init()
                            }else{
                                this.$message.error(res.message)
                            }
                        })
                    }
                })
            },
            resetForm(){
                this.$refs.editObj.resetFields()
            },
        },
    };
</script>
<style scoped>
    /** Button按钮间距 */
    .ant-btn {
        margin-left: 3px
    }
</style>