<template>
    <a-modal :visible="visible" width="65%" title="服务日历" @cancel="visible = false" :footer="null">
        <a-row>
            <a-col :span="10">
<!--                <span>你选择的日期：{{selectedValue && selectedValue.format('YYYY-MM-DD')}} {{getWeekDay}}</span>-->
                <a-calendar :value="value" @select="onSelect" @panelChange="onPanelChange" style="text-align: center">
                    <div slot="dateFullCellRender"  slot-scope="value">
                        <div class="date_items" :class="getListData(value)==3?'hasDownCompleted':(getListData(value)==1?'notStart':'')">{{value.format('DD')}}</div>
                    </div>
                </a-calendar>
                <a-row>
                    <a-col :span="6" align="center">
                        <span style="width: 30px;height: 30px;border-radius: 30px;background: #FF6633;display: inline-block;vertical-align: middle"></span>
                        <span style="vertical-align: middle;margin-left: 10px">待服务</span>
                    </a-col>
                    <a-col :span="6" align="center">
                        <span style="width: 30px;height: 30px;border-radius: 30px;background: #BFBFBF;display: inline-block;vertical-align: middle"></span>
                        <span style="vertical-align: middle;margin-left: 10px">已完成</span>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :span="12" :offset="1">
                    <div v-if="serviceDetails.length>0">
                        <fieldset v-for="(item,index) in serviceDetails" key="index">
                            <legend>当日服务任务{{index+1}}</legend>
                            <a-descriptions title="" size="middle">
                                <a-descriptions-item label="服务阿姨">
                                    {{item.employeeName}}
                                </a-descriptions-item>
                                <a-descriptions-item label="服务内容">
                                    {{item.content}}
                                </a-descriptions-item>
                                <a-descriptions-item label="服务类型">
                                    {{item.orderType==1?'标准服务':'定制服务'}}
                                </a-descriptions-item>
                                <a-descriptions-item label="服务开始时间">
                                    {{item.taskBegin}}
                                </a-descriptions-item>
                                <a-descriptions-item label="服务结束时间">
                                    {{item.taskEnd}}
                                </a-descriptions-item>
                                <a-descriptions-item label="服务时长">
                                    {{item.serviceHours}}小时
                                </a-descriptions-item>
                                <a-descriptions-item label="地址">
                                    {{item.address}}
                                </a-descriptions-item>
                                <a-descriptions-item label="门店名称">
                                    {{item.storeName}}
                                </a-descriptions-item>
                                <a-descriptions-item label="服务状态">
                                    {{item.status==0?'已关闭':item.status==1?'待服务':item.status==2?'进行中':'已完成'}}
                                </a-descriptions-item>
                                <a-descriptions-item label="备注">
                                    {{item.remark}}
                                </a-descriptions-item>
                            </a-descriptions>
                        </fieldset>
                    </div>
                <a-empty v-else>
                    <span slot="description">暂无任务</span>
                </a-empty>
<!--                <fieldset>-->
<!--                    <legend>服务项</legend>-->
<!--                    <p>厨房</p>-->
<!--                    <p>客厅</p>-->
<!--                    <p>卧室</p>-->
<!--                    <p>儿童房</p>-->
<!--                </fieldset>-->
            </a-col>
        </a-row>
    </a-modal>
</template>

<script>
    import moment from 'moment';
    import { getUserServiceSomeDay,
        getUserServiceSomeMonth }from'../../../api/localApi'
    export default {
        name: 'ServiceCalendar',
        data(){
            return{
                visible:false,
                value: moment(),
                selectedValue: moment(),
                serviceList:[],//当月所有服务列表的日期
                serviceDetails:[],//当日服务任务详情
                userId:null
            }
        },
        computed:{
            getWeekDay(){
                let day;
                let week = new Date(this.selectedValue).getDay()
                switch (week) {
                    case 0:
                        day = "星期天"
                        break;
                    case 1:
                        day = "星期一"
                        break;
                    case 2:
                        day = "星期二"
                        break;
                    case 3:
                        day = "星期三"
                        break;
                    case 4:
                        day = "星期四"
                        break;
                    case 5:
                        day = "星期五"
                        break;
                    case 6:
                        day = "星期六"
                        break;
                }
                return day
            }
        },
        methods:{
            getListData(value) {
                // console.log(value.date())
                let that = this
                let hasBeenCompletedDate;
                for (let i = 0;i<that.serviceList.length;i++){
                    if(value.date() == that.serviceList[i].taskBegin.split('-')[2]){
                        return hasBeenCompletedDate = that.serviceList[i].status
                    }
                }
            },
            onSelect(value) {
                this.value = value;
                this.selectedValue = value;
                let date = moment(value).format('YYYY-MM-DD')
                this.getDayServiceUser(this.userId,date)
            },
            onPanelChange(value) {
                this.value = value;
                let date =  moment(value).format('YYYY-MM')
                this.getMonthServiceUser(this.userId,date)
            },
            getMonthService(e){
                // console.log(e)
                // console.log( moment().format('YYYY-MM-DD'))
                this.userId = e.id
                let date = moment().format('YYYY-MM')
                let day = moment().format('YYYY-MM-DD')
                this.getMonthServiceUser(this.userId,date)
                this.getDayServiceUser(this.userId,day)
            },
            //获得当月所有任务日期集合
            getMonthServiceUser(userId,date){
                getUserServiceSomeMonth(userId,date).then(res=>{
                    if(res.code ==0){
                        // console.log(res)
                        this.serviceList = res.data
                        // this.serviceList = [
                        //     {status:1,taskBegin:'2021-01-18'},
                        //     {status:3,taskBegin:'2021-01-06'},
                        // ]
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            //获得某一天任务
            getDayServiceUser(userId,date){
                getUserServiceSomeDay(userId,date).then(res=>{
                    if(res.code == 0){
                        // console.log(res)
                        this.serviceDetails = res.data
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
        }
    }
</script>

<style>
    .ant-fullcalendar-fullscreen .ant-fullcalendar-column-header{
        text-align: center;
        padding-right: 0;
    }
    .ant-fullcalendar-header{
        text-align: center;
    }
    .ant-fullcalendar-next-month-btn-day,.ant-fullcalendar-last-month-cell .date_items{
        color: #BFBFBF;
    }

    /*当天的样式*/
    .ant-fullcalendar-today .date_items{
        color: #0c8fcf;
    }
    /*选中的样式*/
    .ant-fullcalendar-selected-day .date_items{
        background: #e6f7ff;
        color: #0c8fcf;;
    }

    /*已完成日期的样式*/
    .ant-fullcalendar-cell .hasDownCompleted{
        background: #dcdcdc;
        color: white;
    }
    .ant-fullcalendar-next-month-btn-day .hasDownCompleted{
        background: #ffffff;
        color:#BFBFBF ;
    }

    /*未开始的样式*/
    .ant-fullcalendar-cell .notStart{
        background: #FF6633;
        color: white;
    }
    .ant-fullcalendar-next-month-btn-day .notStart{
        background: #ffffff;
        color:#BFBFBF ;
    }

    .date_items{
        line-height: 60px;width: 60px;height: 60px;margin: 0 auto;cursor: pointer;border-radius: 50%;
    }
    fieldset{
        border:1px solid #dddddd;padding: 12px;border-radius: 4px;margin-bottom: 30px
    }
    legend{
        font-size: 14px;color: #333333;display: inline;width: auto;font-weight: 600
    }
</style>
<style scoped lang="less">

</style>