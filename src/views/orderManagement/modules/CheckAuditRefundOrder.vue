<template>
    <a-modal :visible="visible" width="85%" :title="title" :footer="null" @cancel="visible = false">
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
            <legend>已支付记录</legend>
            <table class="work_order">
                <tr>
                    <td>（1/12）期支付：</td>
                    <td>支付时间：2020/9/1  14:53:32</td>
                    <td>支付宝交易号：23478392174832146821643473247</td>
                    <td>支付金额：¥1004.50</td>
                </tr>
                <tr>
                    <td>（2/12）期支付：</td>
                    <td>支付时间：2020/9/1  14:53:32</td>
                    <td>支付宝交易号：23478392174832146821643473247</td>
                    <td>支付金额：¥1004.50</td>
                </tr>
            </table>
        </fieldset>
        <fieldset>
            <legend>退款申请</legend>
            <a-descriptions title="" size="middle">
                <a-descriptions-item label="申请时间">
                    2020-10-21  12:23:23
                </a-descriptions-item>
                <a-descriptions-item label="申请金额">
                    ¥ 1004.5
                </a-descriptions-item>
                <a-descriptions-item label="理由">
                    与客户经理协商第二个月不在需要服务
                </a-descriptions-item>
                <a-descriptions-item label="审核意见">
                    <a-radio-group :disabled="title == '查看'?true:false" v-model="agree">
                        <a-radio value="1">同意退款</a-radio>
                        <a-radio value="2">不同意退款</a-radio>
                    </a-radio-group>
                </a-descriptions-item>
            </a-descriptions>
        </fieldset>
        <a-row :gutter="16" v-if="title == '审核'">
            <a-col :span="24" align="center">
                <a-button type="primary">提交</a-button>
                <a-button style="margin-left: 8px">取消</a-button>
            </a-col>
        </a-row>
    </a-modal>
</template>

<script>
    export default {
        name: 'CheckAuditRefundOrder',
        data(){
            return{
                visible:false,
                title:'查看',
                agree:'1'
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