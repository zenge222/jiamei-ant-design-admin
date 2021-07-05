<template>
  <div class="footer">
    <div class="links">
      <a href="http://www.shunduofz.com" target="_blank">顺铎集团</a>
      <a href="http://www.omnrj.com" target="_blank">阿姆尼</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright"/>
      2020 <span>阿姆尼软件有限公司</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LayoutFooter"
  }
</script>

<style lang="less" scoped>
  .footer {
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;

    .links {
      margin-bottom: 8px;

      a {
        color: rgba(0, 0, 0, .45);

        &:hover {
          color: rgba(0, 0, 0, .65);
        }

        &:not(:last-child) {
          margin-right: 40px;
        }
      }
    }
    .copyright {
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
    }
  }
</style>