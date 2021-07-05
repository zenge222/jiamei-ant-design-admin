<template>
    <!--      添加市/区/县-->
    <a-modal
        title="添加市/区/县"
        :visible="visible"
        width="45%"
        :footer="null"
        @cancel="visible = false"
    >
        <a-form-model :model="addFormObj"
                      :rules="rules"
                      :label-col="{span:4}"
                      :wrapper-col="{span:12}"
                      ref="addFormObj"
        >
            <a-form-model-item label="市/区/县名称" prop="name">
                <a-input placeholder="输入市/区/县名称" v-model="addFormObj.name"></a-input>
            </a-form-model-item>
            <a-form-model-item label="上级地区" prop="parentName">
                <a-input v-model="parentName" disabled></a-input>
            </a-form-model-item>
            <a-form-model-item label="类型" prop="type">
                <a-radio-group v-model="addFormObj.type">
                    <a-radio :value="1">地区</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="排序" prop="orders">
                <a-input type="number" v-model="addFormObj.orders"></a-input>
            </a-form-model-item>
            <a-row style="margin-top: 60px">
                <a-col :offset="4">
                    <a-button type="primary" @click="submit">提交</a-button>
                    <a-button style="margin-left: 8px" @click="resetForm">重置</a-button>
                </a-col>
            </a-row>
        </a-form-model>
    </a-modal>
</template>

<script>
  import { addStore } from '../../../api/localApi'

  export default {
    name: 'AddCitys',
      data(){
          return{
              parentName:'',
              visible:false,
              addFormObj:{
                  name:'',
                  parentId:'',
                  type:1,
                  orders:1
              },
              rules:{
                  name:[{required: true, message: '区域名称不能为空！', trigger: 'blur' }],
                  type:[{required: true, message: '类型不能为空！', trigger: 'blur' }],
                  orders:[{required: true, message: '排序不能为空！', trigger: 'blur' }],
              },
          }
      },
      methods:{
          getParents(e){
              console.log(e)
              this.parentName = e.name
              this.addFormObj.parentId = e.id
          },
          submit(){
              this.$refs.addFormObj.validate((valid)=>{
                  if(valid){
                      addStore(this.addFormObj).then(res=>{
                          if(res.code ==0){
                              this.$message.success('添加成功！')
                              this.$emit('success')
                              this.visible = false
                          }else{
                              this.$message.error(res.message)
                          }
                      })
                  }
              })
          },
          resetForm(){
              this.$refs.addFormObj.resetFields()
          }
      }
  }
</script>

<style scoped>

</style>