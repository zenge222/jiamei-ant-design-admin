<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="title"><img src="~@/assets/jiamei_logo@2x.png" alt="logo" class="logo">嘉美美家管理平台</div>
<!--        <div class="header">-->
<!--          <a href="/" class="logo">-->
<!--&lt;!&ndash;            <span class="title">嘉美美家</span>&ndash;&gt;-->
<!--          </a>-->
<!--        </div>-->
<!--        <div class="desc">-->
<!--          后台管理系统-->
<!--        </div>-->
      </div>

      <route-view></route-view>

      <div class="footer">
        <div class="links">
          <a href="http://www.shunduofz.com" target="_blank">顺铎集团</a>
          <a href="http://www.omnrj.com" target="_blank">阿姆尼软件</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2020 阿姆尼软件有限公司
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RouteView from "@/components/layouts/RouteView"
  import { mixinDevice } from '@/utils/mixin.js'

  export default {
    name: "UserLayout",
    components: { RouteView },
    mixins: [mixinDevice],
    data () {
      return {}
    },
    mounted () {
      document.body.classList.add('userLayout')
    },
    beforeDestroy () {
      document.body.classList.remove('userLayout')
    },
  }
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url('https://jiamei-1259302518.cos.ap-shanghai.myqcloud.com/jiamei_login_bg.jpg') no-repeat 50%;
      background-size: cover;
      padding: 100px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
          font-size: 0;
        text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        .title {
          font-size: 33px;
          color: #ed8933;
          font-family: "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-weight: 400;
          padding-bottom: 54px;
            .logo {
                height: 34px;
                border-style: none;
                margin-right: 3px;
                position: relative;
                transform: translateY(-2px);
            }
        }

        .header {
          padding-bottom: 44px;
          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }
        }
        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
        padding: 60px 100px 30px;
        background: rgba(255,255,255,.7);
        /*background: rgba(255,255,255,.7);*/
        box-sizing: content-box;
        border-radius: 8px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;
        font-weight: 500;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: #333333;
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: #333333;
          font-size: 14px;
        }
      }
    }
  }
</style>