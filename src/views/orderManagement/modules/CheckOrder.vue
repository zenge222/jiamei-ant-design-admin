<template>
    <a-modal :visible="visible" width="50%" title="订单信息" :footer="null" @cancel="visible = false">
        <a-form-model :labelCol="{span:4}" :wrapperCol="{span:20}">
            <a-row>
                <a-col :span="12">
                    <a-form-model-item label="面试时间" v-if="orderObj.orderType == 0">
                        <span>2020年10月20日  星期二  9:00</span>
                    </a-form-model-item>
                    <a-form-model-item label="预计上门时间" v-if="orderObj.orderType == 1">
                        <span>2020年10月20日  星期二  9:00</span>
                    </a-form-model-item>
                    <a-form-model-item label="面试地址" v-if="orderObj.orderType == 0">
                        <div>刘先生  15173629283</div>
                        <div>鄞州区金融大厦-B座3层308室</div>
                        <div>浙江省宁波市鄞州区首南西路88号</div>
                    </a-form-model-item>
                    <a-form-model-item label="服务地址" v-if="orderObj.orderType == 1">
                        <div>刘先生  15173629283</div>
                        <div>鄞州区金融大厦-B座3层308室</div>
                        <div>浙江省宁波市鄞州区首南西路88号</div>
                    </a-form-model-item>
                    <a-form-model-item label="订单编码">
                        <span>SHJA20201120010001</span>
                    </a-form-model-item>
                    <a-form-model-item label="订单类型">
                        <span>{{orderObj.orderType == 0?'定制订单':'标准订单'}}</span>
                    </a-form-model-item>
                    <a-form-model-item label="服务名称" v-if="orderObj.orderType == 1">
                        <span>家政保洁上门新房开荒家庭深度保洁服务单</span>
                    </a-form-model-item>
                    <a-form-model-item label="房间面积" v-if="orderObj.orderType == 0">
                        <span>131㎡~150㎡</span>
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="服务内容" v-if="orderObj.orderType == 1">
                        <span>2小时保洁不擦窗</span>
                    </a-form-model-item>
                    <a-form-model-item label="家庭人数" v-if="orderObj.orderType == 0">
                        <span>2人</span>
                    </a-form-model-item>
                    <a-form-model-item label="宠物" v-if="orderObj.orderType == 0">
                        <span>无</span>
                    </a-form-model-item>
                    <a-form-model-item label="备注信息" v-if="orderObj.orderType == 1">
                        <span>无</span>
                    </a-form-model-item>
                    <a-form-model-item label="订单总价" v-if="orderObj.orderType == 1">
                        <span>￥166</span>
                    </a-form-model-item>
                    <a-form-model-item label="实付款" v-if="orderObj.orderType == 1">
                        <span>￥166</span>
                    </a-form-model-item>
                    <a-form-model-item label="微信交易号" v-if="orderObj.orderType == 1">
                        <span>202010222200113364574711136</span>
                    </a-form-model-item>
                    <a-form-model-item label="创建时间" v-if="orderObj.orderType == 1">
                        <span>2020-10-22  11:02:58</span>
                    </a-form-model-item>
                    <a-form-model-item label="订单状态">
                        <span>{{orderObj.orderStatus == 0?'待确认':(orderObj.orderStatus == 1?'待分配':'待面试')}}</span>
                    </a-form-model-item>
                    <a-form-model-item label="区域经理"  v-if="orderObj.orderStatus == 1||orderObj.orderStatus == 2">
                        <span>解迎夏       18279998888</span>
                    </a-form-model-item>
                    <a-form-model-item label="服务技师"  v-if="orderObj.orderType == 0&&orderObj.orderStatus == 2">
                        <span>白曼安       19988889999</span>
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>

<script>
    // 1==标准 0==定制;
    // 0==待确认 1==分配 2==待面试
    export default {
        name: 'CheckOrder',
        data(){
            return{
                visible:false,
                orderObj:{}
            }
        },
        mounted() {

        },
        methods:{
            init(e){
                this.orderObj = e
            }
        }
    }
</script>

<style scoped>

</style>