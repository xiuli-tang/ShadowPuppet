import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Vite6环境变量（.env文件配置）
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器（添加token/loading等）
service.interceptors.request.use(
  config => {
    // 示例：添加token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器（统一处理错误）
service.interceptors.response.use(
  response => {
    const res = response.data
    // 自定义业务码判断（示例）
    if (res.code !== 200) {
      // 可结合ElementUI等提示错误
      console.error(res.msg || '请求失败')
      return Promise.reject(res)
    }
    return res
  },
  error => {
    console.error('接口异常：', error)
    return Promise.reject(error)
  }
)

export default service