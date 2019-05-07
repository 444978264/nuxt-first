<template>
  <div class="m-login">
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item prop="mobile">
        <el-input v-model="formData.mobile" placeholder="手机号">
          <el-select
            slot="prepend"
            v-model="formData.country_code"
            filterable
            placeholder="请选择"
            type="primary"
            class="countrycode"
          >
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.code"
              :value="item.code"
            >
              <span style="float: left">{{ item.code }}</span>
              <span style="float: left; color: #8492a6; font-size: 13px">{{
                item.name
              }}</span>
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="formData.code" placeholder="短信验证码">
          <el-button slot="append" type="primary" @click="sendSMS">
            {{ smsTime > 0 ? smsTime + 's后重新获取' : '发送验证码' }}
          </el-button>
        </el-input>
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
import countrycode from '../../mixins/countrycode';
import Common from '../../mixins/common';
export default {
  name: 'MLogin',
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!Common.checkMobile(this.formData.country_code, value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      formData: {
        // 国家代码
        country_code: '+86',
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      },
      // 验证规则
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入4位验证码', trigger: 'blur' }
        ]
      },
      options: countrycode,
      smsTime: 0
    };
  },
  methods: {
    // 倒计时
    countDown() {
      if (this.authTimeTimer) {
        clearTimeout(this.authTimeTimer);
      }
      this.authTimeTimer = setTimeout(() => {
        this.smsTime -= 1;
        if (this.smsTime === 0) {
          clearTimeout(this.authTimeTimer);
        } else {
          this.countDown();
        }
      }, 1000);
    },
    // 获取验证码
    sendSMS() {
      if (this.smsTime > 0) {
        console.log('请' + this.smsTime + 's后再试');
        return;
      }
      this.$refs.form.validateField('mobile', phoneError => {
        if (!phoneError) {
          let _mobile = this.formData.mobile;
          if (this.formData.country_code !== '+86') {
            _mobile = this.formData.country_code + this.formData.mobile;
          }
          this.$http
            .sendSMS({
              channel: 1,
              mobile: _mobile,
              type: 4
            })
            .then(res => {
              this.smsTime = 60;
              this.countDown();
              this.$alert('验证码已发送至手机号上，请查收。', '', {
                confirmButtonText: '确定',
                callback: action => {}
              });
            });
        }
      });
    },
    // 登录
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 接口形式
          this.$store
            .dispatch('login', {
              country_code: this.formData.country_code,
              mobile: this.formData.mobile,
              code: this.formData.code
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
