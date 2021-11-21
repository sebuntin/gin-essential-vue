import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue'),
},
{
  path: '/about',
  name: 'About',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
},
{
  path: '/register',
  name: 'register',
  component: () => import('../views/register/Register.vue'),
},
{
  path: '/login',
  name: 'login',
  component: () => import('../views/login/Login.vue'),
},
];

// 解决路由跳转时报错 Avoided redundant navigation to current location: "/xxxxx".
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = (location) => {
  return originPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
