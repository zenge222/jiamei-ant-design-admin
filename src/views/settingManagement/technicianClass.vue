<template>
    <a-card :bordered="false">
    <div>
        <a-button class="btn_addition" type="primary"  @click="showModal">
            +添加
        </a-button>
        <a-modal v-model="visible" title="添加技师等级" width="50%" @ok="handleOk">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="等级名称">
                    <a-input v-decorator="['className', { rules: [{ required: true, message: '请输入等级名称!'}] }]"/>
                </a-form-item>
                <a-form-item label="星级">
                    <a-select v-decorator="['starLevel',{ rules: [{ required: true, message: '请选择星级!' }] }]">
                        <a-select-option value="one">
                           一星
                        </a-select-option>
                        <a-select-option value="two">
                            二星
                        </a-select-option>
                        <a-select-option value="three">
                            三星
                        </a-select-option>
                        <a-select-option value="four">
                            四星
                        </a-select-option>
                        <a-select-option value="five">
                            五星
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="每时收费标准">
                    <a-input v-decorator="['chargeCriterion']"/>
                </a-form-item>
                <a-form-item label="每时提成标准">
                    <a-input v-decorator="['royaltyCriterion']"/>
                </a-form-item>
                <a-form-item label="备注">
                    <a-input type='textarea' v-decorator="['remark']"/>
                </a-form-item>
            </a-form>
        </a-modal>


        <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination">
            <template slot="operation" slot-scope="text, record">
                <a @click="showModal">修改</a>
                <a-divider type="vertical" />
                <a-popconfirm v-if="dataSource.length" title="确定删除?" @confirm="() => onDelete(record.key)">
                    <a>删除</a>
                </a-popconfirm>
            </template>
        </a-table>
    </div>
    </a-card>
</template>
<script>
    export default {
        name: 'technicianClass',
        data() {
            return {
                visible: false,
                checkNick: false,
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
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
                dataSource: [
                    {
                        key: '0',
                        number: '01',
                        className: '卫生等级',
                        starLevel:"四星",
                        chargeCriterion:"120/h",
                        royaltyCriterion:"30/h",
                        remark:"卫生等级卫生等级卫生等级卫生等级卫生等级卫生等级",
                    },
                    {
                        key: '1',
                        number: '02',
                        className: '烹饪等级',
                        starLevel:"五星",
                        chargeCriterion:"80/h",
                        royaltyCriterion:"20/h",
                        remark:"烹饪等级烹饪等级烹饪等级烹饪等级烹饪等级",
                    },
                    {
                        key: '2',
                        number: '03',
                        className: '细心等级',
                        starLevel:"三星",
                        chargeCriterion:"180/h",
                        royaltyCriterion:"60/h",
                        remark:"细心等级细心等级细心等级细心等级细心等级",
                    },
                ],
                columns: [
                    {
                        title: '序号',
                        dataIndex: 'number',
                        align:"center"
                    },
                    {
                        title: '等级名称',
                        dataIndex: 'className',
                        align:"center"
                    },
                    {
                        title: '星级',
                        dataIndex: 'starLevel',
                        align:"center"
                    },
                    {
                        title: '每小时收费标准',
                        dataIndex: 'chargeCriterion',
                        align:"center"
                    },
                    {
                        title: '每小时提成标准',
                        dataIndex: 'royaltyCriterion',
                        align:"center"
                    },
                    {
                        title: '备注',
                        dataIndex: 'remark',
                        align:"center",
                        width:500
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        scopedSlots: { customRender: 'operation' },
                        align:"center"
                    },
                ],
            };
        },
        methods: {
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                this.visible = true;
                this.form.validateFields(err => {
                    if (!err) {
                        console.info('success');
                    }
                });
            },
            onDelete(key) {
                const dataSource = [...this.dataSource];
                this.dataSource = dataSource.filter(item => item.key !== key);
            },
        },
    };
</script>
<style scoped>
    .btn_addition{
        margin-bottom: 8px;
    }
</style>