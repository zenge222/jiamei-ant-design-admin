<template>
    <a-modal title="添加员工"
             width="95%"
             :visible="visible"
             :footer="false"
             centered
             :maskClosable="false"
             :destroyOnClose="true"
             @cancel="handleCancel">
<!--        第一部分提交的表单-->
            <a-form-model
                ref="formPartOne"
                :model="formPartOne"
                :label-col="{span:6}"
                :wrapper-col="{span:18}"
                :rules="rules">
                <a-row :gutter="[16,16]">
                    <a-col :span="12">
                        <a-form-model-item label="真实姓名" prop="name">
                            <a-input v-model="formPartOne.name"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="手机号码" prop="mobile">
                            <a-input v-model="formPartOne.mobile"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="性别" prop="sex">
                            <a-radio-group v-model="formPartOne.sex">
                                <a-radio :value="1">
                                    男
                                </a-radio>
                                <a-radio :value="0">
                                    女
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                        <a-form-model-item label="民族" prop="nation">
                            <a-input v-model="formPartOne.nation"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="身份证号" prop="identityCard">
                            <a-input v-model="formPartOne.identityCard"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="身份证地址" prop="idcardAddressCode">
                            <j-area-linkage type="select" v-model="formPartOne.idcardAddressCode" width="80px"/>
                        </a-form-model-item>
                        <a-form-model-item label="详细地址">
                            <a-input v-model="detailsAddress"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="出生日期" prop="birthday">
                            <a-date-picker
                                type="date"
                                style="width: 100%;"
                                v-model="formPartOne.birthday"
                                format="YYYY-MM-DD"
                                valueFormat="YYYY-MM-DD"
                            />
                        </a-form-model-item>
                        <a-form-model-item label="现居住地址" prop="liveAddress">
                            <a-input v-model="formPartOne.liveAddress"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="紧急联系人" prop="contact">
                            <a-input v-model="formPartOne.contact"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="紧急联系人电话" prop="contactPhone">
                            <a-input v-model="formPartOne.contactPhone"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="家庭成员" prop="familyList">
                            <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                                <a-col :span="6">姓名</a-col>
                                <a-col :span="6">联系电话</a-col>
                                <a-col :span="6">是员工的谁</a-col>
                                <a-col :span="4">操作</a-col>
                            </a-row>
                            <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in formPartOne.familyList" :key="index">
                                <a-col :span="6">
                                    <a-form-model-item>
                                        <a-input placeholder="姓名" v-model="formPartOne.familyList[index].familyName" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-model-item>
                                        <a-input placeholder="联系电话" v-model="formPartOne.familyList[index].familyPhone" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="6">
                                    <a-form-model-item>
                                        <a-input placeholder="关系" v-model="formPartOne.familyList[index].familyRelation" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="4">
                                    <a-form-model-item>
                                        <a-button @click="addRowCustom" icon="plus"></a-button>&nbsp;
                                        <a-button @click="delRowCustom(index)" icon="minus" v-if="formPartOne.familyList.length>1"></a-button>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="员工头像">
                            <upload-image @change="getAvatarUrl" :files="files"></upload-image>
                        </a-form-model-item>
                        <a-form-model-item label="脸型" prop="face">
                            <a-radio-group v-model="formPartOne.face">
                                <a-radio :value="1">
                                    圆脸
                                </a-radio>
                                <a-radio :value="2">
                                    瓜子脸
                                </a-radio>
                                <a-radio :value="3">
                                    鹅蛋脸
                                </a-radio>
                                <a-radio :value="4">
                                    国字脸
                                </a-radio>
                                <a-radio :value="5">
                                    长脸
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                        <a-form-model-item label="身材" prop="stature">
                            <a-radio-group v-model="formPartOne.stature">
                                <a-radio :value="1">
                                    纤细苗条
                                </a-radio>
                                <a-radio :value="2">
                                    微胖富态
                                </a-radio>
                                <a-radio :value="3">
                                    圆润有力
                                </a-radio>
                            </a-radio-group>
                        </a-form-model-item>
                        <a-form-model-item label="属相" prop="zodiac">
                            <a-select v-model="formPartOne.zodiac">
                                <a-select-option value="蛇">
                                    蛇
                                </a-select-option>
                                <a-select-option value="鼠">
                                    鼠
                                </a-select-option>
                                <a-select-option value="牛">
                                    牛
                                </a-select-option>
                                <a-select-option value="羊">
                                    羊
                                </a-select-option>
                                <a-select-option value="猪">
                                    猪
                                </a-select-option>
                                <a-select-option value="马">
                                    马
                                </a-select-option>
                                <a-select-option value="猴">
                                    猴
                                </a-select-option>
                                <a-select-option value="鸡">
                                    鸡
                                </a-select-option>
                                <a-select-option value="狗">
                                    狗
                                </a-select-option>
                                <a-select-option value="龙">
                                    龙
                                </a-select-option>
                                <a-select-option value="虎">
                                    虎
                                </a-select-option>
                                <a-select-option value="兔">
                                    兔
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="星座" prop="constellation">
                            <a-select v-model="formPartOne.constellation">
                                <a-select-option value="白羊座">
                                    白羊座
                                </a-select-option>
                                <a-select-option value="金牛座">
                                    金牛座
                                </a-select-option>
                                <a-select-option value="双子座">
                                    双子座
                                </a-select-option>
                                <a-select-option value="巨蟹座">
                                    巨蟹座
                                </a-select-option>
                                <a-select-option value="狮子座">
                                    狮子座
                                </a-select-option>
                                <a-select-option value="处女座">
                                    处女座
                                </a-select-option>
                                <a-select-option value="天秤座">
                                    天秤座
                                </a-select-option>
                                <a-select-option value="天蝎座">
                                    天蝎座
                                </a-select-option>
                                <a-select-option value="射手座">
                                    射手座
                                </a-select-option>
                                <a-select-option value="摩羯座">
                                    摩羯座
                                </a-select-option>
                                <a-select-option value="水瓶座">
                                    水瓶座
                                </a-select-option>
                                <a-select-option value="双鱼座">
                                    双鱼座
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="血型" prop="blood">
                            <a-select v-model="formPartOne.blood">
                                <a-select-option value="A型">
                                    A型
                                </a-select-option>
                                <a-select-option value="B型">
                                    B型
                                </a-select-option>
                                <a-select-option value="AB型">
                                    AB型
                                </a-select-option>
                                <a-select-option value="O型">
                                    O型
                                </a-select-option>
                                <a-select-option value="其它血型">
                                    其他血型
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                        <a-form-model-item label="宗教信仰" prop="religion">
                            <a-input v-model="formPartOne.religion"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="兴趣爱好" prop="hobby">
                            <a-input v-model="formPartOne.hobby"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="性格" prop="characters">
                            <a-input v-model="formPartOne.characters"></a-input>
                        </a-form-model-item>
                        <a-form-model-item label="备注" prop="remark">
                            <a-input v-model="formPartOne.remark"></a-input>
                        </a-form-model-item>
                    </a-col>
                </a-row>
