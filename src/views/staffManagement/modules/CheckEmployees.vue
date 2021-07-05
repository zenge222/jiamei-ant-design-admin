<template>
    <a-modal title="员工详情"
             width="90%"
            :visible="visible"
             :footer="null"
             centered
            @cancel="visible = false">
        <fieldset>
            <legend>个人信息</legend>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">真实姓名：</a-col>
                        <a-col :span="20">{{baseInfo.name||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">手机号码：</a-col>
                        <a-col :span="20">{{baseInfo.mobile||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">性别：</a-col>
                        <a-col :span="20">{{baseInfo.sex == 0?'女':'男'}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">名族：</a-col>
                        <a-col :span="20">{{baseInfo.nation||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">身份证号：</a-col>
                        <a-col :span="20">{{baseInfo.identityCard||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">身份证地址：</a-col>
                        <a-col :span="20">{{baseInfo.idcardAddress||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">出生日期：</a-col>
                        <a-col :span="20">{{baseInfo.birthday}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">现居住地址：</a-col>
                        <a-col :span="20">{{baseInfo.liveAddress||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">紧急联系人：</a-col>
                        <a-col :span="20">{{baseInfo.contact||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">紧急联系人电话：</a-col>
                        <a-col :span="20">{{baseInfo.contactPhone||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">家庭成员：</a-col>
                        <a-col :span='20'>
                            <a-table :columns="columns" :data-source="familyList" size="small" :pagination="false" rowKey="id"/>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :span="12">
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">员工头像</a-col>
                        <a-col :span="20">
                            <a-avatar shape="square" :size="64" icon="user" :src="baseInfo.avatar"/>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">脸型：</a-col>
                        <a-col :span="20">{{baseInfo.face ==1?'圆脸':baseInfo.face ==2?'瓜子脸':baseInfo.face ==3?'鹅蛋脸':baseInfo.face ==4?'国字脸':'长脸'}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">身材：</a-col>
                        <a-col :span="20">{{baseInfo.stature == '1'?'纤细苗条':baseInfo.stature == '2'?'微胖富态':'圆润有力'}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">属相：</a-col>
                        <a-col :span="20">{{baseInfo.zodiac||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">星座：</a-col>
                        <a-col :span="20">{{baseInfo.constellation||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">血型：</a-col>
                        <a-col :span="20">{{baseInfo.blood||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">宗教信仰：</a-col>
                        <a-col :span="20">{{baseInfo.religion||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">兴趣爱好：</a-col>
                        <a-col :span="20">{{baseInfo.hobby||''}}</a-col>
                    </a-row>
<!--                    <a-row :gutter="[16 ,16]">-->
<!--                        <a-col :span="4" style="text-align: right">个人嗜好：</a-col>-->
<!--                        <a-col :span="20">无</a-col>-->
<!--                    </a-row>-->
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">性格：</a-col>
                        <a-col :span="20">{{baseInfo.characters||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">健康认证：</a-col>
                        <a-col :span="20"><a-button @click="checkProve('health')">{{certification.health!=''&&certification.health!=undefined&&certification.health!=null?'已认证':'未认证'}}</a-button></a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">技能认证：</a-col>
                        <a-col :span="20"><a-button @click="checkProve('skill')">{{certification.skill!=''&&certification.skill!=undefined&&certification.skill!=null?'已认证':'未认证'}}</a-button></a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">身份证信息：</a-col>
                        <a-col :span="20"><a-button @click="checkProve('idcard')">{{certification.idcard!=''&&certification.idcard!=undefined&&certification.idcard!=null?'已认证':'未认证'}}</a-button></a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">信用认证：</a-col>
                        <a-col :span="20"><a-button @click="checkProve('credit')">{{certification.credit!=''&&certification.credit!=undefined&&certification.credit!=null?'已认证':'未认证'}}</a-button></a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">荣誉认证：</a-col>
                        <a-col :span="20"><a-button @click="checkProve('honor')">{{certification.honor!=''&&certification.honor!=undefined&&certification.honor!=null?'已认证':'未认证'}}</a-button></a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">公安认证：</a-col>
                        <a-col :span="20"><a-button @click="checkProve('police')">{{certification.police!=''&&certification.police!=undefined&&certification.police!=null?'已认证':'未认证'}}</a-button></a-col>
                    </a-row>
                </a-col>
            </a-row>
        </fieldset>
        <fieldset>
            <legend>门店信息</legend>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">所属门店：</a-col>
                        <a-col :span="20">{{storeInfo.storeName||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">工号：</a-col>
                        <a-col :span="20">{{storeInfo.jobNumber||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">技师等级：</a-col>
                        <a-col :span="20">{{storeInfo.stars+'星'||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">工种：</a-col>
                        <a-col :span="20">{{storeInfo.workType ==1?'保洁员':storeInfo.workType ==2?'小时工':storeInfo.workType ==3?'月嫂':storeInfo.workType ==4?'居家保姆':'临时工'}}</a-col>
                    </a-row>
                </a-col>
                <a-col :span="12">
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">入职日期：</a-col>
                        <a-col :span="20">{{storeInfo.entryTime||''}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">休息日：</a-col>
                        <a-col :span="20">
                            <span v-for="item in day">星期{{item}},</span>
                        </a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">工作时间：</a-col>
                        <a-col :span="20">{{storeInfo.startWorkTime +'-'+ storeInfo.stopWorkTime}}</a-col>
                    </a-row>
                    <a-row :gutter="[16 ,16]">
                        <a-col :span="4" style="text-align: right">员工来源：</a-col>
                        <a-col :span="20">{{storeInfo.recruit==1?'自主招工':storeInfo.recruit==2?'中介公司':'个人介绍'}}</a-col>
                    </a-row>
                </a-col>
            </a-row>
        </fieldset>
        <fieldset>
            <legend>其它信息</legend>
                <a-row :gutter="[16 ,16]">
                    <a-col :span="2" style="text-align: right">经验：</a-col>
                    <a-col :span="22">{{baseInfo.workYears==1?'一到三年':baseInfo.workYears==2?'三到五年':'五年以上'}}</a-col>
                </a-row>
                <a-row :gutter="[16 ,16]">
                    <a-col :span="2" style="text-align: right">擅长技能：</a-col>
                    <a-col :span="22">
                        <span v-for="item in skill">{{item==1?'日常保洁':item==2?'衣物洗涤':item==3?'基本护理':item==4?'细致擦窗':item==5?'家庭收纳':item==6?'杀菌消毒':item==7?'鞋子洗护':'家常烹饪'}},</span>
                    </a-col>
                </a-row>
                <a-row :gutter="[16 ,16]">
                    <a-col :span="2" style="text-align: right">从业经历：</a-col>
                    <a-col :span="22"><a-table :columns="columns1" :data-source="jobRecordList" size="small" :pagination="false" rowKey="id"/></a-col>
                </a-row>
                <a-row :gutter="[16 ,16]">
                    <a-col :span="2" style="text-align: right">培训经历：</a-col>
                    <a-col :span="22"><a-table :columns="columns2" :data-source="trainingRecordList" size="small" :pagination="false" rowKey="id"/></a-col>
                </a-row>
                <a-row :gutter="[16 ,16]">
                    <a-col :span="2" style="text-align: right">综合介绍：</a-col>
                    <a-col :span="22">{{baseInfo.intro||''}}</a-col>
                </a-row>
        </fieldset>
        <a-modal :visible="proveVisible" width="75%" title="认证信息" :footer="null" @cancel="proveVisible = false">
            <div v-html="proveDetails"></div>
        </a-modal>
    </a-modal>
</template>

<script>
    const columns = [
        { title: '姓名', dataIndex: 'familyName',customRender:(text)=>{
            return text?text:'（空）'
            } },
        { title: '联系电话', dataIndex: 'familyPhone',customRender:(text)=>{
        return text?text:'（空）'
    }  },
        { title: '是员工的谁', dataIndex: 'familyRelation',customRender:(text)=>{
            return text?text:'（空）'
        }  },];

    const columns1 = [
        { title: '起始时间', dataIndex: 'beginYearMonth', },
        { title: '结束时间', dataIndex: 'endYearMonth', },
        { title: '公司名称', dataIndex: 'company', },
        { title: '职位', dataIndex: 'post', },];

    const columns2 = [
        { title: '起始时间', dataIndex: 'beginYearMonth', },
        { title: '结束时间', dataIndex: 'endYearMonth', },
        { title: '描述', dataIndex: 'description', }, ];
    import {
        getEmployeesMessageInfo,
        getEmployeesAllProves
    } from '../../../api/localApi'
    export default {
        name: 'CheckEmployees',
        data(){
            return{
                visible:false,
                proveVisible:false,
                baseInfo:{},
                storeInfo:{},
                familyList:[],
                jobRecordList:[],
                day:[],
                skill:[],
                trainingRecordList:[],columns,columns1,columns2,
                certification:{
                    health:'',
                    skill:'',
                    idcard:'',
                    credit:'',
                    honor:'',
                    police:''
                },
                proveDetails:''
            }
        },
        methods:{
            init(data){
                getEmployeesMessageInfo(data.id).then(res=>{
                    if(res.code == 0){
                        this.baseInfo = res.data.baseInfo
                        this.storeInfo = res.data.storeInfo
                        this.day = res.data.storeInfo.restDay?res.data.storeInfo.restDay.split(','):[]
                        this.skill = res.data.baseInfo.speciality?res.data.baseInfo.speciality.split(','):[]
                        this.familyList = res.data.familyList
                        this.jobRecordList = res.data.jobRecordList
                        this.trainingRecordList = res.data.trainingRecordList
                    }else {
                        this.$message.error(res.message)
                    }
                })
                //获取员工的所有认证
                getEmployeesAllProves(data.id).then(res=>{
                    if(res.code == 0){
                        this.certification = {
                            health:res.data.health?res.data.health.healthInfo:'',
                            skill:res.data.skill?res.data.skill.skillInfo:'',
                            idcard:res.data.idcard?res.data.idcard.idcardInfo:'',
                            credit:res.data.credit?res.data.credit.creditInfo:'',
                            honor:res.data.honor?res.data.honor.honorInfo:'',
                            police:res.data.police?res.data.police.policeInfo:''
                        }
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            checkProve(key){
                this.proveVisible = true
                this.proveDetails = this.certification[key]
            }
        }
    }
</script>

<style>
    fieldset{
        border:1px solid #dddddd;padding: 12px;border-radius: 4px;margin-bottom: 30px
    }
    legend{
        font-size: 14px;color: #0c8fcf;display: inline;width: auto;font-weight: 600
    }
</style>