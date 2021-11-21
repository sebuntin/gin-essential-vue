<template>
  <div class="login">
    <b-row class="mt-5">
      <b-col
        md="8"
        offset-md="2"
        lg="6"
        offset-lg="3"
      >
        <b-card title="登录">
          <b-form>
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
            <b-form-group>
              <b-button
                @click="login"
                variant="outline-primary"
                block
              >登录</b-button>
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import customValidator from '@/helper/validator';

export default {
  name: 'UserLogin',
  data() {
    return {
      user: {
        telephone: '',
        password: '',
      },
      telephoneValidation: null,
    };
  },
  validations: {
    user: {
      telephone: {
        required,
        telephone: customValidator.telephoneValidator,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  methods: {
    validateState(name) {
      // 这里是es6解构赋值
      const { $dirty, $error } = this.$v.user[name];
      return $dirty ? !$error : null;
    },
    login() {
      // active dirty value
      this.$v.user.$touch();
      // validate data
      if (this.$v.user.$anyError) {
        return;
      }
      // request api
      this.$store.dispatch('user/login', {
        telephone: this.user.telephone,
        password: this.user.password,
      }).then(() => {
        this.$router.replace({ name: 'Home' });
      }).catch((err) => {
        this.$bvToast.toast(err.response.data.msg, {
          title: '登录失败',
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
