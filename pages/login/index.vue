<template>
  <section class="login">
    <m-login @success="success" />
  </section>
</template>

<script>
import MLogin from '../../components/modules/m-login';
export default {
  name: 'Login',
  layout: 'no-login',
  components: { MLogin },
  middleware: 'noAuth',
  mounted() {
    const { referrer = '/user' } = this.$route.query;
    this.redirectURL = referrer;
  },
  methods: {
    success() {
      this.$router.push({
        path: this.redirectURL
      });
    }
  }
};
</script>

<style lang="less">
.login {
  width: 350px;
  margin: 0 auto;
  padding: 100px 0;
}
</style>
