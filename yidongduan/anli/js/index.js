var init = (function(){
  var md = {
    pageName : function(id){
      return $('body').attr('id') === id ? true : false;
    }
  };
  var resetWin = function(){
    var initScreen=function(callback){//初始化html  font-size
      // $("html").css("font-size",document.documentElement.clientHeight/document.documentElement.clientWidth<1.5 ? (document.documentElement.clientHeight/603*312.5+"%") : (document.documentElement.clientWidth/375*312.5+"%")); //单屏全屏布局时使用,短屏下自动缩放
      $("html").css("font-size",document.documentElement.clientWidth/375*312.5+"%");//长页面时使用,不缩放
      if(callback)callback();
    };
    function _onorientationchange(e){
      if(window.orientation==90||window.orientation==-90){
        $("#forhorview").addClass('show');  //显示竖屏浏览提示框
      }else{//竖屏下恢复默认显示效果
        var st=setTimeout(initScreen,300);
        $("#forhorview").removeClass('show');
      }
    }
    initScreen();
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",     function(e){_onorientationchange(e);}, false);
  };

  var fn = function(){
    resetWin();
  };
  return {
    md : md,
    fn : fn
  }
})();

$(function(){
  init.fn();
});

var MethodFn = function(){};
MethodFn.prototype = {
  getCode: function(control,callback){
    //获取验证码
    var status = false;//触发状态，间隔时间根据TIME
    var TIME = 30;//30秒
    var clear = null;
    $(control).on('click',function () {
      if(!status){
        var that = $(this);
        status = true;
        that.text(TIME+'s');
        /*
         * 此处执行ajax获取验证码
         * */
         callback && callback();
        //TIME 秒数递减过渡
        clear = setInterval(function(){
          --TIME;
          if(TIME < 0){
            that.text('发送短信验证码');
            status = false;
            TIME = 30;
            clearInterval(clear);
          }else{
            that.text(TIME+'s');
          }
        },1000);
      }
    })
  },
  marquee: function(control,callback){
    var parent = $(control);
    var ani = parent.find('.ani');
    var aniWidth = ani.width();
    var winWidth = $(window).width();
    //console.log(aniWidth,winWidth)
    // console.log();
    var move = 0;
    //走马灯内容不超出当前屏幕宽度，不进行滚动
    if(aniWidth >= winWidth){
      $(control).append(ani[0].outerHTML);
      // console.log(aniWidth)
      setInterval(function(){
        move ++;
        if(move > aniWidth){
          // $('.ani').eq(0).remove();
          move = 0;
          // $(control).append(ani[0].outerHTML);
        }
        parent.css({
          'transform':'translateX(-'+move+'px)'
        })
      },30);
    }
  },
  pop: function(pop){
    return {
      show: function(){
        $(pop).addClass('show');
        $('#mask').addClass('show');
      },
      hide: function(){
        $(pop).removeClass('show');
        $('#mask').removeClass('show');
      }
    }
  }
}

