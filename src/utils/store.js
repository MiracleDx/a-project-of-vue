import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token') ? true : false,
    user: {
      username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
      avatar: localStorage.getItem('avatar') ? localStorage.getItem('avatar') : '',
      mobile: localStorage.getItem('mobile') ? localStorage.getItem('mobile') : '',
    }
  },
  mutations: {
    // 从登录中获取用户信息
    getUserInfo(state, user) {
      state.user.username = user.nickname ? user.nickname : user.username;
      state.user.avatar = user.avatar;
      state.user.mobile = user.mobile ? user.mobile : '';
      localStorage.setItem('username', user.nickname ? user.nickname : user.username);
      localStorage.setItem('avatar', user.avatar);
      localStorage.setItem( 'mobile', user.mobile ? user.mobile : '');
      console.log('从登录中获取userInfo', user);
    },
    // 修改登录状态
    changeLoginStatus(state, status) {
      state.isLogin = status;
      console.log('修改登录状态：', status)
    },
    // 如果有token说明是已登录状态
    checkStatus(state) {
      if (localStorage.getItem('token')) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
      console.log('校验登录状态');
    },
    // 清除登录信息
    clearStatus(state) {
      state.isLogin = false;
      state.user.username = '';
      state.user.avatar = '';
      state.user.mobile = '';
      console.log('清空登录信息');
    }
  }
})

export default store
