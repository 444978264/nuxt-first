<template>
  <section class="container">
    <h2 class="info">
      {{ user }}
    </h2>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
export default {
  name: 'Id',
  asyncData({ app, params, error }) {
    return app.$axios
      .get('/api/users/' + params.id)
      .then(res => {
        return { user: res.name };
      })
      .catch(e => {
        error({ statusCode: 404, message: 'User not found' });
      });
  },
  head() {
    return {
      title: `User: ${this.user.name}`
    };
  }
};
</script>

<style scoped>
.title {
  margin-top: 30px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button {
  margin-top: 30px;
}
</style>
