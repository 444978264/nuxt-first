<template>
  <div>
    <el-container>
      <!--头部-->
      <el-header class="g-vcenter g-flex col-theme">
        <v-header>
          <logo slot="logo" />
          <div v-if="isLogin" slot="login" class="g-pointer">
            欢迎你,<span>{{ userInfo.name }}</span>
            <span @click="logout">退出登录</span>
          </div>
        </v-header>
      </el-header>
      <!--主要内容-->
      <el-main>
        <nuxt />
      </el-main>
      <!--尾部-->
      <el-footer>
        <v-footer />
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import VHeader from '../components/v-header/v-header';
import Logo from '../components/Logo';
import VFooter from '../components/v-footer/v-footer';
export default {
  components: { VFooter, Logo, VHeader },
  data() {
    return {
      current: ['mail']
    };
  },
  computed: {
    ...mapGetters(['userInfo', 'isLogin'])
  },
  methods: {
    logout: function() {
      this.$confirm('您确定要退出此次登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('logout');
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less">
.col-theme {
  background: @col-theme;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
