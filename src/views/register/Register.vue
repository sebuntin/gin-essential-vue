<template>
  <div class="register">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="注册">
          <b-form>
            <b-form-group label="姓名">
              <b-form-input
                v-model="$v.user.name.$model"
                type="text"
                placeholder="输入您的名称（选填）"
                :state="validateState('name')"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="手机号">
              <b-form-input
                v-model="$v.user.telephone.$model"
                type="number"
                :state="validateState('telephone')"
                placeholder="输入您的手机号"
              ></b-form-input>
              <b-form-feedback :state="validateState('telephone')">
                手机号格式有误
              </b-form-feedback>
            </b-form-group>
            <b-form-group label="密码">
              <b-form-input
                v-model="$v.user.password.$model"
                type="password"
                placeholder="输入您的密码"
                :state="validateState('password')"
              ></b-form-input>
              <b-form-feedback :state="validateState('password')">
                密码必须大于6位
              </b-form-feedback>
            </b-form-group>
            <b-form-group label="确认密码">
              <b-form-input
                v-model="$v.user.confirmPwd.$model"
                type="password"
                placeholder="确认您的密码"
                :state="validateState('confirmPwd')"
              ></b-form-input>
              <b-form-feedback :state="validateState('confirmPwd')">
                密码两次输入不一致
              </b-form-feedback>
            </b-form-group>
            <b-form-group>
              <b-button
                @click="register"
                variant="outline-primary"
                block
              >注册</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
// import { mapActions } from 'vuex';
import customValidator from '@/helper/validator';

export default {
  name: 'UserRegister',
  data() {
    return {
      user: {
        name: '',
        telephone: '',
        password: '',
        confirmPwd: '',
      },
    };
  },
  validations: {
    user: {
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
      },
      name: {
      },
      password: {
        required,
        minLength: minLength(6),
      },
      confirmPwd: {
        required,
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    // TODO: 使用mapActions重命名模块调用
    validateState(name) {
      // 这里是es6解构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    register() {
      // active dirty value
      this.$v.user.$touch();
      // validate data
      if (this.$v.user.$anyError) {
        return;
      }
      this.$store.dispatch('user/register', this.user).then(() => {
        // jump to home page
        this.$router.replace({ name: 'Home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '数据验证错误',
          variant: 'danger',
          solid: true,
        });
      });
    },
  },
};
</script>

<style>
</style>
