<template>
  <el-dialog
    title="登录|注册"
    :visible.sync="isShow"
    class="v-login"
    width="50%"
  >
    <m-login @success="success" />
  </el-dialog>
</template>

<script>
import MLogin from '../modules/m-login';
export default {
  name: 'VLogin',
  components: { MLogin },
  data() {
    return {
      // 默认不显示
      isShow: false
    };
  },
  methods: {
    success() {
      this.isShow = false;
    }
  }
};
</script>

<style lang="less" scoped>
.v-login {
}
</style>
