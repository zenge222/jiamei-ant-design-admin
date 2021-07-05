import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
import Vue from 'vue'

// 图片上传腾讯云请求秘钥
const getCosTempSecret = (params)=>getAction("/tencent/api/getCosTempSecret",params);

/*
    <===================================门店管理=================================================>
*/
// 添加服务城市
const addServiceCity = (params)=>postAction("/service/city/add",params)

//获取服务城市列表
const getServiceList = (params)=>getAction("/service/city/list",params)

//编辑服务城市
const editServiceCity = (params)=>putAction("/service/city/edit",params)

//服务城市启用停用
const changeServiceStatus = (id)=>putAction('/service/city/changeStatus/'+id)

//获取服务城市详情
const getServiceCityDetails = (id)=>getAction('/service/city/info/'+id)

//添加门店
const addStore = (params)=>postAction('/service/store/add',params)

//获取当前用户负责的门店列表
const getMyStoreList = (params)=>getAction('/service/store/queryMyStoreTreeList',params)

//获取所有的门店列表
const getAllStoreList = (params)=>getAction('/service/store/queryTreeList',params)

//编辑门店
const editStore = (params)=>putAction('/service/store/edit',params)

//查询所有部门的名称和id，比如系统用户关联门店时用到
const getDepartStoreList = ()=>getAction('/service/store/queryIdTree')

/*
    <===================================员工管理=================================================>
*/
//添加员工基础信息、家人信息
const addEmployees = (params)=>postAction('/employee/baseInfo/add',params)

//编辑员工基础信息、家人信息
const editEmployees = (params)=>putAction('/employee/baseInfo/edit',params)

//获取员工列表
const getEmployeesList = (params)=>getAction('/employee/info/list',params)

//获取员工的基础信息、家人信息、门店信息、工作经历信息、培训记录信息
const getEmployeesMessageInfo = (id)=>getAction('/employee/getAllInfo/'+id)

//添加员工门店信息
const addEmployeesStoreInfo = (params)=>postAction('/employee/storeInfo/add',params)

//编辑员工门店信息
const editEmployeesStoreInfo = (params)=>putAction('/employee/storeInfo/edit',params)

//获取当前登录用户属于那些门店
const getCurrentUserStoreInfo = (params)=>getAction('/employee/storeInfo/myStoreList',params)

// 添加员工工作、培训记录
const addAndEditEmployeesExperience = (params)=>postAction('/employee/resume/maintain',params)

// //添加员工的健康认证
const addEmployeesHealth = (params)=>postAction('/employee/prove/addLatestHealth',params)

// //添加员工的技能认证
const addEmployeesSkill = (params)=>postAction('/employee/prove/addLatestSkill',params)

// //添加员工的身份认证
const addEmployeesIdcard = (params)=>postAction('/employee/prove/addLatestIdcard',params)

//添加员工的信用认证
const addEmployeesCredit = (params)=>postAction('/employee/prove/addLatestCredit',params)

//添加员工的荣誉认证
const addEmployeesHonor = (params)=>postAction('/employee/prove/addLatestHonor',params)

//添加员工的公安认证
const addEmployeesPolice = (params)=>postAction('/employee/prove/addLatestPolice',params)

//获取一个员工的所有认证信息
const getEmployeesAllProves = (id)=>getAction('/employee/prove/oneEmployeeAll/'+id)

//获取员工请假列表
const getEmployeesVacation = (params)=>getAction('/employee/vacation/list',params)

//获取员工请假详情
const getEmployeesVacationDetails = (id)=>getAction('/employee/vacation/info/'+id)

//审批员工请假申请
const approvalEmployeesVacation = (params) =>putAction('/employee/vacation/check',params)

//获取员工休假可替代员工
const getReplaceEmployees = (params)=>getAction('/employee/vacation/freeEmployeeList',params)

//获取员工日常工作记录列表
const getEmployeesWorkLogList = (params)=>getAction('/employee/workLog/list',params)

//获取员工日常工作记录详情
const getEmployeesWorkLogDetails = (id)=>getAction('/employee/workLog/info/'+id)

/*
    <===================================商品（标准服务）管理=================================================>
*/
//获取标准服务列表
const getStandardList = (params)=>getAction('/service/normal/list',params)

//添加标准服务
const addStandard = (params)=>postAction('/service/normal/add',params)

//获取标准服务详情
const getStandardDetails = (id)=>getAction('/service/normal/info/'+id)

//编辑标准服务
const editStandard = (params)=>putAction('/service/normal/edit',params)

//标准服务上架下架
const changeStandardStatus = (id)=>putAction('/service/normal/changeStatus/'+id)

