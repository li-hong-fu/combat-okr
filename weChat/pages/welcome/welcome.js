import User from './../../models/user'

Page({
  onLoad:function(){
    let token = wx.getStorageSync('token')
    if(token){
      wx.switchTab({url:'/pages/todo/todo'})
    }
  },
  handLogin:function(){
    wx.login({
      success(res){
        User.login({code:res.code}).then(data => {
          console.log(data)
          if (data.data.code === 200) {
            let token = data.data.data.token
            let id = data.data.data.id
            wx.setStorageSync('id', id)
            wx.setStorageSync('token', token)
            wx.showToast({ title: '登录成功',icon: 'success',duration: 2000})
            wx.switchTab({
              url: '/pages/todo/todo'
            })
          }
        }).catch((e)=>{
          console.log(e)
        })
      }
    })
  }
})
