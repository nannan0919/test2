/*
 * @Author: hp
 * @Date:   2017-04-01 16:57:58
 * @Last Modified by:   hp
 * @Last Modified time: 2017-04-01 17:00:11
 */

'use strict';
window.onload = function () {
    var designWidth = 2048;

    function fontSize() {
        var CW = document.documentElement.clientWidth;
        var size = CW / designWidth * 100 + "px";
        document.querySelector("html").style.fontSize = size;
    }

    fontSize();
    window.onresize = fontSize;
    var body = document.querySelector('body');
    body.style.display = 'block';

//  $.ajaxSetup({
//      cache: true // AJAX cache  下面加上时间后load的页面中的js、css图片等都会重新加载，
//      //加上这句action会重新加载，但是js、css、图片等会走缓存
//  });
//  $.ajax({
//      type: "GET",
//      url: "../js/game-js/preload.json",
//      dataType: "json",
//      async: true,
//      beforeSend: function () {
//          //请求前的处理
//          $('#loading p').text('音乐资源加载中');
//          $('#loading').css({display:'block'})
//      },
//      success: function (data) {
//          var el;
//          $.each(data.list, function (i, n) {
//              el +=
//                  `<audio src="${data.list[i].src}" preload="auto" controls='controls'></audio>`;
//          });
//          $('.musicqwe').append(el)
//      },
//      complete: function () {
//          $('#loading').css({display:'none'})
//      },
//      error: function () {
//          console.log('错误')
//      }
//  });
};
