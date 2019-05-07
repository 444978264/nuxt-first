<template>
  <div
    class="v-header g-flex g-flex-item g-flex-between"
    :style="{ color: color }"
  >
    <section class="g-flex-left g-vcenter">
      <slot name="logo" />
      <el-menu
        :text-color="color"
        :active-text-color="activeColor"
        :background-color="backgroundColor"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <template v-for="item in leftList">
          <el-submenu
            v-if="item.children && item.children.length"
            :key="item.url"
            :index="item.url"
          >
            <template slot="title">
              {{ item.title }}
            </template>
            <template v-for="el in item.children">
              <el-submenu
                v-if="el.children && el.children.length"
                :key="el.url"
                :index="el.url"
              >
                <template slot="title">
                  {{ el.title }}
                </template>
                <el-menu-item
                  v-for="subEl in el.children"
                  :key="subEl.url"
                  :index="subEl.url"
                >
                  {{ subEl.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :key="el.url" :index="el.url">
                {{ el.title }}
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="item.url" :index="item.url">
            {{ item.title }}
          </el-menu-item>
        </template>
      </el-menu>
    </section>
    <section class="g-flex-right g-vcenter">
      <slot name="login">
        <div class="g-pointer" @click="$refs.login.isShow = true">
          登录|注册
        </div>
        <no-ssr>
          <v-login ref="login" />
        </no-ssr>
      </slot>
    </section>
  </div>
</template>

<script>
import VLogin from '../v-login/v-login';

export default {
  name: 'VHeader',
  components: {
    VLogin
  },
  props: {
    backgroundColor: {
      default: '#00d02a',
      type: String
    },
    color: {
      default: '#fff',
      type: String
    },
    activeColor: {
      default: '#e7ff1c',
      type: String
    },
    logo: {
      type: Boolean,
      default: true
    },
    left: {
      default() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      activeIndex: '1',
      openDialog: false,
      leftList: [],
      rightList: [
        {
          url: '/',
          title: '关于',
          children: []
        }
      ]
    };
  },
  computed: {
    list() {
      return this.left.length ? this.left : this.leftList;
    }
  },
  methods: {
    handleSelect(path, keyPath) {
      console.log(path, keyPath);
      this.$router.push({
        path
      });
    }
  }
};
</script>

<style lang="less">
.v-header {
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;

  .link {
    margin: 0 10px;
  }

  .nav-bar {
    .ant-popover-inner-content {
      padding: 10px 0px;
    }
  }
}

.dropdown-list {
  margin: 0;

  li {
    line-height: 30px;
    padding: 0 10px;
    min-width: 120px;

    &:hover {
      background: #f5f5f5;
    }
  }
}
</style>
