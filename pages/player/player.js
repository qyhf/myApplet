// pages/player/player.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    collection:[],//存储歌曲信息
    isShow:true,  //播放与暂停的判断
    songWord:[], //存储歌词
    songActive:0,//高亮的歌词
    distance:28, //歌词滚动距离
    rotate:0,    
    timer:null, //定时器
    isCollect:true,//是否收藏
    song:"",
    songName:"",
    isPlay:false,
    num:0,
    
    collect:"https://6162-ab123-x6z8h-1302184839.tcb.qcloud.la/collect_h.png?sign=1e2921cc40c216a83d33ef2bf49572b6&t=1589850804" //收藏的图片路径
  },
  // 收藏功能
  collect:function(){
    var _this=this;
    this.data.isCollect=!this.data.isCollect;
    this.setData({
      collect: (_this.data.isCollect ? "https://6162-ab123-x6z8h-1302184839.tcb.qcloud.la/collect_h.png?sign=1e2921cc40c216a83d33ef2bf49572b6&t=1589850804" :"https://6162-ab123-x6z8h-1302184839.tcb.qcloud.la/collect.png?sign=e998cc889ef0ae92083707e4417c7fd4&t=1589850828")
    });
    // 将收藏的歌曲存储到全局变量中
    var app = getApp();
    if (this.data.collect == "https://6162-ab123-x6z8h-1302184839.tcb.qcloud.la/collect_h.png?sign=1e2921cc40c216a83d33ef2bf49572b6&t=1589850804"){
      app.globalData.collect.forEach(function (item,index) {
        if (item.src == _this.data.song){
          app.globalData.collect.splice(index,1);
        }
      })
    }else{
      app.globalData.collect.push(this.data.collection);
    }
    
  },
  // 音乐播放
  audioPlay: function () {
    var _this = this;
    this.setData({
      isShow: (!_this.data.isShow),
    });
    // _this.audioCtx.play()
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.title = this.data.songName;
    backgroundAudioManager.src = this.data.song;
    backgroundAudioManager.onEnded(this.ended);
    backgroundAudioManager.onTimeUpdate(this.change)
    backgroundAudioManager.onStop(this.ended)
    // 将歌曲存储到全局变量中
    var app=getApp();
    app.globalData.isplay=true;
    app.globalData.songName = this.data.songName;
    app.globalData.near.forEach(function (item){
      if (item.src == _this.data.song) {
        _this.setData({
          isPlay:true,
        })
      }
    });
    if(this.data.isPlay!=true){
      app.globalData.near.push(this.data.collection);
    }
    clearInterval(this.timer);
    this.timer=setInterval(function(){
      _this.data.rotate++;
      _this.setData({
        rotate: _this.data.rotate,
      })
    },100)
  },
  
  // 暂停播放
  audioPause: function () {
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    console.log(backgroundAudioManager.pause())
    var _this = this;
    this.setData({
      isShow: (!_this.data.isShow),
    });
    clearInterval(this.timer);
    // _this.audioCtx.pause()
    backgroundAudioManager.pause();
    var app = getApp();
    app.globalData.isplay = false;
    app.globalData.songName ="";
  },
  // 播放结束
  ended:function(){
    var _this = this;
    clearInterval(this.timer);
    this.setData({
      isShow: true,
      songActive: 0,
      distance: 30,
      rotate: 0,
    });
    var app = getApp();
    app.globalData.isplay = false;
    app.globalData.songName = "";
  },
  // 歌词高亮与滚动功能
  change:function(e){
    // 获取播放时间
    let backgroundAudioManager = wx.getBackgroundAudioManager();
    var m = "0" + parseInt(backgroundAudioManager.currentTime/60);
    var s = parseInt(backgroundAudioManager.currentTime%60);
    if(s<10){
      s="0"+s;
    };
    var str=m+":"+s;
   
    for (var j = this.data.num; j < this.data.songWord.length;j++) {
      if (this.data.songWord[j].time == str){
        if (this.data.songActive != j) {
          // 高亮的歌词
          this.setData({
            songActive:j,
          })
          // 滚动的距离
          this.data.distance-=28;
          this.setData({
            distance: this.data.distance,
          })
         break;
        }
      }
    }
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    var _this=this;
    // 把传入的数据转为对象
    
    var data = decodeURIComponent(options.jsonStr)
    var object=JSON.parse(data);
   
    this.setData({
      collection:object,
      songName:object.song,
      song:object.src,
      songImg:object.hotImg,
    })
  
    // 歌词的制作
    var str = object.word;
    var arr=[];
    var arr2=[];
    
    arr=str.split(',');
  for(var i=0;i<arr.length;i++){
    if(i%2==0){
      var obj={
        time:arr[i],
        text:arr[i+1],
      }
      arr2.push(obj);
    };
    
  };
  this.setData({
    songWord: arr2,
  })
    // 获取全局变量收藏数组信息判断是否收藏过
    var app = getApp();
    if (app.globalData.isplay == true) {
      if (app.globalData.songName == object.song) {
        this.setData({
          isShow: (!_this.data.isShow),
        });
        clearInterval(this.timer);
        this.timer = setInterval(function () {
          _this.data.rotate++;
          _this.setData({
            rotate: _this.data.rotate,
          })
        }, 100)

        let backgroundAudioManager = wx.getBackgroundAudioManager();
        var m = "0" + parseInt(backgroundAudioManager.currentTime / 60);
        var s = parseInt(backgroundAudioManager.currentTime % 60);
        if (s < 10) {
          s = "0" + s;
        };
        var str = m + ":" + s;
        for (var i = 0; i < _this.data.songWord.length; i++) {
          // 歌词时间与播放时间比较
          if (this.data.songWord[i].time == str) {
            this.setData({
              num: i,
              distance: (-(i-1) * 28),
              songActive:i
            });
            break;
          }
          if (this.data.songWord[i].time > str) {
            this.setData({
              num: i-1,
              distance: (-(i-1 - 1) * 28),
              songActive: i-1
            });
            break;
          }
        } 
       backgroundAudioManager.onTimeUpdate(this.change);
        backgroundAudioManager.onEnded(this.ended)

      }

    }
    app.globalData.collect.forEach(function (item) {

      if (item.src == _this.data.song) {
        _this.setData({
          collect: "https://6162-ab123-x6z8h-1302184839.tcb.qcloud.la/collect.png?sign=e998cc889ef0ae92083707e4417c7fd4&t=1589850828",
          isCollect: false
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
  
    // this.audioCtx = wx.createAudioContext('myAudio');
    
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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