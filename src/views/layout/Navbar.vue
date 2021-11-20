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
          <!-- Using 'button-content' slot -->
          <b-nav-item @click="$router.replace({name: 'login'})">登录</b-nav-item>
          <b-nav-item @click="$router.replace({name: 'register'})">注册</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
<script>
export default {
  name: 'NavBar',
};
</script>
