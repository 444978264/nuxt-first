import consola from 'consola';

export default ({ redirect, store, route, app, req }) => {
  if (!store.state.token) {
    consola.info('redirect', route.fullPath);
    return redirect(`/login?referrer=${encodeURIComponent(route.fullPath)}`);
  }
};
