<template>
  <b-navbar
    toggleable="lg"
    type="dark"
    variant="dark"
  >
    <b-container>
      <b-navbar-brand href="#">返回博客</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse
        id="nav-collapse"
        is-nav
      >
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown
            right
            v-if="userInfo"
          >
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{userInfo.name}}</em>
            </template>
            <b-dropdown-item @click="$router.push({name: 'Home'})">个人主页</b-dropdown-item>
            <b-dropdown-item href="#">登出</b-dropdown-item>
          </b-nav-item-dropdown>

          <div v-if="!userInfo">
            <b-nav-item
              v-if="$route.name != 'login'"
              @click="$router.replace({name: 'login'})"
            >登录</b-nav-item>
            <b-nav-item
              v-if="$route.name != 'register'"
              @click="$router.replace({name: 'register'})"
            >注册</b-nav-item>
          </div>

        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
import storageService from '@/service/storageService';

export default {
  computed: {
    // 由于不是响应式的,故无法同步更新
    // 当换账号登录后,必须刷新页面后才能更新
    userInfo() {
      console.log(JSON.parse(storageService.get(storageService.USER_INFO)));
      return JSON.parse(storageService.get(storageService.USER_INFO));
    },
  },
  name: 'NavBar',
};
</script>
