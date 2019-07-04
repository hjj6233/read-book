/*
 * 通用方法挂载
 */

import ajaxMethod from './http'

export default {
  install(Vue)
  {
    // http请求
    Vue.prototype.ajaxMethod = ajaxMethod
  }
}