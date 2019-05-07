export default function({ store, redirect }) {
  console.log(store.state.token, 'noAuth');
  // 如果用户通过身份验证，则重定向到主页
  if (store.state.token) {
    return redirect('/');
  }
}
