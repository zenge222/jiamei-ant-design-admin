import { getAction, deleteAction, putAction, postAction, httpAction } from '@/api/manage'
import Vue from 'vue'
import {UI_CACHE_DB_DICT_DATA } from "@/store/mutation-types"

////根路径
// const doMian = "/jeecg-boot/";
////图片预览请求地址
// const imgView = "http://localhost:8080/jeecg-boot/system/common/view/";

//角色管理
const addRole = (params)=>postAction("/system/role/add",params);
const editRole = (params)=>putAction("/system/role/edit",params);
// const getRoleList = (params)=>getAction("/system/role/list",params);
// const deleteRole = (params)=>deleteAction("/system/role/delete",params);
// const deleteRoleList = (params)=>deleteAction("/system/role/deleteBatch",params);
const checkRoleCode = (params)=>getAction("/system/role/checkRoleCode",params);
const queryall = (params)=>getAction("/system/role/queryall",params);

//用户管理
const addUser = (params)=>postAction("/system/user/add",params);
const editUser = (params)=>putAction("/system/user/edit",params);
const queryUserRole = (params)=>getAction("/system/user/queryUserRole",params);
const getUserList = (params)=>getAction("/system/user/list",params);
// const deleteUser = (params)=>deleteAction("/system/user/delete",params);
// const deleteUserList = (params)=>deleteAction("/system/user/deleteBatch",params);
const frozenBatch = (params)=>putAction("/system/user/frozenBatch",params);
//验证用户是否存在
const checkOnlyUser = (params)=>getAction("/system/user/checkOnlyUser",params);
//改变密码
const changePassword = (params)=>putAction("/system/user/changePassword",params);

//权限管理
const addPermission= (params)=>postAction("/system/permission/add",params);
const editPermission= (params)=>putAction("/system/permission/edit",params);
const getPermissionList = (params)=>getAction("/system/permission/list",params);
/*update_begin author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */
const getSystemMenuList = (params)=>getAction("/system/permission/getSystemMenuList",params);
const getSystemSubmenu = (params)=>getAction("/system/permission/getSystemSubmenu",params);
const getSystemSubmenuBatch = (params) => getAction('/system/permission/getSystemSubmenuBatch', params)
/*update_end author:wuxianquan date:20190908 for:添加查询一级菜单和子菜单查询api */

// const deletePermission = (params)=>deleteAction("/system/permission/delete",params);
// const deletePermissionList = (params)=>deleteAction("/system/permission/deleteBatch",params);
const queryTreeList = (params)=>getAction("/system/permission/queryTreeList",params);
const queryTreeListForRole = (params)=>getAction("/system/role/queryTreeList",params);
const queryListAsync = (params)=>getAction("/system/permission/queryListAsync",params);
const queryRolePermission = (params)=>getAction("/system/permission/queryRolePermission",params);
const saveRolePermission = (params)=>postAction("/system/permission/saveRolePermission",params);
//const queryPermissionsByUser = (params)=>getAction("/system/permission/queryByUser",params);
const queryPermissionsByUser = (params)=>getAction("/system/permission/getUserPermission",params);
const loadAllRoleIds = (params)=>getAction("/system/permission/loadAllRoleIds",params);
const getPermissionRuleList = (params)=>getAction("/system/permission/getPermRuleListByPermId",params);
const queryPermissionRule = (params)=>getAction("/system/permission/queryPermissionRule",params);

// 部门管理
const queryDepartTreeList = (params)=>getAction("/system/depart/queryTreeList",params);
const queryIdTree = (params)=>getAction("/system/depart/queryIdTree",params);
const queryParentName   = (params)=>getAction("/system/depart/queryParentName",params);
const searchByKeywords   = (params)=>getAction("/system/depart/searchBy",params);
const deleteByDepartId   = (params)=>deleteAction("/system/depart/delete",params);

//二级部门管理
const queryDepartPermission = (params)=>getAction("/system/permission/queryDepartPermission",params);
const saveDepartPermission = (params)=>postAction("/system/permission/saveDepartPermission",params);
const queryTreeListForDeptRole = (params)=>getAction("/system/departPermission/queryTreeListForDeptRole",params);
const queryDeptRolePermission = (params)=>getAction("/system/departPermission/queryDeptRolePermission",params);
const saveDeptRolePermission = (params)=>postAction("/system/departPermission/saveDeptRolePermission",params);
const queryMyDepartTreeList = (params)=>getAction("/system/depart/queryMyDeptTreeList",params);

