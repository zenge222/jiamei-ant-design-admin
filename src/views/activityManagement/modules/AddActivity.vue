<template>
    <a-modal :visible="visible" width="65%" :title="title==1?'添加':'编辑'" @cancel="visible = false" :footer="null">
        <a-form-model
            :model="addForm"
            :labelCol="{span:2}"
            :wrapperCol="{span:12}"
            :rules="rules"
            ref="addForm">
<!--            <a-form-model-item label="选择门店" prop="storeId">-->
<!--                <a-select v-model="addForm.storeId" @change="selectStore">-->
<!--                    <a-select-option :value="item.id" v-for="(item,index) in storeList" :key="index">-->
<!--                        {{item.name}}-->
<!--                    </a-select-option>-->
<!--                </a-select>-->
<!--            </a-form-model-item>-->
            <a-form-model-item label="标题" prop="name">
                <a-input v-model="addForm.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="图片" prop="picture">
                <upload-image :files="files" @change="getPicture"></upload-image>
            </a-form-model-item>
            <a-form-model-item label="来源" prop="side">
                <a-radio-group v-model="addForm.side">
                    <a-radio :value="1">小程序</a-radio>
                    <a-radio :value="2">app</a-radio>
                    <a-radio :value="3">H5</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="链接地址" prop="url">
                <a-input v-model="addForm.url"></a-input>
            </a-form-model-item>
            <a-form-model-item label="排序" prop="sort">
                <a-input v-model="addForm.sort" type="number"></a-input>
            </a-form-model-item>
            <a-form-model-item label="位置" prop="type">
                <a-radio-group v-model="addForm.type">
                    <a-radio :value="1">首页banner</a-radio>
                    <a-radio :value="2">首页活动栏</a-radio>
                    <a-radio :value="3">分类页banner</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="状态" prop="status">
                <a-radio-group v-model="addForm.status">
                    <a-radio :value="0">关闭</a-radio>
                    <a-radio :value="1">开启</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-row>
                <a-col align="left" :offset="2" style="margin-top:80px ">
                    <a-button type="primary" @click="submit">提交</a-button>
                    <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>

<script>
    import {
        getActivityDetails,
        editActivity,
        addActivity, getCurrentUserStoreInfo
    } from '../../../api/localApi'
    import UploadImage from '../../staffManagement/modules/modules/UploadImage'
    import uuid from '../../../utils/uuid'
  export default {
    name: 'AddActivity',
      components:{UploadImage},
      data(){
        return{
            storeList:[],
            visible:false,
            title:1,
            files:[],
            addForm:{
                name:'',//活动名称/标题
                picture:'',//	活动图片
                side:'',//来自哪个程序端，1微信小程序 2app 3H5
                status:1,//状态，0关闭1开启
                type:null,//活动展示位置，1首页banner 2首页活动栏 3分类页banner
                url:'',//链接地址和携带的参数
                sort:1,//推荐排序
                storeId:null,
                storeName:'',
            },
            rules:{
                storeId:[{required:true,message:'门店不能为空！',trigger:'change'}],
                name:[{required:true,message:'活动名称不能为空！',trigger:'blur'}],
                picture:[{required:true,message:'活动图片不能为空！',trigger:'change'}],
                side:[{required:true,message:'来源不能为空！',trigger:'change'}],
                status:[{required:true,message:'活动状态不能为空！',trigger:'change'}],
                type:[{required:true,message:'展示位置不能为空！',trigger:'change'}],
                url:[{required:true,message:'活动链接不能为空！',trigger:'blur'}],
                sort:[{required:true,message:'推荐排序不能为空！',trigger:'blur'}],
            }
        }
      },
      mounted() {
          this.getUserStoreInfo()
      },
      methods:{
          getPicture(data){
              console.log(data)
              this.addForm.picture = data.length>0?data[0].url:''
          },
          // 获取当前登录用户所属那些门店
          getUserStoreInfo(){
              getCurrentUserStoreInfo().then(res=>{
                  if(res.code ==0){
                      this.storeList = res.data
                  }
              })
          },
          selectStore(value,options){
              this.addForm.storeName = this.storeList.find((item)=>item.id == value).name
              // console.log(this.formPartThree)
          },
          submit(){
              this.$refs.addForm.validate((valid)=>{
                  if(valid){
                      if(this.title == 1){
                          this.addForm.url = this.addForm.url
                          addActivity(this.addForm).then(res=>{
                              if(res.code ==0){
                                  console.log(res)
                                  this.$emit('success')
                                  this.visible = false
                                  this.$message.success('添加成功！')
                              }else{
                                  this.$message.error(res.message)
                              }
                          })
                      }else{
                          editActivity(this.addForm).then(res=>{
                              if(res.code ==0){
                                  console.log(res)
                                  this.$emit('success')
                                  this.visible = false
                                  this.$message.success('修改成功！')
                              }else{
                                  this.$message.error(res.message)
                              }
                          })
                      }
                  }
              })
          },
          // 获取详情
          getDetails(record){
              this.files = []
              getActivityDetails(record.id).then(res=>{
                  if(res.code ==0){
                      this.addForm = res.data
                      let obj = {
                          uid:uuid(),
                          name: 'XXXX.png',
                          status: 'done',
                          url:res.data.picture
                      }
                      this.files.push(obj)
                  }else {
                      this.$message.error(res.message)
                  }
              })
          },
          resetForm(){
              this.$refs.addForm.resetFields()
              this.deleteAttr()
          },
          // 添加的时候，删除id，createId，createName，createTime，updateId，updateName，updateTime
          deleteAttr(){
              this.$delete(this.addForm,'id')
              this.$delete(this.addForm,'createId')
              this.$delete(this.addForm,'createName')
              this.$delete(this.addForm,'createTime')
              this.$delete(this.addForm,'updateId')
              this.$delete(this.addForm,'updateName')
              this.$delete(this.addForm,'updateTime')
          },
      }
  }
</script>

<style scoped>

</style>