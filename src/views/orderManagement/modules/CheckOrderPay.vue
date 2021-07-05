<template>
    <a-modal :visible="visible" width="85%" :footer="null" title="查看订单" @cancel="cancel">
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
                    定制订单
                </a-descriptions-item>
                <a-descriptions-item label="商品名">
                    定制服务日常保洁
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
            <legend>工单信息</legend>
            <a-descriptions title="" size="middle">
                <a-descriptions-item label="服务时长">
                    12个月
                </a-descriptions-item>
                <a-descriptions-item label="开始时间">
                    2020年03月24 星期二  14:00
                </a-descriptions-item>
                <a-descriptions-item label="服务周期">
                    星期一  星期三   星期六
                </a-descriptions-item>
                <a-descriptions-item label="每次服务时长">
                    2小时
                </a-descriptions-item>
                <a-descriptions-item label="总服务累计时长">
                    208小时
                </a-descriptions-item>
            </a-descriptions>
            <a-collapse v-model="activeKey" style="background: white">
                <a-collapse-panel key="1">
                    <div slot="header">厨房</div>
                    <table class="work_order">
                        <tr>
                            <td>地面</td>
                            <td>标准清洁</td>
                            <td>表层清洁</td>
                            <td>吸尘器、拖把</td>
                            <td>中性清洁剂</td>
                            <td>地面触摸光滑、无杂质、无污染</td>
                            <td>红木</td>
                            <td>每次</td>
                        </tr>
                        <tr>
                            <td>槽门</td>
                            <td>标准清洁</td>
                            <td>表层清洁</td>
                            <td>吸尘器、拖把</td>
                            <td>中性清洁剂</td>
                            <td>地面触摸光滑、无杂质、无污染</td>
                            <td>红木</td>
                            <td>隔7天</td>
                        </tr>
                        <tr>
                            <td>水槽</td>
                            <td>标准清洁</td>
                            <td>表层清洁</td>
                            <td>吸尘器、拖把</td>
                            <td>中性清洁剂</td>
                            <td>地面触摸光滑、无杂质、无污染</td>
                            <td>红木</td>
                            <td>隔7天</td>
                        </tr>
                        <tr>
                            <td>灶具</td>
                            <td>标准清洁</td>
                            <td>表层清洁</td>
                            <td>吸尘器、拖把</td>
                            <td>中性清洁剂</td>
                            <td>地面触摸光滑、无杂质、无污染</td>
                            <td>红木</td>
                            <td>每次</td>
                        </tr>
                        <tr>
                            <td>冰箱</td>
                            <td>标准清洁</td>
                            <td>表层清洁</td>
                            <td>吸尘器、拖把</td>
                            <td>中性清洁剂</td>
                            <td>地面触摸光滑、无杂质、无污染</td>
                            <td>红木</td>
                            <td>每次</td>
                        </tr>
                    </table>
                </a-collapse-panel>
                <a-collapse-panel key="2">
                    <div slot="header">卧室</div>
                    <div>卧室</div>
                </a-collapse-panel>
            </a-collapse>
        </fieldset>
        <fieldset>
            <legend>支付信息</legend>
            <a-descriptions title="" size="middle">
                <a-descriptions-item label="服务费用">
                    ￥12064.00
                </a-descriptions-item>
                <a-descriptions-item label="优惠金额">
                    ￥10
                </a-descriptions-item>
                <a-descriptions-item label="备注">
                    使用线下10元优惠券
                </a-descriptions-item>
                <a-descriptions-item label="实付款">
                    ￥12054.00
                </a-descriptions-item>
                <a-descriptions-item label="支付方式">
                    全款/按月支付
                </a-descriptions-item>
                <a-descriptions-item label="本期支付">
                    ¥1004.50
                </a-descriptions-item>
                <a-descriptions-item label="月结支付时间">
                    每月1号
                </a-descriptions-item>
                <a-descriptions-item label="支付状态">
                    已支付
                </a-descriptions-item>
                <a-descriptions-item label="支付交易号">
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
            <legend>服务记录表</legend>
            <a-table
                bordered
                rowKey="id"
                size="small"
                :pagination="pagination"
                :loading="loading"
                :columns="columns"
                :data-source="dataSource">
              <span slot="action" slot-scope="text, record">
                    <a @click="handleCheck(record)">查看评论</a>
              </span>
            </a-table>
        </fieldset>
        <a-modal width="50%" title="查看评论" :visible="rateVisible" @cancel="rateVisible = false" :footer="null">
            <fieldset>
                <legend>评论详情</legend>
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
            <fieldset>
                <legend>评分</legend>
                <a-form layout="inline">
                    <a-row>
                        <a-col :span="24">
                            <a-form-item label="主卧">
                                5分
                            </a-form-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-item label="次卧">
                                5分
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </fieldset>
        </a-modal>
    </a-modal>
</template>

<script>
    export default {
        name: 'CheckOrderPay',
        data(){
            return{
                visible:false,
                activeKey: ['1'],
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
                    { title: '阿姨姓名', align:"center", dataIndex: 'auntsName' },
                    { title: '手机号', align:"center", dataIndex: 'telPhone' },
                    { title: '日期', align:"center", dataIndex: 'date'},
                    { title: '开始时间', align:"center", dataIndex: 'startTime'},
                    { title: '结束时间', align:"center", dataIndex: 'endTime'},
                    { title: '工作时长', align:"center", dataIndex: 'workLong'},
                    { title: '状态', align:"center", dataIndex: 'status',customRender:(text)=>{
                            return text == 0?'完成':'进行中'
                        }},
                    { title: '操作', dataIndex: 'action', align:"center", scopedSlots: { customRender: 'action' }, }
                ],
                dataSource:[
                    { id: '1', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:0},
                    { id: '2', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:1},
                    { id: '3', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:1},
                    { id: '4', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:0},
                    { id: '5', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:0},
                    { id: '6', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:1},
                    { id: '7', auntsName: '李阿姨', telPhone:'19912345689', date: '2020-03-29',orderType:0,startTime:'08:34',endTime:'11:36', workLong:'3小时02分',status:0},
                ],
                rateVisible:false,
                rateShow:''
            }
        },
        methods:{
            cancel(){
                this.visible = false
            },
            handleCheck(){
                this.rateVisible = true
            },
        }
    }
</script>

<style scoped lang="less">
    fieldset{
        border:1px solid #dddddd;padding: 12px;border-radius: 4px;margin-bottom: 30px
    }
    legend{
        font-size: 14px;color: #0c8fcf;display: inline;width: auto;font-weight: 600
    }
    .work_order{
        width: 100%;
        tr{
            td{
                text-align: center;
            }
        }
    }
</style>