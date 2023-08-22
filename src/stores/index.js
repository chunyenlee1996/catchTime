import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
// 加這個插件可以讓寫在 persist 中要存的內容存在 localStorage 裡面
import persistedstate from 'pinia-plugin-persistedstate'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  pinia.use(persistedstate)

  return pinia
})
