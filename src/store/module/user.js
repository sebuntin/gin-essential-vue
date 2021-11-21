import userService from '../../service/userService';
import storageService from '../../service/storageService';
// define user module
export default {
  namespaced: true,
  state: {
    token: storageService.get(storageService.USER_TOKEN),
    userInfo: storageService.get(storageService.USER_INFO),
  },
  mutations: {
    /**
     *
     * @param {当前token的状态} state
     * @param {token参数} token
     */
    SET_TOKEN(state, token) {
      // update local cache
      storageService.set(storageService.USER_TOKEN, token);
      // update state
      state.token = token;
    },
    /**
     *
     * @param {当前userInfo的状态} state
     * @param {userInfo参数} userInfo
     */
    SET_USERINFO(state, userInfo) {
      // update local cache
      storageService.set(storageService.USER_INFO, JSON.stringify(userInfo));
      // update user info
      state.userInfo = userInfo;
    },
  },

  actions: {
    register(context, { name, telephone, password }) {
      return new Promise((resolve, reject) => {
        // request api
        userService.register({ name, telephone, password }).then((res) => {
        // save token
          context.commit('SET_TOKEN', res.data.data.token);
          // get user info
          return userService.info();
        }).then((res) => {
        // save user info
          context.commit('SET_USERINFO', res.data.data.user);
          // jump to home page
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

    login(context, { telephone, password }) {
      return new Promise((resolve, reject) => {
        // request api
        userService.login({ telephone, password }).then((res) => {
          // save token
          context.commit('SET_TOKEN', res.data.data.token);
          // get user info
          return userService.info();
        }).then((res) => {
        // save user info
          context.commit('SET_USERINFO', res.data.data.user);
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },

  },
};
