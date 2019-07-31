import axios from 'axios'
import { Indicator,Toast } from 'mint-ui'
axios.defaults.withCredentials = true

if (process.env.NODE_ENV === 'development') {
  // 开发环境代理
  //   axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  // 生产环境设置
  //   axios.defaults.baseURL = ''
}
axios.defaults.baseURL = 'http://localhost:8080'
// 存储全局加载动画状态
let loading = null
// 请求拦截器
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 响应处理
    // loading && loading.close()
    Indicator.close()
    return response;
  },
  error => {
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      Toast({message: `错误码：${error.response.status} ${error.response.data}`})
    } else {
      Toast({message: error.message})
    }
    // loading && loading.close()
    Indicator.close()
    return Promise.reject(error)
  }
)

export default function ajaxMethod(options = {}) {
  const {
    method,
    url,
    data,
    formSubmit,
    showLoading
  } = options
  if (!showLoading) { // 如果没传showLoading，默认显示加载层。传true不显示
    Indicator.open({
      text: 'Loading...',
      spinnerType: 'fading-circle'
    });
  }
  let config = {}
  if (!formSubmit) {
    config.headers = {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': '*/*'
    }
  } else {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    }
  }
  if (!method || method === 'get') {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: data,
          config
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  } else {
    return new Promise((resolve, reject) => {
      axios.post(url, data, config)
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
