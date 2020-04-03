// const interceptorsRequest = (method, url, data, header={})=> {
//   let params = { method, url, data, header };
//   let storageUserInfo = wx.getStorageSync('userInfo')
//   if(storageUserInfo){
//     header['Authorization'] = `Bearer ${storageUserInfo.token}`
//   }
//   return params
// }

const request = (method, url, data, header) => {
  // let params = interceptorsRequest(method, url, data, header)
  // console.log(params)
  return new Promise((resolve, reject)=>{
    wx.request({
      method,
      url: url,
      header: header,
      data: data,
      success: (res) => {
        console.log(res)
        resolve(res)
        console.log(123)
      },
      fail: (err) => {
        console.log(123123)

        reject(err)
      }
    })
  })
}

export default {
  post: function (url='', data, header={}) {
    console.log(url, data)
    return request('POST', url, data, header)
  },
  put: function (url='', data, header={}) {
    return request('PUT', url, data, header)
  },
  get: function (url, data, header={}) {
    return request('GET', url, data, header)
  },
  delete: function (url='', data, header={}) {
    return request('DELETE', url, header)
  }
}