//获取有效的标准服务分类集合
const getCanCategoryList = ()=>getAction('/service/normal/allTypeList')

//获取有效的协议列表
const getCanAgreementList =()=>getAction('/service/normal/allProtocolList')
/*
    <===================================活动管理=================================================>
*/
// 获取活动列表
const getActivityList = (params)=>getAction('/portal/miniConfig/list',params)

//获取活动配置详情
const getActivityDetails = (id)=>getAction('/portal/miniConfig/info/'+id)

// 编辑活动
const editActivity = (params)=>putAction('/portal/miniConfig/edit',params)

//启用、停用
const changeActivityStatus = (id)=>putAction('/portal/miniConfig/changeStatus/'+id)

//添加活动
const addActivity = (params)=>postAction('/portal/miniConfig/add',params)

/*
    <===================================配置管理=================================================>
*/
//添加协议
const addProtocol = (params) =>postAction('/service/protocol/add',params)

//协议启用、停用
const changeProtocol =(id)=>putAction('/service/protocol/changeStatus/'+id)

//编辑协议
const editProtocol = (params)=>putAction('/service/protocol/edit',params)

//获取协议详情
const getProtocolDetails = (id)=>getAction('/service/protocol/info/'+id)

//获取协议列表
const getProtocolList = (params)=>getAction('/service/protocol/list',params)

//添加商品分类
const addGoodsCategory = (params)=>postAction('/service/normalType/add',params)

//标准服务分类启用-停用
const changeGoodsStatus = (id)=>putAction('/service/normalType/changeStatus/'+id)

//编辑标准服务分类
const editGoodsCategory = (params)=>putAction('/service/normalType/edit',params)

//获取标准服务分类详情
const getCategoryDetails = (id)=>getAction('/service/normalType/info/'+id)

//获取标准服务分类列表
const getCategoryList = (params)=>getAction('/service/normalType/list',params)

/*
    <===================================物料管理=================================================>
*/
//添加物品
const addMaterial = (params)=>postAction('/material/category/add',params)

//物品启用、停用
const changeMaterial = (id)=>putAction('/material/category/changeStatus/'+id)

//编辑物品
const editMaterial=(params)=>putAction('/material/category/edit',params)

//获取物品详情
const getMaterialDetails = (id)=>getAction('/material/category/info/'+id)

//获取物品列表
const getMaterialList = (params)=>getAction('/material/category/list',params)

//物品出入库记录列表
const getMaterialChangeLog = (params)=>getAction('/material/stockLog/list',params)

//仓库物品列表
const stockMaterialList = (params)=>getAction('/material/stock/list',params)

//仓库物品入库
const stockMaterialAdd=(params)=>postAction('/material/stock/add',params)

//仓库物品出库
const stockMaterialSubtract=(params)=>putAction('/material/stock/subtract',params)

//物品库存详情
const stockMaterialDetails = (id)=>getAction('/material/stock/info/'+id)

//获取物料申领列表
const getMaterialClaimList = (params) =>getAction('/material/claim/list',params)

//获取物料申领详情
const getMaterialClaimDetails =(id)=>getAction('/material/claim/info/'+id)

//审批物料申领同意/不同意
const changeMaterialStatus = (id,status)=>putAction('/material/claim/check/'+id+'/'+status)

//物料发放
const grantMaterial = (id)=>putAction('/material/claim/grant/'+id)

/*
    <===================================定制服务管理=================================================>
*/
// 获取房屋布局列表
const getStructureList = (params)=>getAction('/service/structure/list',params)

//获取房屋布局详情
const getStructureDetails = (id)=>getAction('/service/structure/info/'+id)

//编辑房屋布局
const editStructure = (params) =>putAction('/service/structure/edit',params)

//房屋布局启用，停用
const changeStructureStatus=(id)=>putAction('/service/structure/changeStatus/'+id)

//添加房屋布局
const addStructure = (params)=>postAction('/service/structure/add',params)

// 添加房间的内部结构
const addStructureItem = (params)=>postAction('/service/structureItem/add',params)

//房间内部结构，启用、停用
const changeStructureItemStatus =(id)=>putAction('/service/structureItem/changeStatus/'+id)

//编辑房屋内部结构
const editStructureItem = (params)=>putAction('/service/structureItem/edit',params)

//获取房屋内部结构详情
const getStructureItemDetails=(id)=>getAction('/service/structureItem/info/'+id)

// 获取房屋内部结构列表
const getStructureItemList = (params)=>getAction('/service/structureItem/list',params)

//获取有效的房屋结构集合
const getStructureAllTypeList = ()=>getAction('/service/structureItem/allTypeList')