//日志管理
//const getLogList = (params)=>getAction("/system/log/list",params);
const deleteLog = (params)=>deleteAction("/system/log/delete",params);
const deleteLogList = (params)=>deleteAction("/system/log/deleteBatch",params);

//数据字典
const addDict = (params)=>postAction("/system/dict/add",params);
const editDict = (params)=>putAction("/system/dict/edit",params);
//const getDictList = (params)=>getAction("/system/dict/list",params);
const treeList = (params)=>getAction("/system/dict/treeList",params);
// const delDict = (params)=>deleteAction("/system/dict/delete",params);
//const getDictItemList = (params)=>getAction("/system/dictItem/list",params);
const addDictItem = (params)=>postAction("/system/dictItem/add",params);
const editDictItem = (params)=>putAction("/system/dictItem/edit",params);
//const delDictItem = (params)=>deleteAction("/system/dictItem/delete",params);
//const delDictItemList = (params)=>deleteAction("/system/dictItem/deleteBatch",params);

//字典标签专用（通过code获取字典数组）
export const ajaxGetDictItems = (code, params)=>getAction(`/system/dict/getDictItems/${code}`,params);
//从缓存中获取字典配置
function getDictItemsFromCache(dictCode) {
  if (Vue.ls.get(UI_CACHE_DB_DICT_DATA) && Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode]) {
    let dictItems = Vue.ls.get(UI_CACHE_DB_DICT_DATA)[dictCode];
    console.log("-----------getDictItemsFromCache----------dictCode="+dictCode+"---- dictItems=",dictItems)
    return dictItems;
  }
}

//系统通告
const doReleaseData = (params)=>getAction("/system/annountCement/doReleaseData",params);
const doReovkeData = (params)=>getAction("/system/annountCement/doReovkeData",params);
//获取系统访问量
const getLoginfo = (params)=>getAction("/system/loginfo",params);
const getVisitInfo = (params)=>getAction("/system/visitInfo",params);
//数据日志访问
// const getDataLogList = (params)=>getAction("/system/dataLog/list",params);

// 根据部门主键查询用户信息
const queryUserByDepId = (params)=>getAction("/system/user/queryUserByDepId",params);

// 查询用户角色表里的所有信息
// const queryUserRoleMap = (params)=>getAction("/system/user/queryUserRoleMap",params);
// 重复校验
const duplicateCheck = (params)=>getAction("/system/duplicate/check",params);
// 加载分类字典
const loadCategoryData = (params)=>getAction("/system/category/loadAllData",params);
const checkRuleByCode = (params) => getAction('/system/checkRule/checkByCode', params)
//加载我的通告信息
const getUserNoticeInfo= (params)=>getAction("/system/sysAnnouncementSend/getMyAnnouncementSend",params);
const getTransitURL = url => `/system/common/transitRESTful?url=${encodeURIComponent(url)}`
// 中转HTTP请求
export const transitRESTful = {
  get: (url, parameter) => getAction(getTransitURL(url), parameter),
  post: (url, parameter) => postAction(getTransitURL(url), parameter),
  put: (url, parameter) => putAction(getTransitURL(url), parameter),
  http: (url, parameter) => httpAction(getTransitURL(url), parameter),
}

export {
  // imgView,
  // doMian,
  addRole,
  editRole,
  checkRoleCode,
  addUser,
  editUser,
  queryUserRole,
  getUserList,
  queryall,
  frozenBatch,
  checkOnlyUser,
  changePassword,
  getPermissionList,
  addPermission,
  editPermission,
  queryTreeList,
  queryListAsync,
  queryRolePermission,
  saveRolePermission,
  queryPermissionsByUser,
  loadAllRoleIds,
  getPermissionRuleList,
  queryPermissionRule,
  queryDepartTreeList,
  queryIdTree,
  queryParentName,
  searchByKeywords,
  deleteByDepartId,
  deleteLog,
  deleteLogList,
  addDict,
  editDict,
  treeList,
  addDictItem,
  editDictItem,
  doReleaseData,
  doReovkeData,
  getLoginfo,
  getVisitInfo,
  queryUserByDepId,
  duplicateCheck,
  queryTreeListForRole,
  getSystemMenuList,
  getSystemSubmenu,
  getSystemSubmenuBatch,
  loadCategoryData,
  checkRuleByCode,
  queryDepartPermission,
  saveDepartPermission,
  queryTreeListForDeptRole,
  queryDeptRolePermission,
  saveDeptRolePermission,
  queryMyDepartTreeList,
  getUserNoticeInfo,
  getDictItemsFromCache
}



