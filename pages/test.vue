<template>
  <div class="test">
    这是一个懒加载的组件
    <p>懒加载的 ssr 不会渲染</p>
  </div>
</template>

<script>
export default {
  name: 'Test',
  mounted() {
    this.$alert('test 组件 懒加载近来来');
  }
};
</script>

<style scoped>
.test {
  color: red;
}
</style>