<!--                <a-row>-->
<!--                    <a-col :offset="2">-->
<!--                        <a-button type="primary" @click="submitOnePart">提交</a-button>-->
<!--                        <a-button style="margin-left: 8px" @click="resetForm('formPartOne')">重置</a-button>-->
<!--                    </a-col>-->
<!--                </a-row>-->
            </a-form-model>
        <!--        第三部分提交-->
<!--        <a-divider style="margin: 40px 0">门店信息</a-divider>-->
        <div style="margin-top: 30px"></div>
        <a-form-model
            ref="formPartThree"
            :model="formPartThree"
            :label-col="{span:2}"
            :rules="rules3"
            :wrapper-col="{span:10}">
            <a-form-model-item label="选择门店" prop="storeId">
                <a-select v-model="formPartThree.storeId" @change="selectStore">
                    <a-select-option :value="item.id" v-for="(item,index) in storeList" :key="index">
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="工号" prop="jobNumber">
                <a-input placeholder="输入工号" v-model="formPartThree.jobNumber"></a-input>
            </a-form-model-item>
            <a-form-model-item label="技师等级" prop="stars">
                <a-select v-model="formPartThree.stars">
                    <a-select-option :value="1">
                        1星
                    </a-select-option>
                    <a-select-option :value="2">
                        2星
                    </a-select-option>
                    <a-select-option :value="3">
                        3星
                    </a-select-option>
                    <a-select-option :value="4">
                        4星
                    </a-select-option>
                    <a-select-option :value="5">
                        5星
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="工种" prop="workType">
                <a-select v-model="formPartThree.workType">
                    <a-select-option :value="1">
                        保洁员
                    </a-select-option>
                    <a-select-option :value="2">
                        小时工
                    </a-select-option>
                    <a-select-option :value="3">
                        月嫂
                    </a-select-option>
                    <a-select-option :value="4">
                        居家保姆
                    </a-select-option>
                    <a-select-option :value="5">
                        临时工
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="入职时间" prop="entryTime">
                <a-date-picker
                    v-model="formPartThree.entryTime"
                    type="date"
                    style="width: 100%;"
                    format="YYYY-MM-DD"
                    valueFormat="YYYY-MM-DD"
                />
            </a-form-model-item>
            <a-form-model-item label="休息日" prop="restDay">
                <a-checkbox-group v-model="formPartThree.restDay">
                    <a-checkbox value="1">
                        星期一
                    </a-checkbox>
                    <a-checkbox value="2">
                        星期二
                    </a-checkbox>
                    <a-checkbox value="3">
                        星期三
                    </a-checkbox>
                    <a-checkbox value="4">
                        星期四
                    </a-checkbox>
                    <a-checkbox value="5">
                        星期五
                    </a-checkbox>
                    <a-checkbox value="6">
                        星期六
                    </a-checkbox>
                    <a-checkbox value="7">
                        星期日
                    </a-checkbox>
                </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="上班时间" prop="startWorkTime">
                <a-time-picker v-model="formPartThree.startWorkTime" format="HH:mm" valueFormat="HH:mm"/>
            </a-form-model-item>
            <a-form-model-item label="下班时间" prop="stopWorkTime">
                <a-time-picker v-model="formPartThree.stopWorkTime" format="HH:mm" valueFormat="HH:mm"/>
            </a-form-model-item>
            <a-form-model-item label="员工来源" prop="recruit">
                <a-select v-model="formPartThree.recruit" @change="chooseRecruit">
                    <a-select-option :value="1">
                        自主招工
                    </a-select-option>
                    <a-select-option :value="2">
                        中介公司
                    </a-select-option>
                    <a-select-option :value="3">
                        个人介绍
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="来源详情" v-if="formPartThree.recruit == 2|| formPartThree.recruit == 3" prop="recruitName">
<!--                <a-input placeholder="输入具体的介绍人员或中介公司" v-model="formPartThree.recruitName"></a-input>-->
                <a-select v-model="formPartThree.recruitId">
                    <a-select-option v-for="item in companyList" :value="item.id">{{item.name}}</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item>
