import User from './../../models/user'

Page({
  handLogin:function(){
    wx.login({
      success(res){
        if (!res.code) {
          wx.showToast({ title: '缺少code参数',icon: 'success',duration: 2000})
          return
        }
        User.login({code:res.code}).then(data => {
          if (data.data.code === 200) {
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
