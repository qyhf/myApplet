// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    near_playId: "null", //判断最近中歌曲的哪一首歌要播放
    collect_playId: "null",//判断收藏中歌曲的哪一首歌要播放
    near: [],               //存储最近歌曲信息
    collects: [],           //存储收藏歌曲信息
    tab_switch:true,        //判断切换最近与收藏
    nickName:"",
    
  },
  // 收藏中歌曲跳转到音乐播放
  collect_jump: function (e) {
    let index = e.currentTarget.dataset['index'];
    let str = encodeURIComponent(JSON.stringify(this.data.collects[index]));
    wx.navigateTo({
      url: '/pages/player/player?jsonStr=' + str
    })
  },
   // 最近中歌曲跳转到音乐播放
  near_jump:function(e){
    let index = e.currentTarget.dataset['index'];
    let str = encodeURIComponent(JSON.stringify(this.data.near[index]));
    wx.navigateTo({
      url: '/pages/player/player?jsonStr=' + str
    })
  },
  //播放歌曲
  play: function (e) {
    var _this=this;
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    var index = e.currentTarget.dataset['index'];
    var type = e.currentTarget.dataset['type'];
    // 实现最近与收藏的同步播放
if(type=="near"){//判断要播放的是否来自最近歌单
  _this.setData({
    near_playId: (index.toString()),
  });
  backgroundAudioManager.src = this.data.near[this.data.near_playId].src;
  backgroundAudioManager.title = this.data.near[this.data.near_playId].song;
  var app = getApp();
  app.globalData.isplay = true;
  app.globalData.songName = this.data.near[this.data.near_playId].song;
  backgroundAudioManager.onEnded(this.ended);
  _this.data.collects.forEach((item, index) => {
    if (item.song == app.globalData.songName) {
      _this.setData({
        collect_playId: index
      })
    }
  });
  
  
};
if(type=="collect"){
  this.setData({
    collect_playId:index,
  });
  backgroundAudioManager.src = this.data.collects[this.data.collect_playId].src;
  backgroundAudioManager.title = this.data.collects[this.data.collect_playId].song;
  var app = getApp();
  app.globalData.isplay = true;
  app.globalData.songName = this.data.collects[this.data.collect_playId].song;
  backgroundAudioManager.onEnded(this.ended);
  _this.data.near.forEach((item, index) => {
    if (item.song == app.globalData.songName) {
      _this.setData({
        near_playId: index
      })
    }
  });
}

  },
  bindGetUserInfo:function(){
    var _this=this;
    wx.login({
      success(res) {
        if (res.code) {
          // 获取用户信息
          wx.getUserInfo({
            success: function ({ userInfo }) {
              _this.setData({ userInfo })
              let str = userInfo.nickName;
              let str2 = str.substr(2)
              _this.setData({
                nickName: str2
              })
            }
          })

        } else {
          console.log("登陆失败");
        }
      }
    })
  },
  //暂停播放
  pause: function () {
    var _this = this;
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.pause();
    var app = getApp();
    app.globalData.isplay = false;
    app.globalData.songName = "";
    this.setData({
      near_playId: "null",
      collect_playId: "null",
    });
  },
  // 播放结束初始化歌曲状态
  ended: function () {
   
    this.setData({
      near_playId: "null",
      collect_playId: "null",
    });
    var app = getApp();
    app.globalData.isplay = false;
    app.globalData.songName = "";
  },
  near:function(){
    this.setData({
      tab_switch:true,
    })
  },
  coll:function(){
    this.setData({
      tab_switch: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    // 获取全局变量数据
    wx.login({
      success(res) {
        if (res.code) {
          // 获取用户信息
          wx.getUserInfo({
            success: function ({ userInfo }) {
              _this.setData({ 
                userInfo,
                })
              let str = userInfo.nickName;
              let str2=str.substr(2)
              _this.setData({
                nickName:str2
              })
            }
          })

        } else {
          console.log("登陆失败");
        }
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this;
    // 获取全局变量数据
    var app = getApp();
    // 将全局变量收藏与最近的歌曲导入
    console.log(app.globalData.isplay);
    this.setData({
      collects: app.globalData.collect,
      near: app.globalData.near,
    })
    if (app.globalData.isplay == true) {
      _this.data.collects.forEach((item, index) => {
        if (item.song == app.globalData.songName) {
          _this.setData({
            collect_playId: index
          });
         
        }

      });
      _this.data.near.forEach((item, index) => {
        if (item.song == app.globalData.songName) {
          _this.setData({
            near_playId: (index.toString())
          })
        }
      })
      let backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.onEnded(this.ended)
    }else{
      this.setData({
        near_playId: "null",
        collect_playId: "null",
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面跳转清空数据停止播放
    // this.setData({
    //   collects: [],
    //   near: [],
    // })
    // // 重新导入数据
    // var app = getApp();
    // this.setData({
    //   collects: app.globalData.collect,
    //   near: app.globalData.near,
    //   near_playId: "null",
    //   collect_playId: "null",
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})