/*
    <===================================会员管理=================================================>
*/
// 会员列表
const getMiniUserList = (params)=>getAction('/portal/miniUser/list',params)

//获取用户某天的所有任务
const getUserServiceSomeDay = (id,date)=>getAction('/portal/miniUser/getUserServiceByDate/'+id+'/'+date)

//获取用户某月的所有服务日期和服务服务状态
const getUserServiceSomeMonth = (id,date)=>getAction('/portal/miniUser/getUserServiceDateStatus/'+id+'/'+date)
/*
    <===================================财务管理=================================================>
*/
//门店规则列表
const getStorePriceRuleList = (params)=>getAction('/service/storePrice/list',params)

//添加门店规则
const addStoreRule = (params)=>postAction('/service/storePrice/add',params)

//编辑门店规则
const editStoreRule = (params)=>putAction('/service/storePrice/edit',params)

//获取规则详情
const getRuleDetails = (id)=>getAction('/service/storePrice/info/'+id)

// 腾讯地图接口

//地址逆向解析
const getLocationCode = (details)=>getAction('https://apis.map.qq.com/ws/geocoder/v1/?address='+details+'&key=D5OBZ-24A6F-2LNJZ-NLPJ6-TW6VE-M7FJ5')

//获取某系统用户归属的门店列表
const getSystemUserStores = (id)=>getAction('/system/user/userStores/'+id)
//新增用户时关联门店的门店列表
const getAddUserStores = ()=>getAction('/service/store/queryIdTree')

//获取当前用户负责的门店列表
const getCurrentUserStore = ()=>getAction('/service/store/queryMyStoreTreeList')


// /*人力机构推荐管理*/

//获取推荐公司列表
const getRecommendList = ()=>getAction('/recommend/Info/list')

//获取推荐公司详情
const getRecommendDetail = (id)=>getAction('/recommend/Info/info/'+id)

//添加人力机构
const addRecommend = (params)=>postAction('/recommend/Info/add',params)

//编辑人力机构
const editRecommend = (params)=>putAction('/recommend/Info/edit',params)

//获取人力机构或者个人列表
const getRecommendListType = (type)=>getAction('/employee/freeEmployeeList/'+type)
export {
  getCurrentUserStore,
  getSystemUserStores,
  getAddUserStores,
  getCosTempSecret,
  addServiceCity,
  getServiceList,
  editServiceCity,
  changeServiceStatus,
  getServiceCityDetails,
  addEmployees,
  editEmployees,
  getEmployeesList,
  getEmployeesMessageInfo,
  addEmployeesStoreInfo,
  editEmployeesStoreInfo,
  getCurrentUserStoreInfo,
  addAndEditEmployeesExperience,
  addEmployeesHealth,
  addEmployeesSkill,
  addEmployeesIdcard,
  addEmployeesCredit,
  addEmployeesHonor,
  addEmployeesPolice,
  getEmployeesAllProves,
  getEmployeesVacation,
  getEmployeesVacationDetails,
  approvalEmployeesVacation,
  getStandardList,
  addStandard,
  getStandardDetails,
  editStandard,
  changeStandardStatus,
  getActivityList,
  getActivityDetails,
  editActivity,
  changeActivityStatus,
  addActivity,
  addProtocol,
  changeProtocol,
  editProtocol,
  getProtocolDetails,
  getProtocolList,
  addMaterial,
  changeMaterial,
  editMaterial,
  getMaterialDetails,
  getMaterialList,
  getMaterialChangeLog,
  stockMaterialList,
  stockMaterialAdd,
  stockMaterialSubtract,
  stockMaterialDetails,
  getMaterialClaimList,
  getMaterialClaimDetails,
  changeMaterialStatus,
  grantMaterial,
  getStructureList,
  getStructureDetails,
  editStructure,
  addStructure,
  changeStructureStatus,
  addStructureItem,
  changeStructureItemStatus,
  editStructureItem,
  getStructureItemDetails,
  getStructureItemList,
  getMiniUserList,
  getEmployeesWorkLogList,
  getEmployeesWorkLogDetails,
  addGoodsCategory,
  changeGoodsStatus,
  editGoodsCategory,
  getCategoryDetails,
  getCategoryList,
  getCanCategoryList,
  getStructureAllTypeList,
  getCanAgreementList,
  getStorePriceRuleList,
  addStoreRule,
  editStoreRule,
  getRuleDetails,
  addStore,
  getMyStoreList,
  getAllStoreList,
  editStore,
  getDepartStoreList,
  getReplaceEmployees,
  getUserServiceSomeDay,
  getUserServiceSomeMonth,
  getRecommendList,
  getRecommendDetail,
  addRecommend,
  editRecommend,
  getRecommendListType
}