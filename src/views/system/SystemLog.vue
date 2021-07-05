<template>
    <a-card :bordered="false">
        <!--表格-->
        <a-table bordered :data-source="dataSource" :columns="columns" :pagination="pagination">
        </a-table>
    </a-card>
</template>

<script>
  export default {
    name: 'SystemLog',
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
                      logcontents:"用户名：superadmin，登录成功！",
                      operatorID: 'superadmin',
                      operatorName:"superadmin",
                      internet:"116.5.168.43",
                      logType:"登录日志",
                      operationType:"登录",
                      operationTime:"2020/12/07 12:23:32",
                  },
                  {
                      key: '1',
                      number: '02',
                      logcontents:"用户名：superadmin，登录成功！",
                      operatorID: 'superadmin',
                      operatorName:"superadmin",
                      internet:"116.5.168.43",
                      logType:"登录日志",
                      operationType:"登录",
                      operationTime:"2020/12/07 12:23:32",
                  },
                  {
                      key: '2',
                      number: '03',
                      logcontents:"用户名：superadmin，登录成功！",
                      operatorID: 'superadmin',
                      operatorName:"superadmin",
                      internet:"116.5.168.43",
                      logType:"登录日志",
                      operationType:"登录",
                      operationTime:"2020/12/07 12:23:32",
                  },
              ],
              columns: [
                  {
                      title: '序号',
                      dataIndex: 'number',
                      align:"center"
                  },
                  {
                      title: '日志内容',
                      dataIndex: 'logcontents',
                      align:"center"
                  },
                  {
                      title: '操作人ID',
                      dataIndex: 'operatorID',
                      align:"center"
                  },
                  {
                      title: '操作人名称',
                      dataIndex: 'operatorName',
                      align:"center"
                  },
                  {
                      title: 'ip',
                      dataIndex: 'internet',
                      align:"center",
                  },
                  {
                      title: '日志类型',
                      dataIndex: 'logType',
                      align:"center",
                  },
                  {
                      title: '操作类型',
                      dataIndex: 'operationType',
                      align:"center"
                  },
                  {
                      title: '操作时间',
                      dataIndex: 'operationTime',
                      align:"center"
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