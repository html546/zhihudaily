//index.js
//获取应用实例
const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    duration:2000,
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    list:[],
    loading:false,
    plain:false
  },
  //事件处理函数
  bindViewTap: function(e) {
    // console.log(e);
    wx.navigateTo({
      url: '../detail/detail?id='+e.target.dataset.id
    })
  },
  loadMore(e){
    if(this.data.list.length === 0) return;
    var date = this.getNextDate();
    var that = this;
    that.setData({loading:true});
    console.log(Number((utils.formatDate(date)))+1);
    wx.request({
      url: 'http://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      header:{
        'Content-Type':'application/json'
      },
      success(res){
        console.log(res);
        that.setData({
          loading:false,
          list:that.data.list.concat([{header:utils.formatDate(date,'-')}]).concat(res.data.stories)
        })
      }
    })
  },
  getNextDate(){
    var now = new Date();
    now.setDate(now.getDate() - this.index++);
    // console.log(now);
    return now;
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        // console.log(res);
        that.setData({
          banner:res.data.top_stories,
          list:[{header:'今日热闻'}].concat(res.data.stories)
        })
      }
    })
    this.index = 1
  }
})
