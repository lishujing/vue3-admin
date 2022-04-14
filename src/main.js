import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 初始化样式表
import './styles/index.scss'
// 导入内部图标
import installIcons from '@/icons'
// 导入路由鉴权
import './permission'
// i18n 的导入需要放在 APP.vue 导入之前，因为后面我们会在app.vue 中使用国际化内容
import i18n from '@/i18n'
/**
 * 1、通过按需导入的createApp方法来构建vue实例
 * 2、通过vue实例.use方法来挂载插件(router、vuex)
 * 3、没有了 Vue 构造方法，无法再挂载原型
 *
*/
const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(i18n).use(store).use(router).mount('#app')
