import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

/**
 * 1、通过按需导入的createApp方法来构建vue实例
 * 2、通过vue实例.use方法来挂载插件(router、vuex)
 * 3、没有了 Vue 构造方法，无法再挂载原型
 *
*/
const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
