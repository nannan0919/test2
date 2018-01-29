/*
* @Author: hp
* @Date:   2017-04-01 16:57:58
* @Last Modified by:   hp
* @Last Modified time: 2017-04-01 17:00:11
*/

'use strict';
	$(function(){
        var designWidth = 2048;

        function fontSize(){
            var CW = document.documentElement.clientWidth;
            var size = CW/designWidth*100+"px";
            document.querySelector("html").style .fontSize=size;
        }
        fontSize();
        window . onresize=fontSize;
        var body=document.querySelector('body');
        body.style.display='block';
	})

