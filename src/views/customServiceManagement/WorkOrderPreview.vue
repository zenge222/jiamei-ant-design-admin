<template>
    <a-card :bordered="false">
        <a-form-model :form="previewForm" :labelCol="{span:2}" :wrapperCol="{span:14}">
            <a-form-model-item label="姓名">
                <a-input disabled></a-input>
            </a-form-model-item>
            <a-form-model-item label="电话">
                <a-input disabled></a-input>
            </a-form-model-item>
            <a-form-model-item label="服务地址">
                <j-area-linkage type="select" disabled=""/><br/>
                <a-input disabled></a-input>
            </a-form-model-item>
            <a-form-model-item label="备注">
                <a-input type="textarea" disabled></a-input>
            </a-form-model-item>
            <a-form-model-item label="服务时间">
                <a-select disabled>
                    <a-select-option value="0">请选择</a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="开始时间">
                <a-date-picker disabled></a-date-picker>
            </a-form-model-item>
            <a-form-model-item label="服务周期">
                <a-checkbox-group>
                    <a-checkbox>星期一</a-checkbox>
                    <a-checkbox>星期二</a-checkbox>
                    <a-checkbox>星期三</a-checkbox>
                    <a-checkbox>星期四</a-checkbox>
                    <a-checkbox>星期五</a-checkbox>
                    <a-checkbox>星期六</a-checkbox>
                    <a-checkbox>星期日</a-checkbox>
                </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="每次服务时长">
                <a-input disabled></a-input>
            </a-form-model-item>
        </a-form-model>
        <a-checkbox-group @change="onChange" style=" width: 100%">
            <a-collapse v-model="activeKey" style="background: white;">
                <a-collapse-panel key="1">
                    <div slot="header" @click.stop>
                        <a-checkbox value="1">厨房</a-checkbox>
                        <span style="margin-left: 60px"><a-radio :checked="handleChangeItems() == -1?true:false" @change="handleChangeAll">每次(默认)</a-radio></span>
                    </div>
                    <a-table
                        :columns="columns"
                        :data-source="data"
                         rowKey="name"
                        :pagination="false"
                        :bordered="true"
                        size="small">
                        <div slot="action" slot-scope="text, record">
                            <a-radio-group v-model="record.isEveryTime" @change="handleChangeItems">
                                <a-radio :value="1">每次</a-radio>
                                <a-radio :value="2">隔天</a-radio>
                            </a-radio-group>
                            <a-input-number v-show="record.isEveryTime == 2" v-model="record.apartDays" size="small" :min="1" :max="7" :default-value="1" @change="onChangeDays" />
                        </div>
                    </a-table>
                </a-collapse-panel>
                <a-collapse-panel key="2">
                    <div slot="header" @click.stop>
                        <a-checkbox value="2">卧室</a-checkbox>
                        <span style="margin-left: 60px"><a-radio :default-checked="true" value="1">每次(默认)</a-radio></span>
                    </div>
                    <div>卧室</div>
                </a-collapse-panel>
            </a-collapse>
        </a-checkbox-group>
       <a-button type="primary" style="margin:16px 0 0 0">修改</a-button>
    </a-card>
</template>

<script>
    import JAreaLinkage from '../../components/jeecg/JAreaLinkage'
    export default {
        name: 'WorkOrderPreview',
        components:{JAreaLinkage},
        data(){
            return{
                previewForm:{

                },
                activeKey:'1',
                columns:[
                    { title: '内部结构名称', align:"center", dataIndex: 'name' },
                    { title: '清洁程度', align:"center", dataIndex: 'degree' },
                    { title: '清洁项目', align:"center", dataIndex: 'items' },
                    { title: '清洁工具', align:"center", dataIndex: 'tool' },
                    { title: '清洁药剂', align:"center", dataIndex: 'potion' },
                    { title: '验收标准', align:"center", dataIndex: 'standard' },
                    { title: '物品材质', align:"center", dataIndex: 'material' },
                    { title: '清洁周期选择', align:"center",width:300, dataIndex: 'action',scopedSlots: { customRender: 'action' } },
                ],
                data:[
                    {name:'地面',degree:'标准清洁',items:'表层清洁',tool:'吸尘器、拖把',potion:'中性清洁剂',standard:'表面触摸光滑，无杂质，无污染',material:'红木',isEveryTime:1,apartDays:''},
                    {name:'柜门',degree:'标准清洁',items:'表层清洁',tool:'吸尘器、拖把',potion:'中性清洁剂',standard:'表面触摸光滑，无杂质，无污染',material:'',isEveryTime:1,apartDays:''},
                    {name:'水槽',degree:'标准清洁',items:'表层清洁',tool:'吸尘器、拖把',potion:'中性清洁剂',standard:'表面触摸光滑，无杂质，无污染',material:'',isEveryTime:1,apartDays:''},
                    {name:'灶具',degree:'标准清洁',items:'表层清洁',tool:'吸尘器、拖把',potion:'中性清洁剂',standard:'表面触摸光滑，无杂质，无污染',material:'',isEveryTime:1,apartDays:''},
                    {name:'冰箱',degree:'标准清洁',items:'表层清洁',tool:'吸尘器、拖把',potion:'中性清洁剂',standard:'表面触摸光滑，无杂质，无污染',material:'',isEveryTime:1,apartDays:''},
                ],
            }
        },
        computed:{

        },
        methods:{
            onChange(checkedValues) {
                console.log('checked = ', checkedValues);

            },
            onChangeDays(value) {
                console.log('changed', value);
            },
            handleChangeItems(){
                let isCheckAll =  this.data.findIndex(item=>item.isEveryTime == 2)
                return isCheckAll
            },
            handleChangeAll(e){
                if(e.target.checked){
                    let data = [...this.data]
                    data.forEach((item)=>{
                        item.isEveryTime = 1
                    })
                    this.data = data
                }
            }
        }
    }
</script>

<style scoped>

</style>