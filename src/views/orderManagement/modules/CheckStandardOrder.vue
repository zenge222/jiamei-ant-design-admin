<template>
    <a-modal :visible="visible" width="80%" :footer="null" title="查看订单" @cancel="visible = false">
        <fieldset>
            <legend>订单信息</legend>
            <a-descriptions title="" size="middle">
                <a-descriptions-item label="订单编号">
                    2932832193281923821
                </a-descriptions-item>
                <a-descriptions-item label="订单状态">
                    待支付
                </a-descriptions-item>
                <a-descriptions-item label="订单类型">
                    标准订单
                </a-descriptions-item>
                <a-descriptions-item label="商品名">
                    家政保洁上门 新房开荒 家庭深度保洁服务
                </a-descriptions-item>
                <a-descriptions-item label="客户姓名">
                    刘先生
                </a-descriptions-item>
                <a-descriptions-item label="客户手机">
                    15188888888
                </a-descriptions-item>
                <a-descriptions-item label="服务地址">
                    浙江省宁波市鄞州区首南西路88号鄞州金融大厦B座3层308室
                </a-descriptions-item>
                <a-descriptions-item label="备注">
                    家里有老人、小孩
                </a-descriptions-item>
                <a-descriptions-item label="服务阿姨">
                    李阿姨   19988889999
                </a-descriptions-item>
                <a-descriptions-item label="区域经理">
                    张经理   19988889999
                </a-descriptions-item>
            </a-descriptions>
        </fieldset>
        <fieldset>
            <legend>商品详情</legend>
            <a-descriptions title="" size="middle">
                <a-descriptions-item label="服务内容">
                    三小时保洁不擦玻璃
                </a-descriptions-item>
                <a-descriptions-item label="价格">
                    待支付
                </a-descriptions-item>
                <a-descriptions-item label="预计上门时间">
                    2020年10月28日 星期三  13:00
                </a-descriptions-item>
                <a-descriptions-item label="服务时长">
                    3小时
                </a-descriptions-item>
            </a-descriptions>
        </fieldset>
        <fieldset>
            <legend>支付信息</legend>
            <a-descriptions title="" size="middle">
                <a-descriptions-item label="服务费用">
                    ¥12054.00
                </a-descriptions-item>
                <a-descriptions-item label="实付款">
                    ¥12054.00
                </a-descriptions-item>
                <a-descriptions-item label="支付状态">
                    已支付
                </a-descriptions-item>
                <a-descriptions-item label="微信交易号">
                    23478392174832146821643473247
                </a-descriptions-item>
                <a-descriptions-item label="创建时间">
                    2020-10-23    11:23:34
                </a-descriptions-item>
            </a-descriptions>
        </fieldset>
        <fieldset>
            <legend>评论信息</legend>
            <a-form layout="inline">
                <a-row>
                    <a-col :span="24">
                        <a-form-item label="综合评分">
                            <a-radio-group v-model="rateShow">
                                <a-radio value="0">展示</a-radio>
                                <a-radio value="1">不展示</a-radio>
                            </a-radio-group>
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="服务质量">
                            <a-rate :default-value="5" disabled />非常好
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-item label="文字评论">
                            保洁阿姨非常专业，准时，服务体验很好
                        </a-form-item>
                    </a-col>
                    <a-col :span="24">
                        <img src="" alt="" width="120px" height="80px">
                    </a-col>
                </a-row>
            </a-form>
        </fieldset>
    </a-modal>
</template>

<script>
    export default {
        name: 'CheckStandardOrder',
        data(){
            return{
                visible:false,
                rateShow:0
            }
        }
    }
</script>

<style scoped>
    fieldset{
        border:1px solid #dddddd;padding: 12px;border-radius: 4px;margin-bottom: 30px
    }
    legend{
        font-size: 14px;color: #0c8fcf;display: inline;width: auto;font-weight: 600
    }
</style>