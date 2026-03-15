import request from './index'

// 首页数据接口
export const getHomeData = (params) => {
  return request({
    url: '/home/data',
    method: 'get',
    params
  })
}

// 首页提交接口（示例）
export const submitHomeForm = (data) => {
  return request({
    url: '/home/submit',
    method: 'post',
    data
  })
}