<template>
  <div class="m-login">
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item prop="username">
        <el-input v-model="formData.username" placeholder="admin" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" placeholder="123456" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('form')">
          登 录 | 注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'MLogin',
  data() {
    return {
      // 表单数据
      formData: {
        // 手机号
        username: '',
        // 验证码
        password: ''
      },
      // 验证规则
      rules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      smsTime: 0
    };
  },
  methods: {
    // 登录
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 接口形式
          this.$store
            .dispatch('login', {
              username: this.formData.username,
              password: this.formData.password
            })
            .then(res => {
              this.$refs[formName] && this.$refs[formName].resetFields();
              this.$nextTick(() => {
                this.$emit('success', res);
              });
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.m-login {
  .countrycode {
    min-width: 90px;
  }
}
</style>