<!--                <a-row>-->
<!--                    <a-col :offset="4">-->
<!--                        <a-button type="primary" @click="submitTwoPart">提交</a-button>-->
<!--                        <a-button style="margin-left: 8px" @click="resetForm('formPartThree')">重置</a-button>-->
<!--                    </a-col>-->
<!--                </a-row>-->
                <a-row>
                    <a-col :offset="4">
                        <a-button type="primary" @click="submitAll" :disabled="submitAgain">提交</a-button>
                        <a-button style="margin-left: 8px" @click="resetAll">重置</a-button>
                    </a-col>
                </a-row>
            </a-form-model-item>
        </a-form-model>
        <!--        第四部分提交-->
        <a-divider style="margin: 40px 0">从业经历、培训信息</a-divider>
        <a-form-model
            ref="formPartFour"
            :model="formPartFour"
            :labelCol="{span:2}"
            :wrapperCol="{span:12}"
            :rules="rules4">
            <a-form-model-item label="经验" prop="workYears">
                <a-select v-model="formPartFour.workYears">
                    <a-select-option :value="1">
                        1-3年
                    </a-select-option>
                    <a-select-option :value="2">
                        3-5年
                    </a-select-option>
                    <a-select-option :value="3">
                        5年以上
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="擅长技能" prop="speciality">
                <a-checkbox-group v-model="formPartFour.speciality">
                    <a-checkbox value="1">
                        日常保洁
                    </a-checkbox>
                    <a-checkbox value="2">
                        衣物洗涤
                    </a-checkbox>
                    <a-checkbox value="3">
                        基本护理
                    </a-checkbox>
                    <a-checkbox value="4">
                        细致擦窗
                    </a-checkbox>
                    <a-checkbox value="5">
                        家庭收纳
                    </a-checkbox>
                    <a-checkbox value="6">
                        杀菌消毒
                    </a-checkbox>
                    <a-checkbox value="7">
                        鞋子洗护
                    </a-checkbox>
                    <a-checkbox value="8">
                        家常烹饪
                    </a-checkbox>
                </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="从业经历" :label-col="{span:2}" :wrapper-col="{span:22}" prop="jobRecordList">
                <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                    <a-col :span="4">起始年月</a-col>
                    <a-col :span="4">结束年月</a-col>
                    <a-col :span="4">公司名称</a-col>
                    <a-col :span="4">职位</a-col>
                    <a-col :span="4">离职原因</a-col>
                    <a-col :span="4">操作</a-col>
                </a-row>
                <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in formPartFour.jobRecordList" :key="index">
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-date-picker
                                type="date"
                                style="width: 100%;"
                                v-model="formPartFour.jobRecordList[index].beginYearMonth"
                                format="YYYY-MM-DD"
                                valueFormat="YYYY-MM-DD"
                                placeholder="起始年月"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-date-picker
                                type="date"
                                style="width: 100%;"
                                v-model="formPartFour.jobRecordList[index].endYearMonth"
                                format="YYYY-MM-DD"
                                valueFormat="YYYY-MM-DD"
                                placeholder="结束年月"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-input placeholder="公司名称" v-model="formPartFour.jobRecordList[index].company" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-input placeholder="职位" v-model="formPartFour.jobRecordList[index].post" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-input placeholder="离职原因" v-model="formPartFour.jobRecordList[index].leaveReason" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-button @click="addRowJob" icon="plus"></a-button>&nbsp;
                            <a-button @click="delRowJob(index)" icon="minus" v-if="formPartFour.jobRecordList.length>1"></a-button>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model-item>
            <a-form-model-item label="培训经历" :label-col="{span:2}" :wrapper-col="{span:22}" prop="trainingRecordList">
                <a-row type="flex" style="margin-bottom:10px" :gutter="16">
                    <a-col :span="4">起始年月</a-col>
                    <a-col :span="4">结束年月</a-col>
                    <a-col :span="12">描述</a-col>
                    <a-col :span="4">操作</a-col>
                </a-row>
                <a-row type="flex" style="margin-bottom:10px" :gutter="16" v-for="(item, index) in formPartFour.trainingRecordList" :key="index">
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-date-picker
                                type="date"
                                style="width: 100%;"
                                v-model="formPartFour.trainingRecordList[index].beginYearMonth"
                                format="YYYY-MM-DD"
                                valueFormat="YYYY-MM-DD"
                                placeholder="起始年月"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-date-picker
                                type="date"
                                style="width: 100%;"
                                v-model="formPartFour.trainingRecordList[index].endYearMonth"
                                format="YYYY-MM-DD"
                                valueFormat="YYYY-MM-DD"
                                placeholder="结束年月"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item>
                            <a-input placeholder="例：培训地点/培训内容" v-model="formPartFour.trainingRecordList[index].description"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="4">
                        <a-form-model-item>
                            <a-button @click="addRowTrain" icon="plus"></a-button>&nbsp;
                            <a-button @click="delRowTrain(index)" icon="minus" v-if="formPartFour.trainingRecordList.length>1"></a-button>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model-item>
            <a-form-model-item label="综合介绍" :label-col="{span:2}" :wrapper-col="{span:22}" prop="intro">
                <a-input type="textarea" v-model="formPartFour.intro"/>
            </a-form-model-item>
            <a-form-model-item>
                <a-row>
                    <a-col :offset="4">
                        <a-button type="primary" @click="submitFourPart">提交</a-button>
                        <a-button style="margin-left: 8px" @click="resetForm('formPartFour')">重置</a-button>
                    </a-col>
                </a-row>
            </a-form-model-item>
        </a-form-model>
        <!--        第二部分提交的认证信息-->
        <a-divider style="margin: 40px 0">认证信息</a-divider>
        <a-tabs v-model="activeKey" @change="changeTabs" style="width: 100%;box-sizing: border-box">
            <a-tab-pane key="1" tab="添加健康认证" :forceRender="true">
                <div style="min-height: 300px">
                    <j-editor v-model="certification.health" style="width: 99%"/>
                </div>
                <a-button type="primary" style="margin-top: 10px" @click="addHealth">保存</a-button>
            </a-tab-pane>
            <a-tab-pane key="2" tab="添加技能认证" :forceRender="true">
                <div style="min-height: 300px">
                    <j-editor v-model="certification.skill" style="width: 99%"/>
                </div>
                <a-button type="primary" style="margin-top: 10px" @click="addSkill">保存</a-button>
            </a-tab-pane>
            <a-tab-pane key="3" tab="添加身份证信息" :forceRender="true">
                <div style="min-height: 300px">
                    <j-editor v-model="certification.idcard" style="width: 99%"/>
                </div>
                <a-button type="primary" style="margin-top: 10px" @click="addIdcard">保存</a-button>
            </a-tab-pane>
            <a-tab-pane key="4" tab="添加信用认证" :forceRender="true">
                <div style="min-height: 300px">
                    <j-editor v-model="certification.credit" style="width: 99%"/>
                </div>
                <a-button type="primary" style="margin-top: 10px" @click="addCredit">保存</a-button>
            </a-tab-pane>
            <a-tab-pane key="5" tab="添加荣誉认证" :forceRender="true">
                <div style="min-height: 300px">
                    <j-editor v-model="certification.honor" style="width: 99%"/>
                </div>
                <a-button type="primary" style="margin-top: 10px" @click="addHonor">保存</a-button>
            </a-tab-pane>
            <a-tab-pane key="6" tab="添加公安认证" :forceRender="true">
                <div style="min-height: 300px">
                    <j-editor v-model="certification.police" style="width: 99%"/>
                </div>
                <a-button type="primary" style="margin-top: 10px" @click="addPolice">保存</a-button>
            </a-tab-pane>
        </a-tabs>

    </a-modal>
