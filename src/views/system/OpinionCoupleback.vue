<template>
    <a-card :bordered="false">
        <!--表格-->
        <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination">
        </a-table>
    </a-card>
</template>

<script>
  export default {
    name: 'OpinionCoupleback',
      data() {
          return {
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
                      feedbackCont:"没有订单提醒",
                      userName: '王璐',
                      phoneNum:"12512421212",
                      dataSource:"员工端",
                      feedbackTime:" 2020/12/07 12:23:32",
                  },
                  {
                      key: '1',
                      number: '02',
                      feedbackCont:"没有订单提醒",
                      userName: '王璐',
                      phoneNum:"12512421212",
                      dataSource:"员工端",
                      feedbackTime:" 2020/12/07 12:23:32",
                  },
                  {
                      key: '2',
                      number: '03',
                      feedbackCont:"没有订单提醒",
                      userName: '王璐',
                      phoneNum:"12512421212",
                      dataSource:"员工端",
                      feedbackTime:" 2020/12/07 12:23:32",
                  },
              ],
              columns: [
                  {
                      title: '序号',
                      dataIndex: 'number',
                      align:"center"
                  },
                  {
                      title: '反馈内容',
                      dataIndex: 'feedbackCont',
                      align:"center"
                  },
                  {
                      title: '用户名',
                      dataIndex: 'userName',
                      align:"center"
                  },
                  {
                      title: '手机号码',
                      dataIndex: 'phoneNum',
                      align:"center"
                  },
                  {
                      title: '数据来源',
                      dataIndex: 'dataSource',
                      align:"center",
                  },
                  {
                      title: '反馈时间',
                      dataIndex: 'feedbackTime',
                      align:"center",
                  },
              ],
          };
      },
      methods: {

      },
  }
</script>

<style scoped>

</style>