<template>
  <div class="v-auth">
    <slot>
      <m-login />
    </slot>
  </div>
</template>

<script>
import MLogin from '../modules/m-login';
export default {
  name: 'VAuth',
  components: {
    MLogin
  }
};
</script>

<style scoped>
.v-auth {
  width: 350px;
  margin: 0 auto;
  padding: 100px 0;
}
</style>