</template>

<script>
    import Area from '@/components/_util/Area'
    import {addEmployees,addEmployeesStoreInfo,addAndEditEmployeesExperience,
        addEmployeesHealth,
        addEmployeesSkill,
        addEmployeesIdcard,
        addEmployeesCredit,
        addEmployeesHonor,
        addEmployeesPolice,getRecommendListType} from '../../../api/localApi'
    import JAreaLinkage from '../../../components/jeecg/JAreaLinkage'
    import JEditor from '../../../components/jeecg/JEditor'
    import UploadImage from './modules/UploadImage'
    import {duplicateCheck } from '../../../api/api'
    import moment from 'moment';
    export default {
        name: 'AddEmployees',
        components:{JAreaLinkage,JEditor,UploadImage},
        data(){
            return{
                companyList:[],
                submitAgain:false,
                storeList:[],
                areaData:'',
                visible:false,
                activeKey:'1',
                detailsAddress:'',//详细地址
                files:[],//头像
                employeeId:'',
                employeeName:'张三',
                formPartOne:{
                    name:'',
                    mobile:'',
                    sex:0,
                    nation:'',//名族
                    identityCard:'',
                    idcardAddressCode:'',
                    idcardAddress:'',//身份证地址= this.areaData.getText(身份证地址编码)+详细地址
                    birthday:'',
                    liveAddress:'',//现在居住地址
                    contact:'',//紧急联系人
                    contactPhone:'',//联系人电话
                    avatar:"",//员工头像
                    face:0,//脸型
                    stature:0,//身材
                    zodiac:'',//属相
                    constellation:'',//星座'
                    blood:'',//血型
                    religion:'',//宗教
                    hobby:'',//爱好
                    characters:'',//性格
                    remark:'',//备注,
                    status:1,//状态是否离职，0离职，1正常
                    familyList:[{ familyName:'',familyPhone:"",familyRelation:'' }]
                },
                formPartThree:{
                    employeeId:'',
                    storeId:'',
                    storeName:'',
                    jobNumber:'',
                    stars:'',
                    workType:'',
                    entryTime:'',
                    startWorkTime:'',
                    stopWorkTime:'',
                    recruit:'',
                    restDay:[],
                    recruitId:null,
                    recruitName:''//介绍人/公司
                },
                formPartFour:{
                    employeeId:'',
                    employeeName:'',
                    intro:'',
                    jobRecordList:[
                        {beginYearMonth:'',endYearMonth:'',company:'',post:'',leaveReason:''}
                    ],
                    speciality:[],
                    trainingRecordList:[
                        {beginYearMonth:'',endYearMonth:'',description:''}
                    ],
                    workYears:''
                },
                rules:{
                    name:[{ required: true, message: '请输入真实姓名！', trigger: 'blur' }, { min: 2, message: '姓名格式错误！', trigger: 'blur' },],
                    sex:[{ required: true, message: '请选则性别！', trigger: 'change' }],
                    mobile:[{ required: true,pattern: '^1(3|4|5|7|8)\\d{9}$', message: '请输入正确的手机号码！', trigger: 'blur' }],
                    nation:[{ required: true, message: '请输入名族！', trigger: 'blur' }],
                    identityCard:[{ required: true,pattern: '^\\d{8}(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|3(0|1))\\d{3}$|^\\d{10}(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|3(0|1))\\d{3}(\\d|X|x)$', message: '请输入正确的身份证号码！', trigger: 'blur' }],
                    idcardAddressCode:[{ required: true, message: '选择身份证地址！', trigger: 'change' }],
                    detailsAddress:[{ required: true, message: '请输入详细地址！', trigger: 'blur' }],
                    birthday:[{ required: true, message: '请选择出生日期！', trigger: 'change' }],
                    liveAddress:[{ required: true, message: '请输入现居住地址！', trigger: 'blur' }]
                },
                rules3:{
                    storeId:[{ required: true, message: '请选择门店！', trigger: 'change' }],
                    jobNumber:[{ required: true, message: '请输入工号！', trigger: 'blur' }],
                    workType:[{ required: true, message: '请选择工种！', trigger: 'change' }],
                    entryTime:[{ required: true, message: '请选择入职时间！', trigger: 'change' }],
                    startWorkTime:[{ required: true, message: '请选择上班时间！', trigger: 'change' }],
                    stopWorkTime:[{ required: true, message: '请选择下班时间！', trigger: 'change' }],
                    recruit:[{ required: true, message: '请选择员工来源！', trigger: 'change' }],
                    // restDay:[{ required: true, message: '请选择休息日！', trigger: 'change' }],
                    stars:[{ required: true, message: '请选择员工星级！', trigger: 'change' }]
                },
                rules4:{
                    workYears:[{ required: true, message: '请选择员工年限！', trigger: 'change' }]
                },
                // 认证信息
                certification:{
                    employeeId:'',
                    status:1,
                    health:'',
                    skill:'',
                    idcard: '',
                    credit:'',
                    honor:'',
                    police:''
                }
            }
        },
        created() {
            this.initAreaData()
        },
        methods:{
            submitAll(){
                let that = this
                that.$refs.formPartOne.validate((valid)=>{
                    if(valid){
                        that.$refs.formPartThree.validate((valid)=>{
                            if(valid){
                                this.submitOnePart()
                            }
                        })
                    }
                })
            },
            resetAll(){
                this.resetForm('formPartOne')
                this.resetForm('formPartThree')
            },
            submitOnePart(){
                // var params = {
                //     tableName: 'sys_user',
                //     fieldName: 'identityCard',
                //     fieldVal: this.formPartOne.identityCard,
                //     dataId: ''
                // };
                // duplicateCheck(params).then(res =>{
                //     if(!res.success){
                //         this.$message.error('手机号已存在！')
                //         return false
                //     }
                // })
                if(this.detailsAddress == ''||this.detailsAddress == undefined || this.detailsAddress == null){
                    this.$message.error('详细地址不能为空！')
                    return false
                }
                this.formPartOne.idcardAddress = this.areaData.getText(this.formPartOne.idcardAddressCode)+'.'+this.detailsAddress
                console.log(this.formPartOne)
                this.$refs.formPartOne.validate(valid =>{
                    if(valid){
                        addEmployees(this.formPartOne).then(res=>{
                            if(res.code == 0){
                                console.log(res)
                                this.employeeId = res.data
                                // that.$message.success('员工基础信息添加成功！')
                                setTimeout(()=>{
                                    this.submitTwoPart()
                                },200)
                            }else {
                                this.$message.error(res.message)
                                return false;
                            }
                        })
                    }
                })

            },
            submitTwoPart(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                if(this.formPartThree.recruit !=1 && (this.formPartThree.recruitId == ''|| this.formPartThree.recruitId == undefined || this.formPartThree.recruitId == null)){
                    this.$message.error('请选择推荐机构/个人！')
                    return false
                }
                this.$refs.formPartThree.validate((valid)=>{
                    if(valid){
                        this.formPartThree.employeeId = this.employeeId
                        this.formPartThree.restDay = this.formPartThree.restDay.length>1?this.formPartThree.restDay.join(','):this.formPartThree.restDay.length==1?this.formPartThree.restDay[0]:''
                        console.log(this.formPartThree)
                        addEmployeesStoreInfo(this.formPartThree).then(res=>{
                            if (res.code == 0){
                                console.log(res)
                                this.$message.success('添加成功！')
                                this.submitAgain = true
                            }else {
                                this.$message.error(res.message)
                            }
                        })
                    }else{
                        return
                    }
                })
            },
            submitFourPart(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                this.$refs.formPartFour.validate((valid)=>{
                    if(valid){
                        this.formPartFour.employeeId = this.employeeId
                        this.formPartFour.speciality = this.formPartFour.speciality.length>1?this.formPartFour.speciality.join(','):this.formPartFour.speciality.length==1?this.formPartFour.speciality[0]:''
                        console.log(this.formPartFour)
                        addAndEditEmployeesExperience(this.formPartFour).then(res=>{
                            if (res.code == 0){
                                console.log(res)
                                this.$message.success('添加成功！')
                            }else {
                                this.$message.error(res.message)
                            }
                        })
                    }else{
                        return
                    }
                })
            },
            // 获取上传成功返回的url
            getAvatarUrl(data){
                this.formPartOne.avatar = data[0].url
            },
            selectStore(value,options){
                this.formPartThree.storeName = this.storeList.find((item)=>item.id == value).name
                // console.log(this.formPartThree)
            },
            // 切换认证信息tabs
            changeTabs(key) {
                console.log(key);
            },
            addRowCustom () {
                this.formPartOne.familyList.push({ familyName:'',familyPhone:"",familyRelation:'' });
            },
            delRowCustom (index) {
                this.formPartOne.familyList.splice(index,1);
            },
            addRowJob(){
                this.formPartFour.jobRecordList.push({beginYearMonth:'',endYearMonth:'',company:'',post:'',leaveReason:''});
            },
            delRowJob(index){
                this.formPartFour.jobRecordList.splice(index,1);
            },
            addRowTrain(){
                this.formPartFour.trainingRecordList.push({beginYearMonth:'',endYearMonth:'',description:''});
            },
            delRowTrain(index){
                this.formPartFour.trainingRecordList.splice(index,1);
            },
            saveCertification(){
                console.log(this.certification)
            },
            initAreaData(){
                if(!this.areaData){
                    this.areaData = new Area();
                    // console.log(this.areaData.getText('130202'))
                }
            },
            resetForm(formName){
                if(formName == 'formPartOne'){
                    this.files = []
                    this.detailsAddress = ''
                }
                this.$refs[formName].resetFields();
            },
            addHealth(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                let data = {
                    employeeId:this.employeeId,
                    healthInfo:this.certification.health
                }
                addEmployeesHealth(data).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.$message.success('添加成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            addSkill(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                let data = {
                    employeeId:this.employeeId,
                    skillInfo:this.certification.skill
                }
                addEmployeesSkill(data).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.$message.success('添加成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            addIdcard(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                let data = {
                    employeeId:this.employeeId,
                    idcardInfo:this.certification.idcard
                }
                addEmployeesIdcard(data).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.$message.success('添加成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            addCredit(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                let data = {
                    employeeId:this.employeeId,
                    creditInfo:this.certification.credit
                }
                addEmployeesCredit(data).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.$message.success('添加成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            addHonor(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                let data = {
                    employeeId:this.employeeId,
                    honorInfo:this.certification.honor
                }
                addEmployeesHonor(data).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.$message.success('添加成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            addPolice(){
                if(this.employeeId == ''|| this.employeeId == undefined || this.employeeId == null){
                    this.$message.error('请先完成员工基础信息填写！')
                    return false
                }
                let data = {
                    employeeId:this.employeeId,
                    policeInfo:this.certification.police
                }
                addEmployeesPolice(data).then(res=>{
                    if(res.code == 0){
                        console.log(res)
                        this.$message.success('添加成功！')
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            chooseRecruit(value){
                var type;
                console.log(value)
                if(value == 2){
                    type = 1
                }else if(value ==3){
                    type = 2
                }else{
                    return
                }
                getRecommendListType(type).then(res=>{
                    if(res.code ==0){
                        console.log(res)
                        this.companyList = res.data
                        this.formPartThree.recruitId = res.data.length>0?res.data[0].id:''
                    }else {
                        this.$message.error(res.message)
                    }
                })
            },
            handleCancel(){
                this.visible = false
                this.$emit('success')
            }
        }
    }
</script>
<style>
    .area-select.medium{
        width: auto!important;
        min-width: 100px;
    }
    .avatar-uploader > .ant-upload {
        width: 128px;
        height: 128px;
    }
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
.img_preview{
    width: 128px;
    height: 128px;}
</style>