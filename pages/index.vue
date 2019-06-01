<template>
  <section class="container">
    <div>
      <logo />
      <el-button type="primary" @click="loadTest = true">
        懒加载test模块
      </el-button>
      <test v-if="loadTest" />
      <h1 class="title">
        users
      </h1>
      <h2 class="subtitle">
        <ul class="users">
          <li v-for="(user, index) in users" :key="index" class="user">
            <nuxt-link :to="{ name: 'id', params: { id: index } }">
              {{ user.name }}
            </nuxt-link>
          </li>
        </ul>
      </h2>
      <br />
      <nuxt-link to="/user">
        点我去个人中心
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
    Test: () => import(/* webpackChunkName: "test" */ './test.vue')
  },
  data() {
    return {
      users: [],
      loadTest: false
    };
  },
  computed: {
    count() {
      return 0;
    }
  },
  async asyncData(app) {
    let { data } = await app.$http.get('/api/users', {}, { proxy: false });
    return { users: data };
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
