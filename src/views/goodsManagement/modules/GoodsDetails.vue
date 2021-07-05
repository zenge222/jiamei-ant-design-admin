<template>
    <a-modal :visible="visible" title="商品详情" width="75%" :footer="null" @cancel="visible = false">
        <a-form-model :model="goodsForm" :labelCol="{span:2}" :wrapperCol="{span:12}">
            <a-form-model-item label="所属门店">
                <span>{{goodsForm.storeName}}</span>
            </a-form-model-item>
            <a-form-model-item label="商品名称">
                <span>{{goodsForm.name}}</span>
            </a-form-model-item>
            <a-form-model-item label="所属类型">
                <a-radio-group disabled>
                    <a-radio checked>标准服务</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="商品分类">
                <span>{{goodsForm.typeName}}</span>
            </a-form-model-item>
            <a-form-model-item label="上架状态">
                <a-radio-group v-model="goodsForm.status" disabled>
                    <a-radio :value="1">已上架</a-radio>
                    <a-radio :value="0">已下架</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="商品属性">
                <a-table :columns="columns" :data-source="goodsForm.skuList" size="small" rowKey="id" :pagination="false"/>
            </a-form-model-item>
            <a-form-model-item label="规则协议">
                {{goodsForm.protocolName||'无'}}
            </a-form-model-item>
            <a-form-model-item label="推荐服务">
                <a-radio-group v-model="goodsForm.recommend" disabled>
                    <a-radio :value="1">是</a-radio>
                    <a-radio :value="0">否</a-radio>
                </a-radio-group>
            </a-form-model-item>
            <a-form-model-item label="推荐排序">
                <span>{{goodsForm.sort}}</span>
            </a-form-model-item>
            <a-form-model-item label="商品图片">
                <a-avatar shape="square" :size="100" icon="user" :src="goodsForm.pics"/>
            </a-form-model-item>
            <a-form-model-item label="商品详情" prop="pics">
                <div v-html="goodsForm.details"></div>
            </a-form-model-item>
        </a-form-model>
        <a-row><a-col align="right"><a-button @click="visible = false">关闭</a-button></a-col></a-row>
    </a-modal>
</template>

<script>
  import { getStandardDetails } from '../../../api/localApi'
  export default {
    name: 'GoodsDetails',
      data(){
        return{
            visible:false,
            goodsForm:{},
            columns:[
                {
                    title: '属性名称',
                    dataIndex: 'name',
                },
                {
                    title: '服务时长',
                    dataIndex: 'duration',
                },
                {
                    title: '原价',
                    dataIndex: 'originalPrice',
                },{
                    title: '现价',
                    dataIndex: 'realPrice',
                },
            ]
        }
      },
      mounted() {

      },
      methods:{
          //获取标准服务详情
          getStandardInfo(id){
              this.files = []
              getStandardDetails(id).then(res=>{
                  if(res.code ==0){
                      console.log(res)
                      this.goodsForm = res.data
                  }
              })
          },
      }
  }
</script>

<style scoped>

</style>